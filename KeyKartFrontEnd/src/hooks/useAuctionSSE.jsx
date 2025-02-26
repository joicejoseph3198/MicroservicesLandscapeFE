import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchAuctionDetails } from '../redux/slices/auctionSlice';
const useAuctionSSE = ({ auctionId, clientId, skuCode, axiosInstance }) => {
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    let eventSource = null;
    let reconnectTimeout = null;
    
    const connect = () => {
      if (!auctionId || !clientId) return;
      
      // Clean up any existing connection
      if (eventSource) {
        eventSource.close();
      }
      
      // Create new connection
      const url = new URL(`https://localhost:30443/auction/${auctionId}/bid-events`);
      url.searchParams.append('clientId', clientId);
      
      eventSource = new EventSource(url.toString(), { 
        withCredentials: false,
        headers: {
          'Accept': 'text/event-stream'
        }
      });
      
      // Connection handlers
      eventSource.onopen = () => {
        setIsConnected(true);
        console.log('SSE connection established');
        if (reconnectTimeout) {
          clearTimeout(reconnectTimeout);
          reconnectTimeout = null;
        }
      };
      
      // Generic event handler
      eventSource.onmessage = (event) => {
        try {
          const parsedEvent = JSON.parse(event.data);
          switch (parsedEvent.eventType) {
            case 'CONNECTION_ESTABLISHED':
              console.debug('Connected:', parsedEvent.data);
              break;
            case 'HEARTBEAT':
              console.debug('Heartbeat received');
              break;
            
            case 'NEW_HIGHEST_BID':
              toast.info(`${parsedEvent.data}`);
              dispatch(fetchAuctionDetails({ skuCode, axiosInstance }));
              break;

            case 'LIVE':
              toast.info(`${parsedEvent.data}`);
              dispatch(fetchAuctionDetails({ skuCode, axiosInstance }));
              break;
            
            case 'BID_ACCEPTED':
              toast.success('Your bid was accepted!');
              dispatch(fetchAuctionDetails({ skuCode, axiosInstance }));
              break;

              case 'AUCTION_WON':
                toast.success(`${parsedEvent.data}`);
                dispatch(fetchAuctionDetails({ skuCode, axiosInstance }));
                break;
            
            case 'BID_FAILED':
              toast.error(parsedEvent.data || 'Bid failed. Please try again.');
              break;
            
            case 'AUCTION_OVER':
              toast.info(`${parsedEvent.data}`);
              dispatch(fetchAuctionDetails({ skuCode, axiosInstance }));
              eventSource.close();
              break;
            
            default:
              console.log('Unhandled event:', parsedEvent);
          }
        } catch (err) {
          console.error('Error parsing SSE event:', err);
        }
      };
      
      // Error handling with reconnection logic
      eventSource.onerror = (error) => {
        console.error('SSE connection error:', error);
        setIsConnected(false);
        eventSource.close();
        
        // Attempt to reconnect after 5 seconds
        reconnectTimeout = setTimeout(connect, 5000);
      };
    };
    
    connect();
  
    // Cleanup function
    return () => {
      if (eventSource) {
        console.log('Closing SSE connection');
        eventSource.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, [auctionId, clientId, skuCode, axiosInstance, dispatch]);
  
  return { isConnected };
};

export default useAuctionSSE;
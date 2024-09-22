
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { store } from './redux/store'
import { router } from './utils/router'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
  <Provider store={store}>
     <ToastContainer/>
    <RouterProvider router={router}/>
  </Provider>
  )
}

export default App

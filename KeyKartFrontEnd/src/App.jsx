
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { store } from './redux/store'
import { router } from './utils/router'
import { Provider } from 'react-redux'

function App() {
  return (
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
  )
}

export default App

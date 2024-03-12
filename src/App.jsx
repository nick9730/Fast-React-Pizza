import {RouterProvider, createBrowserRouter} from "react-router-dom"


import Home from "./Ui/Home"
import Cart from "./features/Cart/Cart"
import CreateOrder , { action as createOrderAction} from "./features/Order/CreateOrder"
import AppLayout from "./Ui/AppLayout"
import Error from "./Ui/Error"


import Menu,{loader as menuLoader} from "./features/Menu/Menu"
import Order, {loader as orderLoader} from "./features/Order/Order"




const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    errorElement: <Error/>,
    children : [
      {
        path:"/",
        element: <Home/>,
        
      },
      {
        path:"/menu",
        element: <Menu/>,
        loader : menuLoader,
        errorElement: <Error/>
      },
      {
        path:"/cart",
        element: <Cart/>
      },
      {
        path:"/order/new",
        element: <CreateOrder/>,
        action:createOrderAction,

      },
      {
        path:"/order/:orderId",
        element: <Order/>,
        loader: orderLoader,
        errorElement : <Error/>
      },
    ]
  },
 
])






function App() {


  return (
    
   <div>
 <RouterProvider router={router} />  
  </div>
  )
}

export default App

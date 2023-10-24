import { Routes, Route } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage.js';
import LoginError from "../LoginPage/LoginError.js"
import RegisterPage from '../Register/RegisterPage.js';
import Home from '../Home/Home';
import Cart from '../Cart/Cart.js';
import Ticket from '../Ticket/Ticket.js';
import RestorePassword from "../LoginPage/RestorePassword.js"
import Stripe from '../pages/Stripe/Stripe.js';
import Administrador from '../Administrador/administrador.js';





export const RoutesApp=()=>{

   
    return (
        <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/Administrador' element={<Administrador/>} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/Ticket' element={<Ticket />} />
        <Route path='/Register' element={<RegisterPage />} />
        <Route path='/LoginError' element={<LoginError />} />
        <Route path='/Cart' element={<Cart/>} />
        <Route path='/RestorePassword' element={<RestorePassword/>} />
        <Route path='/Stripe' element={<Stripe/>} />
      
        
       
      </Routes>
    )

}
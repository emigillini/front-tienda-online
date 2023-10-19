import { Routes, Route } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage.js';
import LoginError from "../LoginPage/LoginError.js"
import RegisterPage from '../Register/RegisterPage.js';
import Home from '../Home/Home';
import Cart from '../Cart/Cart.js';





export const RoutesApp=()=>{

   
    return (
        <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/Register' element={<RegisterPage />} />
        <Route path='/LoginError' element={<LoginError />} />
        <Route path='/Cart' element={<Cart/>} />
        
       
      </Routes>
    )

}
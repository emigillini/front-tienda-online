
import classnames from 'classnames';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './components/PaymentForm';
import "./Stripe.css"
import { useCart } from '../../cartContext/cartContext';
import { useState, useEffect } from 'react';



const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Stripe = () => {

    const { cartid, calculateTotalPrice, getCart, cart } = useCart()
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        getCart();
      }, []);
    
     
    
      useEffect(() => {
        const total= calculateTotalPrice()
        setTotalPrice(total)
      }, [cart]);

      return (
        <div className="container">
          <h1 className="title">Stripe</h1>
          <div className={classnames(['container', 'highlighted'])}>
            <Elements stripe={stripePromise}>
              <PaymentForm cartId={cartid} amount={totalPrice} />
            </Elements>
          </div>
        </div>
      );
    };

export default Stripe;

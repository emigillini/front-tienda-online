import { CardElement,  useElements, useStripe } from '@stripe/react-stripe-js';
import { createAlert, createAlertWithCallback } from '../../../utils/alert.js';
import { useCart } from '../../../cartContext/cartContext.js';
import "./PaymentForm.css"
import { useNavigate } from 'react-router-dom';




const PaymentForm = ({cartId, amount}) => {
    const stripe = useStripe();
    const elements = useElements();
    const {  cart } = useCart();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        const { error, paymentMethod} = await stripe.createPaymentMethod({
            type:"card",
            card:elements.getElement(CardElement)


        })
     
        if (!error) {

            
            console.log(paymentMethod)
            const {id} = paymentMethod
            const response = await fetch('http://localhost:8080/api/payments/payment-intents', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: amount, id:id, cartId:cartId }),
              });
              if (response.ok) {
                const responseData = await response.json(); 
                console.log(responseData); 
                
           createAlertWithCallback('success','¡Pago completado!',"El pago ha sido procesado con éxito",()=>navigate('/Ticket'))
              } else {
                console.log('Error en el servidor:', response);
                createAlert('error', 'Error al procesar el pago', 'Hubo un problema al procesar el pago.');
              }


        } else {
            console.log(error);
           createAlert('error','Error al procesar el pago',error.message)
        }
    }
    return (
        <form className="paymentForm">
          <h2 className="formTitle">Resumen del Pago</h2>
          <div className="productDetails">
            {cart.products.map((product) => (
              <div key={product.id} className="productItem">
                <img src={product.thumbnail} alt={product.name} className="productImage" />
                <div className="productInfo">
                  <span className="productName">{product.title}</span>
                  <br/>
                  <span className="productName">Cantidad = {product.quantity}</span>
                  <br/>
                  
                  <span className="productPrice">{product.price} USD</span>
                 
                </div>
              </div>
            ))}
          </div>
          <hr className="separator" />
          <div className="totalAmount">
            <span>Total:</span>
            <span className="totalPrice">{amount} USD</span>
          </div>
          <CardElement className="cardElement" />
          <div className="buttonPanel">
            <button className="genericButton" onClick={handleSubmit}>
              Pagar
            </button>
          </div>
        </form>
      );
    }
    
export default PaymentForm;
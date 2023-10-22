import { Router } from 'express'
import PaymentService from '../services/payment.services.js'

const router = Router()

router.get('/hola', async (req, res) => {
   const hola = "hola"
   res.send(hola)
    })

router.post('/payment-intents', async (req, res) => {
    console.log(req.body)
 
  
  try{
    const {id, amount, cartId} = req.body

    const paymentIntentInfo = {
        amount,
        currency: 'USD',
        payment_method:id,
        payment_method_types: ["card"],
        confirm:true
        
       
    }

    const service = new PaymentService()
    const result = await service.createPaymentIntent(paymentIntentInfo)

    console.log({ result })
    res.json({ status: 'success', payload: result })
  } 
  catch(error){
    console.log(error)
    res.json({messge:error.message})
  }
})


export default router
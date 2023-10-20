import Stripe from 'stripe';
const key = "sk_test_51O3J2CCGlDuVGi3dYNpD0tuFeq42jeTcwzFq6w6ZHFOsnxYyFHkGqDyx6fb3Mwng1EcacDT8wyZADWtDclAu3TrV005YtOnzB5"

export default class PaymentService {
    constructor() {
        this.stripe = new Stripe(key)
    }

    createPaymentIntent = async(data) => {
        const paymentIntent = this.stripe.paymentIntents.create(data)

        return paymentIntent
    }
}
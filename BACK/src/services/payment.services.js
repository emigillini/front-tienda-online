import config from '../config/config.js';
import Stripe from 'stripe';

const strkey = config.pkstripe
const key = strkey


export default class PaymentService {
    constructor() {
        this.stripe = new Stripe(key)
    }

    createPaymentIntent = async(data) => {
        const paymentIntent = this.stripe.paymentIntents.create(data)

        return paymentIntent
    }
}
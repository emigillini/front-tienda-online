import { getHeaders } from "../utils/http";

const { REACT_APP_BASE_URL, REACT_APP_PAYMENT_ENDPOINT } = process.env;

export default class PaymentService {
  createPaymentIntent = async ({ total, callbackSuccess, callbackError }) => {
    try {
      const url = `${REACT_APP_BASE_URL}${REACT_APP_PAYMENT_ENDPOINT}/payment-intents`;
      const requestOptions = {
        method: "POST",
        headers: {
          ...getHeaders(), // Añade tus encabezados personalizados aquí
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ total }), // Convierte a JSON
      };

      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      callbackSuccess(data);
    } catch (error) {
      callbackError(error);
    }
  }

  pay = ({ body, callbackSuccess, callbackError }) => {
    try {
      const url = `${REACT_APP_BASE_URL}${REACT_APP_PAYMENT_ENDPOINT}/checkout`;
      const requestOptions = {
        method: "POST",
        headers: {
          ...getHeaders(), // Añade tus encabezados personalizados aquí
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body), // Convierte a JSON
      };

      const response =  fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data =  response.json();
      callbackSuccess(data);
    } catch (error) {
      callbackError(error);
    }
  }
}

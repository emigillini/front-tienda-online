import mongoose from "mongoose";

const ticketCollection = "Ticket";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    default: function () {
      const timestamp = Date.now().toString(36);
      return `TICKET-${timestamp}`;
    },
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  purchaser: {
    type: String,
  },
  productsNotProcessed: {
    type: Array,
  },
  productsProcessed: {
    type: Array,
  },
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);

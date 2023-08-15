import mongoose from 'mongoose';

const ticketCollection = "Ticket";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    default: function() {
     
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
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
});

const Ticket = mongoose.model(ticketCollection, ticketSchema);

export default Ticket;

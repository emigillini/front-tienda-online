import { ticketModel } from "../models/ticket_model.js";

export default class TicketManagerBD {
  constructor() {
    this.model = ticketModel;
  }

  getTickets = async () => {
    try {
      let tickets = await ticketModel.find().populate("cart").exec();

      return tickets;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getTicketsById = async (id) => {
    try {
      let ticket = await ticketModel
        .findOne({ _id: id })
        .populate("cart")
        .exec();
      return ticket;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  createTicket = async (ticket) => {
    try {
      let result = await ticketModel.create(ticket);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  resolveTicket = async (id, ticket) => {
    try {
      let result = await ticketModel.updateOne({ _id: id }, { $set: ticket });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}

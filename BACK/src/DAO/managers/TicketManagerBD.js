import { ticketModel } from "../models/ticket_model.js";
import { logger } from "../../logger.js";

export default class TicketManagerBD {
  constructor() {
    this.model = ticketModel;
  }

  getTickets = async () => {
    try {
      let tickets = await ticketModel.find().populate("cart").exec();

      return tickets;
    } catch (error) {
      logger.error(error);
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
      logger.error(error);
      return null;
    }
  };

  createTicket = async (ticket) => {
    try {
      let result = await ticketModel.create(ticket);
      return result;
    } catch (error) {
      logger.error(error);
      return null;
    }
  };

  resolveTicket = async (id, ticket) => {
    try {
      let result = await ticketModel.updateOne({ _id: id }, { $set: ticket });
      return result;
    } catch (error) {
      logger.error(error);
      return null;
    }
  };
}

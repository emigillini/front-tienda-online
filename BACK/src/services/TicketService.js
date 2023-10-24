import TicketManagerBD from "../DAO/managers/TicketManagerBD.js";
import { logger } from "../logger.js";

const ticketman1 = new TicketManagerBD();

export class TicketService {
  async getTicketsById(id) {
    try {
      const ticket = await ticketman1.getTicketsById(id);
      return ticket;
    } catch (error) {
      logger.error(error);
      throw new Error("Error al obtener el ticket por ID");
    }
  }
  async getTickets() {
    try {
      const response = await ticketman1.getTickets();
      return response;
    } catch (error) {
      logger.error(error);
      throw new Error("Error ");
    }
  }
  async createTicket(ticket) {
    try {
      const newTicket = await ticketman1.createTicket(ticket);
      return newTicket;
    } catch (error) {
      logger.error(error);
      throw new Error("No se pudo crear ticket ");
    }
  }
  async resolveTicket(id, ticket) {
    try {
      const ticketResolved = ticketman1.resolveTicket(id, ticket);
      return ticketResolved;
    } catch (error) {
      logger.error(error);
      throw new Error("No se pudo actualizar ticket ");
    }
  }
}

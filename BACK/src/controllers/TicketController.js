import { TicketService } from "../services/Ticketservice.js";
import { logger } from "../logger.js";

const ticketService = new TicketService();

export default class TicketController {
  async getTickets(req, res) {
    try {
      const tickets = await ticketService.getTickets();
      return res.json(tickets);
    } catch (error) {
      logger.error(error);
      res.sendUserError("Error  no hay tickets encontrado");
    }
  }
  async getTicketsById(req, res) {
    try {
      const tickets = await ticketService.getTicketsById(req.params.id);
      if (!tickets) {
        return res.json({
          id: req.params.id,
          message: `id ${req.params.id} no encontrado `,
        });
      }
      return res.send(tickets);
    } catch (error) {
      logger.error(error);
      res.sendUserError("Error id no encontrado");
    }
  }
}

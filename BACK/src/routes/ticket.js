import CustomRouter from "./router.js";
import TicketController from "../controllers/TicketController.js";

const ticketController1 = new TicketController();

export default class TicketRouter extends CustomRouter {
  init() {
    this.get("/", ticketController1.getTickets);
    this.get("/:id", ticketController1.getTicketsById);
    this.post("/", ticketController1.createTicket);
  }
}

// routes/ticketRoute.js
import express from "express";
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";

const router = express.Router();

router.route("/").get(getAllTickets).post(createTicket);
router.route("/:id").get(getTicketById).patch(updateTicket).delete(deleteTicket);

export default router;

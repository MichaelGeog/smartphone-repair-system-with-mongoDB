// controllers/ticketController.js
import Ticket from "../models/ticketModel.js";
import Issue from "../models/issueModel.js";

// helper: resolve price based on issue + device
async function resolvePrice(issueName, deviceName) {
  const wantedIssue = String(issueName).trim().toUpperCase();
  const wantedDevice = String(deviceName || "").trim().toUpperCase();

  // exact match first
  const precise = await Issue.findOne({
    issue: wantedIssue,
    models: wantedDevice,
  });

  if (precise) return precise.price;

  // fallback: issue applies to ALL
  const allMatch = await Issue.findOne({
    issue: wantedIssue,
    models: "ALL",
  });

  return allMatch ? allMatch.price : null;
}

// GET all tickets
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ticket by ID
export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ ticketId: req.params.id });
    if (!ticket) return res.status(404).json({ error: "Ticket Not Found" });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a new ticket
export const createTicket = async (req, res) => {
  try {
    let { fullName, phoneNumber, email, brandName, device, issue } = req.body;

    if (!fullName || !phoneNumber || !email || !brandName || !device || !issue) {
      return res.status(400).json({
        error:
          "fullName, phoneNumber, email, brandName, device, and issue are required",
      });
    }

    const normalized = {
      fullName: fullName.trim().toUpperCase(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim().toLowerCase(),
      brandName: brandName.trim().toUpperCase(),
      device: device.trim().toUpperCase(),
      issue: issue.trim().toUpperCase(),
    };

    const price = await resolvePrice(normalized.issue, normalized.device);
    if (price == null) {
      return res
        .status(400)
        .json({ error: "Unknown issue; cannot resolve price" });
    }

    const nextId =
      (await Ticket.find().sort({ ticketId: -1 }).limit(1).then(t => t[0]?.ticketId || 0)) + 1;

    const newTicket = new Ticket({
      ticketId: nextId,
      ...normalized,
      price,
    });

    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a ticket
export const updateTicket = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const ticket = await Ticket.findOne({ ticketId: id });
    if (!ticket) return res.status(404).json({ error: "Ticket Not Found" });

    const { fullName, phoneNumber, email, brandName, device, issue } =
      req.body ?? {};

    if (fullName != null) ticket.fullName = fullName.trim().toUpperCase();
    if (phoneNumber != null) ticket.phoneNumber = phoneNumber.trim();
    if (email != null) ticket.email = email.trim().toLowerCase();
    if (brandName != null) ticket.brandName = brandName.trim().toUpperCase();
    if (device != null) ticket.device = device.trim().toUpperCase();
    if (issue != null) ticket.issue = issue.trim().toUpperCase();

    if (issue != null || device != null) {
      const price = await resolvePrice(ticket.issue, ticket.device);
      if (price == null) {
        return res
          .status(400)
          .json({ error: "Unknown issue; cannot resolve price" });
      }
      ticket.price = price;
    }

    await ticket.save();
    res.json({ message: "Ticket Updated", ticket });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE ticket
export const deleteTicket = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deleted = await Ticket.findOneAndDelete({ ticketId: id });
    if (!deleted) return res.status(404).json({ error: "Ticket Not Found" });
    res.json({ message: "Ticket deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

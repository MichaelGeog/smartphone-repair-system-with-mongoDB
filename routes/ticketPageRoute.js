// routes/ticketPageRoute.js
import express from "express";
import Brand from "../models/brandModel.js";
import Device from "../models/deviceModel.js";
import Issue from "../models/issueModel.js";
import Ticket from "../models/ticketModel.js";

const router = express.Router();

router.get("/tickets", async (req, res) => {
  try {
    const { email, device, issue, brand, phone } = req.query;

    let query = {};

    if (email) query.email = email.toLowerCase();
    if (brand) query.brandName = new RegExp(brand.toUpperCase(), "i");
    if (device) query.device = new RegExp(device.toUpperCase(), "i");
    if (issue) query.issue = new RegExp(issue.toUpperCase(), "i");
    if (phone) query.phoneNumber = new RegExp(phone);

    const [brands, apple, issues, tickets] = await Promise.all([
      Brand.find(),
      Device.find({ brandId: "AE" }), // just Apple devices for now
      Issue.find(),
      Ticket.find(query),
    ]);

    res.render("tickets", {
      brands,
      apple,
      issues,
      tickets,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

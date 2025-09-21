// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";

import Brand from "./models/brandModel.js";
import Device from "./models/deviceModel.js";
import Issue from "./models/issueModel.js";
import Ticket from "./models/ticketModel.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected for seeding...");

    // Clear existing data (optional for fresh start)
    await Brand.deleteMany();
    await Device.deleteMany();
    await Issue.deleteMany();
    await Ticket.deleteMany();

    console.log("Old data cleared.");

    // Insert Brands
    const brands = [
      { brandId: "AE", brandName: "APPLE" },
      { brandId: "SG", brandName: "SAMSUNG" },
      { brandId: "GE", brandName: "GOOGLE" },
    ];
    await Brand.insertMany(brands);
    console.log("Brands seeded.");

    // Insert Apple Devices (sequence)
    const appleDevices = [
      { deviceId: 1, brandId: "AE", model: "IPHONE X" },
      { deviceId: 2, brandId: "AE", model: "IPHONE XR" },
      { deviceId: 3, brandId: "AE", model: "IPHONE XS" },
      { deviceId: 4, brandId: "AE", model: "IPHONE XS MAX" },
      { deviceId: 5, brandId: "AE", model: "IPHONE 11" },
      { deviceId: 6, brandId: "AE", model: "IPHONE 11 PRO" },
      { deviceId: 7, brandId: "AE", model: "IPHONE 11 PRO MAX" },
      { deviceId: 8, brandId: "AE", model: "IPHONE 12" },
      { deviceId: 9, brandId: "AE", model: "IPHONE 12 MINI" },
      { deviceId: 10, brandId: "AE", model: "IPHONE 12 PRO" },
      { deviceId: 11, brandId: "AE", model: "IPHONE 12 PRO MAX" },
    ];
    await Device.insertMany(appleDevices);
    console.log("Apple devices seeded.");

    // Insert Issues
    const issues = [
      {
        issueId: 1,
        brandId: "AE",
        models: "ALL",
        issue: "SCREEN CRACKED",
        price: 199,
      },
      {
        issueId: 2,
        brandId: "AE",
        models: "ALL",
        issue: "BATTERY HEALTH LOW / REPLACEMENT",
        price: 89,
      },
      {
        issueId: 3,
        brandId: "AE",
        models: "ALL",
        issue: "CHARGING PORT NOT WORKING",
        price: 129,
      },
      {
        issueId: 4,
        brandId: "AE",
        models: "ALL",
        issue: "REAR CAMERA ISSUES",
        price: 149,
      },
      {
        issueId: 5,
        brandId: "AE",
        models: "ALL",
        issue: "BACK GLASS CRACKED",
        price: 199,
      },
    ];
    await Issue.insertMany(issues);
    console.log("Issues seeded.");

    // Insert one sample Ticket
    const tickets = [
      {
        ticketId: 1,
        fullName: "JOHN DOE",
        phoneNumber: "555-123-4567",
        email: "john@example.com",
        brandName: "APPLE",
        device: "IPHONE 12 PRO",
        issue: "BATTERY HEALTH LOW / REPLACEMENT",
        price: 89,
      },
    ];
    await Ticket.insertMany(tickets);
    console.log("Tickets seeded.");

    console.log("All seeding done!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

seedData();

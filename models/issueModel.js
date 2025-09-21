// models/issueModel.js
import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    issueId: {
      type: Number,
      required: true,
      unique: true,
    },
    brandId: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      ref: "Brand", // links issue to a brand
    },
    models: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      default: "ALL", // issue applies to all models unless specified
    },
    issue: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0, // price must be >= 0
    },
  },
  { timestamps: true }
);

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;

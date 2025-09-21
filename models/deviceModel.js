// models/deviceModel.js
import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    deviceId: {
      type: Number,
      required: true,
      unique: true,
    },
    brandId: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      ref: "Brand", // links device to a Brand
    },
    model: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Device = mongoose.model("Device", deviceSchema);

export default Device;

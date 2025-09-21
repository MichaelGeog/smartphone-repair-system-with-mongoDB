// models/brandModel.js
import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    brandId: {
      type: String,
      required: true,
      unique: true, // AE, SG, GE...
      uppercase: true,
      trim: true,
    },
    brandName: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;

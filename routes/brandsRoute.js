// routes/brandsRoute.js
import express from "express";
import {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brandsController.js";

const router = express.Router();

router.route("/").get(getAllBrands).post(createBrand);
router.route("/:id").get(getBrandById).patch(updateBrand).delete(deleteBrand);

export default router;

// controllers/brandsController.js
import Brand from "../models/brandModel.js";

// GET all brands (with optional ?name= or ?id= filters)
export const getAllBrands = async (req, res) => {
  try {
    const { name, id } = req.query;
    let query = {};

    if (id) query.brandId = id.toUpperCase();
    if (name) query.brandName = new RegExp(name.toUpperCase(), "i"); // case-insensitive search

    const brands = await Brand.find(query);
    res.status(200).json(brands);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET brand by ID
export const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findOne({ brandId: req.params.id.toUpperCase() });
    if (!brand) return res.status(404).json({ error: "Brand Not Found" });
    res.json(brand);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a new brand
export const createBrand = async (req, res) => {
  try {
    let { brandName } = req.body;
    if (!brandName) return res.status(400).json({ error: "Brand name is required" });

    brandName = brandName.toUpperCase();
    const brandId = brandName[0] + brandName[brandName.length - 1];

    const exists = await Brand.findOne({ brandName });
    if (exists) return res.status(409).json({ error: "Brand Already Exists" });

    const newBrand = new Brand({ brandId, brandName });
    await newBrand.save();

    res.status(201).json(newBrand);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a brand
export const updateBrand = async (req, res) => {
  try {
    let { brandName } = req.body;
    const brandId = req.params.id.toUpperCase();

    const brand = await Brand.findOne({ brandId });
    if (!brand) return res.status(404).json({ error: "Brand Not Found" });

    if (brandName) {
      brandName = brandName.toUpperCase();
      brand.brandName = brandName;
      brand.brandId = brandName[0] + brandName[brandName.length - 1];
    }

    await brand.save();
    res.json({ message: "Brand Updated", brand });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a brand
export const deleteBrand = async (req, res) => {
  try {
    const brandId = req.params.id.toUpperCase();
    const deleted = await Brand.findOneAndDelete({ brandId });

    if (!deleted) return res.status(404).json({ error: "Brand not found" });
    res.json({ message: "Brand deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

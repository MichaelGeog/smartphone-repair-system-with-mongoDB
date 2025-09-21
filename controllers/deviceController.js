// controllers/deviceController.js
import Device from "../models/deviceModel.js";

// GET all devices (with optional ?model= filter)
export const getAllDevices = async (req, res) => {
  try {
    const { model } = req.query;
    let query = {};

    if (model) {
      query.model = new RegExp(model.toUpperCase(), "i"); // case-insensitive match
    }

    const devices = await Device.find(query);
    res.status(200).json(devices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET device by ID
export const getDeviceById = async (req, res) => {
  try {
    const device = await Device.findOne({ deviceId: req.params.id });
    if (!device) return res.status(404).json({ error: "Device Not Found" });
    res.json(device);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a new device
export const createDevice = async (req, res) => {
  try {
    let { model, brandId } = req.body;
    if (!model || !brandId) {
      return res.status(400).json({ error: "Model and brandId are required" });
    }

    model = model.trim().toUpperCase();
    brandId = brandId.trim().toUpperCase();

    const exists = await Device.findOne({ model });
    if (exists) return res.status(409).json({ error: "Device Already Exists" });

    const nextId =
      (await Device.find().sort({ deviceId: -1 }).limit(1).then(d => d[0]?.deviceId || 0)) + 1;

    const newDevice = new Device({
      deviceId: nextId,
      brandId,
      model,
    });

    await newDevice.save();
    res.status(201).json(newDevice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE device
export const updateDevice = async (req, res) => {
  try {
    const { model } = req.body;
    const id = Number(req.params.id);

    const device = await Device.findOne({ deviceId: id });
    if (!device) return res.status(404).json({ error: "Device Not Found" });

    if (model) {
      const normalized = model.trim().toUpperCase();
      const duplicate = await Device.findOne({ model: normalized, deviceId: { $ne: id } });
      if (duplicate) return res.status(409).json({ error: "Device Already Exists" });
      device.model = normalized;
    }

    await device.save();
    res.json({ message: "Device Updated", device });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE device
export const deleteDevice = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deleted = await Device.findOneAndDelete({ deviceId: id });

    if (!deleted) return res.status(404).json({ error: "Device Not Found" });
    res.json({ message: "Device deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

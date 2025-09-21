// controllers/issueController.js
import Issue from "../models/issueModel.js";

// GET all issues (with optional ?brand=, ?issue= filters)
export const getAllIssues = async (req, res) => {
  try {
    const { brand, issue, models } = req.query;
    let query = {};

    if (brand) query.brandId = brand.toUpperCase();
    if (issue) query.issue = new RegExp(issue.toUpperCase(), "i");
    if (models) query.models = new RegExp(models.toUpperCase(), "i");

    const issues = await Issue.find(query);
    res.status(200).json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET issue by ID
export const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findOne({ issueId: req.params.id });
    if (!issue) return res.status(404).json({ error: "Issue Not Found" });
    res.json(issue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a new issue
export const createIssue = async (req, res) => {
  try {
    let { brandId, models, issue, price } = req.body;

    if (!brandId || !models || !issue || price == null) {
      return res
        .status(400)
        .json({ error: "brandId, models, issue, and price are required" });
    }

    brandId = brandId.toUpperCase();
    models = models.toUpperCase();
    issue = issue.toUpperCase();

    const duplicate = await Issue.findOne({ brandId, models, issue });
    if (duplicate) return res.status(409).json({ error: "Issue already exists" });

    const nextId =
      (await Issue.find().sort({ issueId: -1 }).limit(1).then(d => d[0]?.issueId || 0)) + 1;

    const newIssue = new Issue({
      issueId: nextId,
      brandId,
      models,
      issue,
      price,
    });

    await newIssue.save();
    res.status(201).json(newIssue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE issue
export const updateIssue = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { models, issue, price } = req.body;

    const found = await Issue.findOne({ issueId: id });
    if (!found) return res.status(404).json({ error: "Issue Not Found" });

    if (models) found.models = models.trim().toUpperCase();
    if (issue) found.issue = issue.trim().toUpperCase();
    if (price != null) found.price = Number(price);

    await found.save();
    res.json({ message: "Issue Updated", issue: found });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE issue
export const deleteIssue = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deleted = await Issue.findOneAndDelete({ issueId: id });

    if (!deleted) return res.status(404).json({ error: "Issue Not Found" });
    res.json({ message: "Issue deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

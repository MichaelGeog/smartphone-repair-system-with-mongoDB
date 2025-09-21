// routes/issueRoute.js
import express from "express";
import {
  getAllIssues,
  getIssueById,
  createIssue,
  updateIssue,
  deleteIssue,
} from "../controllers/issueController.js";

const router = express.Router();

router.route("/").get(getAllIssues).post(createIssue);
router.route("/:id").get(getIssueById).patch(updateIssue).delete(deleteIssue);

export default router;

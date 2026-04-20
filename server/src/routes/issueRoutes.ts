import { Router } from "express";
import {
  createIssue,
  deleteIssue,
  getIssueById,
  getIssues,
  getIssueStats,
  updateIssue,
} from "../controllers/issueController";
import { protect } from "../middleware/authMiddleware";
import { validateRequest } from "../middleware/validateMiddleware";
import {
  createIssueValidator,
  deleteIssueValidator,
  getIssueByIdValidator,
  issueQueryValidator,
  updateIssueValidator,
} from "../validators/issueValidators";

const router = Router();

router.use(protect);

router.get("/stats", getIssueStats);
router.get("/", issueQueryValidator, validateRequest, getIssues);
router.get("/:id", getIssueByIdValidator, validateRequest, getIssueById);
router.post("/", createIssueValidator, validateRequest, createIssue);
router.put("/:id", updateIssueValidator, validateRequest, updateIssue);
router.delete("/:id", deleteIssueValidator, validateRequest, deleteIssue);

export default router;
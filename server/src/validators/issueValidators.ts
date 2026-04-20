import { body, param, query } from "express-validator";

export const createIssueValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 120 })
    .withMessage("Title must be between 3 and 120 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters"),

  body("status")
    .optional()
    .isIn(["Open", "In Progress", "Resolved", "Closed"])
    .withMessage("Invalid status"),

  body("priority")
    .optional()
    .isIn(["Low", "Medium", "High"])
    .withMessage("Invalid priority"),

  body("severity")
    .optional()
    .isIn(["Minor", "Major", "Critical"])
    .withMessage("Invalid severity"),

  body("assignedTo").optional().trim(),
];

export const updateIssueValidator = [
  param("id").isMongoId().withMessage("Invalid issue id"),

  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage("Title must be between 3 and 120 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters"),

  body("status")
    .optional()
    .isIn(["Open", "In Progress", "Resolved", "Closed"])
    .withMessage("Invalid status"),

  body("priority")
    .optional()
    .isIn(["Low", "Medium", "High"])
    .withMessage("Invalid priority"),

  body("severity")
    .optional()
    .isIn(["Minor", "Major", "Critical"])
    .withMessage("Invalid severity"),

  body("assignedTo").optional().trim(),
];

export const getIssueByIdValidator = [
  param("id").isMongoId().withMessage("Invalid issue id"),
];

export const deleteIssueValidator = [
  param("id").isMongoId().withMessage("Invalid issue id"),
];

export const issueQueryValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive number"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  query("status")
    .optional()
    .isIn(["Open", "In Progress", "Resolved", "Closed"])
    .withMessage("Invalid status"),

  query("priority")
    .optional()
    .isIn(["Low", "Medium", "High"])
    .withMessage("Invalid priority"),

  query("severity")
    .optional()
    .isIn(["Minor", "Major", "Critical"])
    .withMessage("Invalid severity"),
];
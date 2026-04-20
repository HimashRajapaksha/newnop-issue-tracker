import { Request, Response } from "express";
import Issue from "../models/Issue";
import { asyncHandler } from "../utils/asyncHandler";

export const createIssue = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { title, description, status, priority, severity, assignedTo } =
      req.body;

    const issue = await Issue.create({
      title,
      description,
      status,
      priority,
      severity,
      assignedTo,
      createdBy: req.user?.userId,
    });

    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: issue,
    });
  }
);

export const getIssues = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = (req.query.search as string) || "";
    const status = (req.query.status as string) || "";
    const priority = (req.query.priority as string) || "";
    const severity = (req.query.severity as string) || "";

    const filter: any = {
      createdBy: req.user?.userId,
    };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (severity) filter.severity = severity;

    const [issues, total] = await Promise.all([
      Issue.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Issue.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: {
        issues,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  }
);

export const getIssueById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const issue = await Issue.findOne({
      _id: req.params.id,
      createdBy: req.user?.userId,
    });

    if (!issue) {
      res.status(404).json({
        success: false,
        message: "Issue not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: issue,
    });
  }
);

export const updateIssue = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const issue = await Issue.findOne({
      _id: req.params.id,
      createdBy: req.user?.userId,
    });

    if (!issue) {
      res.status(404).json({
        success: false,
        message: "Issue not found",
      });
      return;
    }

    const allowedFields = [
      "title",
      "description",
      "status",
      "priority",
      "severity",
      "assignedTo",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        (issue as any)[field] = req.body[field];
      }
    });

    await issue.save();

    res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: issue,
    });
  }
);

export const deleteIssue = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const issue = await Issue.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user?.userId,
    });

    if (!issue) {
      res.status(404).json({
        success: false,
        message: "Issue not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
    });
  }
);

export const getIssueStats = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const createdBy = req.user?.userId;

    const [open, inProgress, resolved, closed, total] = await Promise.all([
      Issue.countDocuments({ createdBy, status: "Open" }),
      Issue.countDocuments({ createdBy, status: "In Progress" }),
      Issue.countDocuments({ createdBy, status: "Resolved" }),
      Issue.countDocuments({ createdBy, status: "Closed" }),
      Issue.countDocuments({ createdBy }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        open,
        inProgress,
        resolved,
        closed,
      },
    });
  }
);
import mongoose, { Document, Schema, Types } from "mongoose";

export type IssueStatus = "Open" | "In Progress" | "Resolved" | "Closed";
export type IssuePriority = "Low" | "Medium" | "High";
export type IssueSeverity = "Minor" | "Major" | "Critical";

export interface IIssue extends Document {
  title: string;
  description: string;
  status: IssueStatus;
  priority?: IssuePriority;
  severity?: IssueSeverity;
  createdBy: Types.ObjectId;
  assignedTo?: string;
}

const issueSchema = new Schema<IIssue>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [120, "Title cannot exceed 120 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Closed"],
      default: "Open",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    severity: {
      type: String,
      enum: ["Minor", "Major", "Critical"],
      default: "Minor",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

issueSchema.index({ title: "text", description: "text" });
issueSchema.index({ status: 1, priority: 1, createdAt: -1 });

const Issue = mongoose.model<IIssue>("Issue", issueSchema);

export default Issue;
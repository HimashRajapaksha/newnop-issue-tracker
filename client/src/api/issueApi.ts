import api from "./axios";
import type { IssueFormValues } from "../features/issues/issueTypes";

export interface GetIssuesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  priority?: string;
  severity?: string;
}

export const getIssuesApi = async (params: GetIssuesParams) => {
  const response = await api.get("/issues", { params });
  return response.data;
};

export const getIssueStatsApi = async () => {
  const response = await api.get("/issues/stats");
  return response.data;
};

export const getIssueByIdApi = async (id: string) => {
  const response = await api.get(`/issues/${id}`);
  return response.data;
};

export const createIssueApi = async (payload: IssueFormValues) => {
  const response = await api.post("/issues", payload);
  return response.data;
};

export const updateIssueApi = async (id: string, payload: Partial<IssueFormValues>) => {
  const response = await api.put(`/issues/${id}`, payload);
  return response.data;
};

export const deleteIssueApi = async (id: string) => {
  const response = await api.delete(`/issues/${id}`);
  return response.data;
};
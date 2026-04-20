import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import IssuesPage from "../pages/issues/IssuesPage";
import CreateIssuePage from "../pages/issues/CreateIssuePage";
import EditIssuePage from "../pages/issues/EditIssuePage";
import IssueDetailsPage from "../pages/issues/IssueDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "issues",
        element: <IssuesPage />,
      },
      {
        path: "issues/create",
        element: <CreateIssuePage />,
      },
      {
        path: "issues/:id",
        element: <IssueDetailsPage />,
      },
      {
        path: "issues/:id/edit",
        element: <EditIssuePage />,
      },
    ],
  },
]); 
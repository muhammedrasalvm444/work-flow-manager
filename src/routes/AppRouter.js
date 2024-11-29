import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import WorkLogPage from "../components/WorkLogPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />{" "}
      <Route path="/worklog" element={<WorkLogPage />} />{" "}
    </Routes>
  );
};

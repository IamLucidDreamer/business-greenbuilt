import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import Helpers
import { authenticated } from "../utils/auth";

// Import Components to show Screens
import { Home } from "../views/MainWebsite";
import { Login } from "../views/auth/logIn/Index";
import { SignUp } from "../views/auth/signUp/Index";
import { DocumentsUpload } from "../views/auth/documentUpload/Index";
import { NotApproved } from "../views/auth/notApproved/Index";

import Dashboard from "../views/Dashboard";
import DashboardStats from "../views/DashboardStats";
import Products from "../views/Product";
import GenerateQr from "../views/GenerateQr";
import MonthlyPlan from "../views/MonthlyPlan";
import MonthlyConsumption from "../views/MonthlyConsumption";
import History from "../views/History";
import {
  getIndustryType,
  getPackagingType,
  getSourceType,
  getUom,
} from "../store/actions/statics";
import ProtectedRoutes from "./ProtectedRoutes";
import ErrorPage from "../views/ErrorPage";

export const RoutesPath = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIndustryType());
    dispatch(getSourceType());
    dispatch(getUom());
    dispatch(getPackagingType());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/documents" element={<DocumentsUpload />} />
      <Route path="/notapproved" element={<NotApproved />} />

      {/* Handling the Business User Routes */}

      <Route
        path="/business"
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }
      >
        <Route path="dashboard" element={<DashboardStats />} />
        <Route path="product" element={<Products />} />
        <Route path="generateqr" element={<GenerateQr />} />
        <Route path="monthlyplan" element={<MonthlyPlan />} />
        <Route path="monthlyconsumption" element={<MonthlyConsumption />} />
        <Route path="history" element={<History />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

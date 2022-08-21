import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const token = JSON.parse(localStorage.getItem("jwt"));

  if (token && user?.user?.role === 2 &&user?.user?.isApproved) {
    return <>{children}</>;
  } else {
    console.log("else");
    return <RedirectToLogin />;
  }
};

export default ProtectedRoutes;

const RedirectToLogin = () => {
  const navigate = useNavigate();
  useEffect(() => navigate("/login"), []);
  return <></>;
};

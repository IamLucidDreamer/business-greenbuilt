import React, { useEffect } from "react";
import Logo from "../../../assets/logoGreenbuilt.png";
import { Link, useNavigate } from "react-router-dom";
import { login, setUserDetails } from "../../../store/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authenticated } from "../../../utils/auth";
import axios from "../../../appConfig/httpHelper";
import { toast } from "react-toastify";
import { ArrowRightOutlined } from "@ant-design/icons";

export const NotApproved = () => {
  const token = JSON.parse(localStorage.getItem("jwt"));
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    requestsCaller();
    const token = JSON.parse(localStorage.getItem("jwt"));
    if (token && user?.user.role === 2) {
      if (user?.user?.isApproved) {
        navigate("/business/dashboard");
      }
       if (user?.user?.documentArray.length == 1) {
        navigate("/documents");
        console.log(user?.user?.documentArray);
      }
    } 

  }, [user?.user?.isApproved]);

  const requestsCaller = () => {
    axios
      .get(`/user/get/${user?.user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.user?.isApproved) {
          toast.success("User Has been Approved by the Admin");
        } else {
          toast.error("User Has not been Approved by the Admin yet.");
        }
        console.log(res?.data ,"Not Approved");
        console.log(user?.user , "User Before")
        dispatch(setUserDetails(res?.data?.user));
        console.log(user?.user , "User After")
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-verificationBg bg-no-repeat bg-cover bg-center duration-500">
      <img src={Logo} className="w-60 mx-auto fixed top-2 left-2 " alt="" />
      <div className="min-h-screen bg-gradient-to-br from-purple-1 to-transparent flex items-center justify-center">
        <div className="w-11/12 sm:w-9/12 md:w-2/3 lg:w-1/3 bg-white rounded-lg p-4 bg-opacity-80">
          <img src={Logo} className="w-9/12 mx-auto" alt="" />

          <h1 className="text-xl font-bold text-purple-1 pt-3 text-center">
            Your Account Verification is still pending. You'll be able to login
            Once your account is Verified.
          </h1>
          <button
            onClick={requestsCaller}
            className="mx-auto w-48 py-3 px-6 my-5 bg-purple-1 border-2 border-purple-1 focus:outline-none rounded-2xl text-lg text-left text-white font-bold group duration-500 flex justify-evenly items-center"
          >
            Check Status
            <ArrowRightOutlined className="group-hover:translate-x-1.5 duration-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

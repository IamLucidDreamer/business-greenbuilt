import React, { useEffect, useState } from "react";
import Logo from "../../../assets/logoGreenbuilt.png";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../store/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export const Login = () => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.user.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token && user?.user?.role === 2 && auth) {
      if (user?.user?.isApproved) {
        navigate("/business/dashboard");
      }
      else if(user?.user?.documentArray?.length < 2)
      {
        navigate("/documents")
      }
       else {
        navigate("/notapproved");
      }
    }
  }, [user]);

  const handleLogin = (loginValue) => {
    dispatch(login(loginValue));
  };

  // Login Form Handling
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(6, "Too short").required("Required"),
    }),
    onSubmit: (values) => {
      setLoader(true);
      handleLogin(values);
      setTimeout(() => setLoader(false), 3000);
    },
  });

  return (
    <div className="bg-loginBg bg-no-repeat bg-cover bg-center">
      <img src={Logo} className="w-60 mx-auto fixed top-2 left-2 " alt="" />
      <div className="min-h-screen bg-gradient-to-br from-dark to-transparent flex items-center justify-end">
        <div className="w-11/12 sm:w-9/12 md:w-2/3 lg:w-1/3 bg-white rounded-3xl shadow-xl px-6 py-8 mx-auto sm:mr-8 md:mr-16 lg:mr-24 xl:mr-32">
          <Spin spinning={loader} tip={"Loading..."}>
            <h1 className="text-3xl font-bold text-dark pt-3 text-left">
              Welcome Back ...
            </h1>
            <h1 className="text-base font-normal text-dark text-left">
              Please Enter your Email and Password
            </h1>
            <form className="" onSubmit={formik.handleSubmit}>
              <div className="my-5 flex flex-col">
                <input
                  placeholder="Email"
                  type="email"
                  className="p-3 text-xl text-dark rounded-xl border-2 border-dark border-opacity-50 focus:outline-dark"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div> {formik.errors.email}</div>
                ) : null}
              </div>
              <div className="my-5 flex flex-col">
                <input
                  placeholder="Password"
                  type="password"
                  className="p-3 text-xl text-dark rounded-xl border-2 border-dark border-opacity-50 focus:outline-dark"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </div>
              <h1 className="text-base font-normal text-dark text-left m-0">
                By Logging In you are agreeing to our{" "}
                <Link to="" className="underline text-dark hover:text-dark">
                  {" "}
                  Terms & Conditions
                </Link>{" "}
                .
              </h1>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-48 py-3 px-6 my-5 bg-dark border-2 border-dark focus:outline-none rounded-2xl text-xl text-left text-white font-bold group duration-500 flex justify-evenly items-center"
                >
                  LogIn
                  <ArrowRightOutlined className="group-hover:translate-x-1.5 duration-500" />
                </button>
                <Link
                  to="../signup"
                  className="underline text-dark hover:text-dark text-lg font-bold"
                >
                  Forgot Password ?
                </Link>
              </div>
            </form>
            <h1 className="text-base font-normal text-dark text-left">
              New around here ?{" "}
              <Link to="../signup" className="underline text-dark hover:text-dark">
                {" "}
                Sign Up
              </Link>
            </h1>
          </Spin>
        </div>
      </div>
    </div>
  );
};

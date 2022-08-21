import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signUpBusiness } from "../../../../store/actions/user";
import { ArrowRightOutlined } from "@ant-design/icons";

export const UserDetails = (props) => {
  const dispatch = useDispatch();

  const industryType = useSelector((state) => state.statics.industryType);

  // SignUp User Details Form Handling
  const formik = useFormik({
    initialValues: {
      name: props.businessName,
      phoneNumber: props.businessPhone,
      email: "",
      password: "",
      ebServiceNo: "",
      industryType: "",
      gstin: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(8, "Too short").required("Required"),
      ebServiceNo: Yup.string().required("Required"),
      industryType: Yup.string().required("Required"),
      gstin: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const {
        name,
        phoneNumber,
        email,
        password,
        ebServiceNo,
        gstin,
        industryType,
      } = values;
      props.setLoader(true);
      dispatch(
        signUpBusiness({
          name,
          phoneNumber,
          email,
          password,
          ebServiceNo,
          gstin,
          industryType,
        })
      );
      setTimeout(() => props.setLoader(false), 4000);
    },
  });

  return (
    <form className="" onSubmit={formik.handleSubmit}>
      <h1 className="text-xl font-medium text-purple-1 text-left">
        Hello, <span className="font-bold">{props.businessName}</span>
      </h1>
      <h1 className="text-xl font-medium text-purple-1 text-left">
        OTP Sent to <span className="font-bold">{props.businessPhone}</span>
        <button
          className="text-base font-normal text-purple-1 text-left underline hover:no-underline ml-2"
          onClick={() => props.changeFormNumber(1)}
        >
          Change Number
        </button>
      </h1>
      <div className="my-5 flex flex-col">
        <input
          placeholder="Email"
          className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-1"
          type="email"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="my-5 flex flex-col">
        <input
          type="text"
          autocapitalize="word"
          placeholder="EB Service Number"
          className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-1"
          {...formik.getFieldProps("ebServiceNo")}
        />
        {formik.touched.ebServiceNo && formik.errors.ebServiceNo ? (
          <div>{formik.errors.ebServiceNo}</div>
        ) : null}
      </div>
      <div className="my-5 flex flex-col">
        <select
          className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-1"
          {...formik.getFieldProps("industryType")}
        >
          <option disabled value="">
            Select Industry Type
          </option>
          {industryType.map((data) => (
            <option value={data.name}>{data.name}</option>
          ))}
        </select>
        {formik.touched.industryType && formik.errors.industryType ? (
          <div>{formik.errors.industryType}</div>
        ) : null}
      </div>
      <div className="my-5 flex flex-col">
        <input
          type="text"
          autocapitalize="word"
          placeholder="GSTIN"
          className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-1"
          {...formik.getFieldProps("gstin")}
        />
        {formik.touched.gstin && formik.errors.gstin ? (
          <div>{formik.errors.gstin}</div>
        ) : null}
      </div>
      <div className="my-5 flex flex-col">
        <input
          placeholder="Password"
          className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-1"
          type="password"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </div>
      <button
        type="submit"
        className="w-48 py-3 px-6 my-5 bg-purple-1 border-2 border-purple-1 focus:outline-none rounded-2xl text-xl text-left text-white font-bold group duration-500 flex justify-evenly items-center"
      >
        Sign Up
        <ArrowRightOutlined className="group-hover:translate-x-1.5 duration-500" />
      </button>
    </form>
  );
};

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CountryCodes } from "../data/countryCodes";
import { toast } from "react-toastify";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

// Firebase Imports
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../../appConfig/firebase";

export const SendOtp = (props) => {
  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  const getOTP = async (name, phoneNumber, countryCode) => {
    console.log(name, phoneNumber);
    const number = `${countryCode}${phoneNumber}`;
    try {
      const response = await setUpRecaptha(number);
      props.setLoader(true)
      if (response) {
        props.changeFormNumber(3);
        toast.success("OTP Sent Successfully");
      }
      console.log(response);
      props.changeConfirmObj(response);
    } catch (err) {
      toast.error(`Unable to Send the OTP. ${err.message}`);
      props.changeFormNumber(1);
    }
    props.setLoader(false)
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      countryCode: "+91",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(150, "Must be 150 characters or less")
        .required("Required"),
      phoneNumber: Yup.string()
        .required("Required")
        .min(10, "Must be 10 characters")
        .max(10, "Must be 10 characters"),
      countryCode: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const { name, phoneNumber, countryCode } = values;
      getOTP(name, phoneNumber, countryCode);
      props.businessDetails(name, `${countryCode}${phoneNumber}`);
      props.changeFormNumber(2);
    },
  });

  return (
    <form className="" onSubmit={formik.handleSubmit}>
      <div className="my-5 flex flex-col">
        <input
          type="text"
          autocapitalize="word"
          placeholder="Industry / Business Name"
          className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-1"
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
      </div>
      <div className="my-5 flex flex-col">
        <div className="flex w-full ">
          <select
            className="w-4/12 p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-1 mr-4"
            {...formik.getFieldProps("countryCode")}
          >
            <option value={"+91"}>India</option>
            {CountryCodes.map((data, index) => (
              <option value={data.dial_code}>{data.name}</option>
            ))}
          </select>
          <input
            placeholder="Phone Number"
            className="w-full p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-1"
            type="tel"
            {...formik.getFieldProps("phoneNumber")}
          />
        </div>
        <div className="flex">
          {formik.touched.countryCode && formik.errors.countryCode ? (
            <div className="mr-4">{formik.errors.countryCode}</div>
          ) : null}
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div>{formik.errors.phoneNumber}</div>
          ) : null}
        </div>
      </div>
      <h1 className="text-base font-normal text-purple-1 text-left m-0">
        By Signing Up you are agreeing to our{" "}
        <Link to="" className="underline hover:text-purple-1 text-purple-1">
          {" "}
          Terms & Conditions
        </Link>{" "}
        .
      </h1>
      <div className="flex justify-center items-center">
        <div id="recaptcha-container" className="p-1"></div>
      </div>
      {props.formNumber === 1 ? (
        <button
          type="submit"
          className="w-48 py-3 px-6 my-5 bg-purple-1 border-2 border-purple-1 focus:outline-none rounded-2xl text-xl text-left text-white font-bold group duration-500 flex justify-evenly items-center"
        >
          Send OTP
          <ArrowRightOutlined className="group-hover:translate-x-1.5 duration-500" />
        </button>
      ) : null}
    </form>
  );
};

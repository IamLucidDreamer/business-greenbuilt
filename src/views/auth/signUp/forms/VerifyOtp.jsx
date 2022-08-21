import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ArrowRightOutlined } from "@ant-design/icons";

export const VerifyOtp = (props) => {
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const { otp } = values;
      props.setLoader(true);
      getVerify(otp);
    },
  });

  const getVerify = (otp) => {
    console.log(otp);
    props.confirmObj
      .confirm(otp)
      .then((res) => {
        console.log(res, "Success");
        toast.success("OTP Verified Successfully");
        props.changeFormNumber(4);
      })
      .catch((err) => {
        console.log(err);
        toast.error("OTP Verification Failed");
      })
      .finally(() => props.setLoader(false));
  };

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
          type="number"
          autocapitalize="word"
          placeholder="Enter OTP"
          className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-1"
          {...formik.getFieldProps("otp")}
        />
        {formik.touched.otp && formik.errors.otp ? (
          <div>{formik.errors.otp}</div>
        ) : null}
      </div>
      <button
        type="submit"
        className="w-48 py-3 px-6 my-5 bg-purple-1 border-2 border-purple-1 focus:outline-none rounded-2xl text-xl text-left text-white font-bold group duration-500 flex justify-evenly items-center"
      >
        Verify
        <ArrowRightOutlined className="group-hover:translate-x-1.5 duration-500" />
      </button>
    </form>
  );
};

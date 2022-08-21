import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "../../../appConfig/httpHelper";
import * as Yup from "yup";

export const ProductPlan = () => {
  const formik = useFormik({
    initialValues: {
      productName: "",
      uom: "",
      totalProduction: "",
      qrCodeRequired: "",
    },
    validationSchema: Yup.object({
      productName: Yup.string().required("Required"),
      uom: Yup.string().required("Required"),
      totalProduction: Yup.string().required("Required"),
      qrCodeRequired: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      handleCreateMonthlyPlan(values);
    },
  });

  const handleCreateMonthlyPlan = (values) => {
    const token = JSON.parse(localStorage.getItem("jwt"));

    const data = {};
    axios
      .post("/monthly-plan/product/create", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Monthly Plan Not Saved");
      });
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-3xl ">
      <h1 className="text-2xl text-purple-1 mt-2 font-bold">Product Plan</h1>
      <form className="" onSubmit={formik.handleSubmit}>
        <div className="my-5 flex flex-col">
          <input
            placeholder="Product Name"
            className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-1"
            {...formik.getFieldProps("productName")}
          />
          {formik.touched.productName && formik.errors.productName ? (
            <div> {formik.errors.productName}</div>
          ) : null}
        </div>
        <div className="my-5 flex flex-col">
          <input
            placeholder="Unit of Measurement"
            className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-1"
            {...formik.getFieldProps("uom")}
          />
          {formik.touched.uom && formik.errors.uom ? (
            <div>{formik.errors.uom}</div>
          ) : null}
        </div>
        <div className="my-5 flex flex-col">
          <input
            placeholder="Total Production"
            className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-1"
            {...formik.getFieldProps("totalProduction")}
          />
          {formik.touched.totalProduction && formik.errors.totalProduction ? (
            <div>{formik.errors.totalProduction}</div>
          ) : null}
        </div>
        <div className="my-5 flex flex-col">
          <input
            placeholder="QR Code Required"
            className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-1"
            {...formik.getFieldProps("qrCodeRequired")}
          />
          {formik.touched.qrCodeRequired && formik.errors.qrCodeRequired ? (
            <div>{formik.errors.qrCodeRequired}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 my-5 bg-purple-1 border-2 border-purple-1 focus:outline-none rounded-2xl text-xl text-left text-white font-bold group duration-500 flex justify-evenly items-center hover:shadow-lg shadow-purple-1"
        >
          Save Plan
        </button>
      </form>
    </div>
  );
};

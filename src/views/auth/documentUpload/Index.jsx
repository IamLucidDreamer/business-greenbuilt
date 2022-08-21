import React, { useEffect, useState } from "react";
import Logo from "../../../assets/logoGreenbuilt.png";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../store/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { toast } from "react-toastify";
import axios from "../../../appConfig/httpHelper";

export const DocumentsUpload = () => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.user.auth);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const token = JSON.parse(localStorage.getItem("jwt"));
  const [docLength , setDocLength] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token && user?.user.role === 2) {
      requestsCaller()
      if (user?.user?.isApproved) {
        navigate("/business/dashboard");
      } else if (docLength < 2) {
        navigate("/documents");
      } else {
        navigate("/notapproved");
      }
    }
  }, [user , docLength]);

  const handleSubmit = ({
    powerPurchaseAgreement,
    energyWheelingAgreement,
  }) => {
    setLoader(true);
    console.log(powerPurchaseAgreement);
    console.log(energyWheelingAgreement);
    const formData = new FormData();
    formData.append("title", "Power Purchase Agreement");
    formData.append("file", powerPurchaseAgreement);
    axios
      .post(`/document/upload/${user?.user.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) =>
      {
        toast.success(`Power Purchase Agreement ${res.data.message}`)
        requestsCaller()
      }
      )
      .catch((err) => console.log(err));
    const formData1 = new FormData();
    formData1.append("title", "Energy Wheeling Agreement");
    formData1.append("file", energyWheelingAgreement);
    axios
      .post(`/document/upload/${user?.user.id}`, formData1, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) =>
        toast.success(`Energy Wheeling Agreement ${res.data.message}`)
      )
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };

  useEffect(() => {})

  const requestsCaller = () => {
    axios
      .get(`/document/get-all/${user?.user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setDocLength(res?.data?.data?.length)
        console.log(docLength);
      })
      .catch((err) => console.log(err))
  };


  const formik = useFormik({
    initialValues: {
      powerPurchaseAgreement: "",
      energyWheelingAgreement: "",
    },
    validationSchema: Yup.object({
      powerPurchaseAgreement: Yup.string().required("Required"),
      energyWheelingAgreement: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log({ values });
      const { powerPurchaseAgreement, energyWheelingAgreement } = values;
      handleSubmit({ powerPurchaseAgreement, energyWheelingAgreement });
    },
  });

  return (
    <div className="bg-docsBg bg-no-repeat bg-cover bg-center">
      <img src={Logo} className="w-60 mx-auto fixed top-2 left-2 " alt="" />
      <div className="min-h-screen bg-gradient-to-br from-purple-1 to-transparent flex items-center justify-end">
        <div className="w-11/12 sm:w-9/12 md:w-2/3 lg:w-1/3 bg-white rounded-3xl shadow-xl px-6 py-8 mx-auto sm:mr-8 md:mr-16 lg:mr-24 xl:mr-32">
          <Spin spinning={loader} tip="Loading...">
            <h1 className="text-3xl font-bold text-purple-1 pt-3 text-left">
              Documents Upload ...
            </h1>
            <h1 className="text-base font-normal text-purple-1 text-left">
              Please attach the required documents for verification purposes
            </h1>
            <form className="" onSubmit={formik.handleSubmit}>
              <div className="my-5 flex flex-col">
                <lable>Power Purchase Agreement</lable>
                <input
                  type="file"
                  placeholer="Power Purchase Agreement"
                  className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                  onChange={(event) => {
                    console.log(event.target.files);
                    formik.setFieldValue(
                      "powerPurchaseAgreement",
                      event.currentTarget.files[0]
                    );
                  }}
                />
                {formik.touched.powerPurchaseAgreement &&
                formik.errors.powerPurchaseAgreement ? (
                  <div>{formik.errors.powerPurchaseAgreement}</div>
                ) : null}
              </div>
              <div className="my-5 flex flex-col">
                <lable>Energy Wheeling Agreement</lable>
                <input
                  type="file"
                  placeholer="Energy Wheeling Agreement"
                  className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                  onChange={(event) => {
                    console.log(event.target.files);
                    formik.setFieldValue(
                      "energyWheelingAgreement",
                      event.currentTarget.files[0]
                    );
                    console.log(formik.values.energyWheelingAgreement, "Hello");
                  }}
                />
                {formik.touched.energyWheelingAgreement &&
                formik.errors.energyWheelingAgreement ? (
                  <div>{formik.errors.energyWheelingAgreement}</div>
                ) : null}
              </div>
              <button
                type="submit"
                className="w-48 py-3 px-6 my-5 bg-purple-1 border-2 border-purple-1 focus:outline-none rounded-2xl text-xl text-left text-white font-bold group duration-500 flex justify-evenly items-center"
              >
                Upload
                <ArrowRightOutlined className="group-hover:translate-x-1.5 duration-500" />
              </button>
            </form>
          </Spin>
        </div>
      </div>
    </div>
  );
};

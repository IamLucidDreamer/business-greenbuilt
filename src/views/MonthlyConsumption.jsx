import React, { useEffect, useReducer } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../appConfig/httpHelper";
import { toast } from "react-toastify";
import ActionButtons from "../components/actionsButtons/Index";
import { DataTable } from "../components/table/Index";
import { QrcodeOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { AddNewMonthlyConsumption } from "./forms/AddNewMonthlyConsumption";

const MonthlyConsumption = () => {
  const token = JSON.parse(localStorage.getItem("jwt"));
  const user = useSelector((state) => state.user);
  const day = new Date();

  // Declaring the States Required for the Working of the Component
  const [actions, setActions] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    {
      drawer: false,
      loading: false,
      pagination: 15,
      trash: false,
      newPlan: false,
      loadingAllPlans: false,
      downloadAllPlans: false,
    }
  );

  const { drawer, newPlan, loading, pagination } = actions;

  const [value, setValue] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    { plans: [], allPlans: [], drawerValue: {} }
  );

  const { plans, allPlans, drawerValue } = value;

  // Functions Used for Different Data
  const requestsCaller = () => {
    setActions({ loading: true });
    axios
      .get(`/power-consumption/get-all/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setValue({
          plans: res.data.data,
        });
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loading: false }));
  };

  useEffect(() => requestsCaller(), []);

  const addNewPlan = () => {
    let matchingDate = false;
    // plans.map((data) => {
    //   data.month === day.getMonth() + 1 && data.year - 1900 === day.getYear()
    //     ? (matchingDate = true)
    //     : (matchingDate = false);
    // });

    if (!matchingDate) {
      setActions({ newPlan: true });
    } else {
      toast.error(
        "New Plan Cannot be added as a plan for this month has already been added. Try Editing this months plan instead."
      );
    }
  };

  const backAddNewPlan = () => {
    setActions({ newPlan: false });
  };

  const columns = [
    {
      key: "totalConsumption",
      title: "Total Consumption",
      render: (data) => data.totalConsumption,
    },
    {
      key: "totalGreenConsumption",
      title: "Total Green Consumption",
      render: (data) => data.totalGreenConsumption,
    },
    {
      key: "date",
      title: "Date",
      render: (data) => data.date,
    },
    {
      key: "month",
      title: "Month",
      render: (data) => data.month,
    },
    {
      key: "year",
      title: "Year",
      render: (data) => data.year,
    },
  ];

  return (
    <>
      {newPlan ? (
        <AddNewMonthlyConsumption back={backAddNewPlan} />
      ) : (
        <div className="">
          <ActionButtons
            pageTitle={"Actual Consumption"}
            showTrashButton={false}
            showTrashFunction={""}
            showReFreshButton={true}
            refreshFunction={requestsCaller}
            showExportDataButton={false}
            exportDataFunction={""}
            totalItems={""}
            loadingItems={""}
            downloadItems={""}
            showAddNewButton={true}
            addNewFunction={addNewPlan}
          />
          <div className="border-2 mt-5">
            <DataTable usersData={plans} columns={columns} loading={loading} />
          </div>
          {/* <DrawerComp
        title={"QR Code"}
        visible={drawer}
        onCloseDrawer={onCloseDrawer}
        data={drawerValue}
      /> */}
        </div>
      )}
    </>
  );
};

export default MonthlyConsumption;
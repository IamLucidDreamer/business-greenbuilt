import React, { useEffect, useReducer, useState } from "react";
import axios from "../appConfig/httpHelper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { EyeOutlined,DeleteOutlined } from "@ant-design/icons";
import { innerTableActionBtnDesign } from "../components/styles/innerTableActions";
import ActionButtons from "../components/actionsButtons/Index";
import { DataTable } from "../components/table/Index";
import { AddNewEntryMonthlyPlan } from "./forms/AddNewMonthlyPlan";


const MonthlyPlan = () => {
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
      .get(`/monthly-plan/consumption/get-all/user-id/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setValue({
          plans: res.data.data,
        });
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loading: false }));
  };

  const DeleteItem = (planId) => {
    console.log(planId);
    console.log(token);
    axios
      .delete(`/monthly-plan/consumption/delete/plan-id/${planId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        toast.success(res.data.message);
        requestsCaller();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Product Deletion Failed");
      });
  };

  useEffect(() => requestsCaller(), []);

  const addNewPlan = () => {
    let matchingDate = false;
    // Validation Removed for Testing
    // plans.map((data) => {
    //   data.month === day.getMonth() + 1 && data.year - 1900 === day.getYear()
    //     ? (matchingDate = true)
    //     : (matchingDate = false);
    // });

    if (!matchingDate) {
      setActions({ newPlan: true });
    } else {
      toast.error(
        "New Monthly Plan Cannot be added as a plan for this month has already been added. Try Editing this months plan instead."
      );
    }
  };

  const backAddNewPlan = () => {
    setActions({ newPlan: false });
  };

  const onCloseDrawer = () => {
    setActions({ drawer: false });
  };

  const columns = [
    {
      key: "totalPlan",
      title: "Total Plan",
      render: (data) => data.toal,
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
    {
      key: "actions",
      title: "Actions",
      render: (record) => <ColumnActions record={record} />,
    },
  ];

  const ColumnActions = (props) => {
    return (
      <div className="flex justify-around">
        <EyeOutlined
          title="View"
          style={innerTableActionBtnDesign}
          onClick={() => {
            setActions({ drawer: true });
            setValue({ drawerValue: props?.record });
          }}
        />
        {!props?.record?.isApproved &&
        <DeleteOutlined
          title="Ban"
          style={innerTableActionBtnDesign}
          onClick={() => DeleteItem(props?.record?.monthlyPlanId)}
        />}
      </div>
    );
  };

  return (
    <>
      {newPlan ? (
        <AddNewEntryMonthlyPlan back={backAddNewPlan} requestsCaller={requestsCaller} />
      ) : (
        <div className="">
          <ActionButtons
            pageTitle={"Monthly Consumption Plan"}
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

export default MonthlyPlan;
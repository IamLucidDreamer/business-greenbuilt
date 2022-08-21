import React, { useEffect, useReducer } from "react";
import { DataTable } from "../../components/table/Index";
import ActionButtons from "../../components/actionsButtons/Index";
import axios from "../../../appConfig/httpHelper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { DrawerComp } from "./Drawer";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { innerTableActionBtnDesign } from "../../components/styles/innerTableActions";

export const GenerationHistory = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("jwt"));
  const user = useSelector((state) => state.user);

  // Declaring the States Required for the Working of the Component
  const [actions, setActions] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    {
      drawer: false,
      loading: false,
      pagination: 15,
      trash: false,
      newProduct: false,
      loadingAllHistory: false,
      downloadAllHistory: false,
    }
  );

  const {
    drawer,
    loading,
    pagination,
    trash,
    newProduct,
    loadingAllHistory,
    downloadAllHistory,
  } = actions;

  const [value, setValue] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    { qrHistory: [], allQr: [], drawerValue: "" }
  );

  const { qrHistory, allQr, drawerValue } = value;

  // Functions Used for Different Data
  const requestsCaller = () => {
    setActions({ loading: true });
    axios
      .get(`/qr/history/generate/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const workingData = [];
        for (const [key, value] of Object.entries(res?.data?.data)) {
          workingData.push(value);
        }
        console.log(qrHistory);
        setValue({ qrHistory: workingData });
        console.log(qrHistory);
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loading: false }));
  };

  const getAllQr = () => {
    setActions({ loadingAllHistory: true });
    axios
      .get("/product/get-all/corporate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Products Ready for Download");
        setActions({ downloadAllHistory: true });
        setValue({ allQr: res.data.data });
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loadingAllHistory: true }));
  };

  useEffect(() => requestsCaller(), []);

  const onCloseDrawer = () => setActions({ drawer: false });

  console.log({ qrHistory });

  const columns = [
    {
      key: "callId",
      title: "Call Id",
      render: (data) => data[0].callId,
    },
    {
      key: "productName",
      title: "Product Name",
      render: (data) => data[0]?.product?.title,
    },
    {
      key: "numberOfQr",
      title: "Number of QR",
      render: (data) => data.length,
    },
    {
      key: "actions",
      title: "Actions",
      render: (data) => <ColumnActions record={data} />,
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
      </div>
    );
  };

  return (
    <div className="">
      <ActionButtons
        pageTitle={""}
        showTrashButton={false}
        showTrashFunction={""}
        showReFreshButton={true}
        refreshFunction={requestsCaller}
        showExportDataButton={true}
        exportDataFunction={getAllQr}
        csvName={"GenerationHistory.csv"}
        totalItems={allQr}
        loadingItems={loadingAllHistory}
        downloadItems={downloadAllHistory}
        showAddNewButton={false}
        addNewFunction={""}
      />
      <div className="border-2 mt-5">
        <DataTable usersData={qrHistory} columns={columns} loading={loading} />
      </div>
      <DrawerComp
        title={"QR Code"}
        visible={drawer}
        onCloseDrawer={onCloseDrawer}
        data={drawerValue}
        destroyOnClose={true}
      />
    </div>
  );
};

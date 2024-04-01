import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useReducer } from "react";
import { useSelector } from "react-redux";
import ActionButtons from "../components/actionsButtons/Index";
import axios from "../appConfig/httpHelper";
import { toast } from "react-toastify";
import { EyeOutlined } from "@ant-design/icons";
import { DataTable } from "../components/table/Index";
import { innerTableActionBtnDesign } from "../components/styles/innerTableActions";
import QRCode from "react-qr-code";

const History = () => {
  // Declaring the States Required for the Working of the Component
  const [show, setShow] = useState(1);

  return (
    <div className="">
      <div className="flex justify-around items-center mt-4">
        <Button type="primary" onClick={() => setShow(1)}>
          Generation History
        </Button>
        <Button type="primary" onClick={() => setShow(2)}>
          Consumption History
        </Button>
      </div>
      {show === 1 ? <GenerationHistory /> : <ConsumptionHistory />}
    </div>
  );
};

export default History;

const GenerationHistory = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("jwt"));
  const user = useSelector((state) => state.user.user);

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
      {/* <DrawerComp
        title={"QR Code"}
        visible={drawer}
        onCloseDrawer={onCloseDrawer}
        data={drawerValue}
        destroyOnClose={true}
      /> */}
    </div>
  );
};

const ConsumptionHistory = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("jwt"));
  const user = useSelector((state) => state.user.user);
  // Declaring the States Required for the Working of the Component
  const [actions, setActions] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    {
      drawer: false,
      loading: false,
      pagination: 15,
      trash: false,
      loadingAllProducts: false,
      downloadAllProducts: false,
    }
  );

  const {
    drawer,
    loading,
    pagination,
    trash,
    loadingAllProducts,
    downloadAllProducts,
  } = actions;

  const [value, setValue] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    { products: [], allProducts: [] }
  );

  const { products, allProducts } = value;

  // Functions Used for Different Data
  const requestsCaller = () => {
    setActions({ loading: true });
    axios
      .get(`/qr/history/consume/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setValue({ products: res.data.data });
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loading: false }));
  };

  const getAllProducts = () => {
    setActions({ loadingAllProducts: true });
    axios
      .get(`/qr/history/consume/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Products Ready for Download");
        setActions({ downloadAllProducts: true });
        setValue({ allProducts: res.data.data });
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loadingAllProducts: true }));
  };

  useEffect(() => requestsCaller(), []);

  const columns = [
    {
      key: "qrId",
      title: "QR Id",
      render: (data) => data.qrId,
    },
    {
      key: "isRedeemed",
      title: "Redeemed",
      render: (data) => (data.isRedeemed ? "True" : "False"),
    },
    {
      key: "qrCode",
      title: "QR Code",
      render: (data) => <QRCode value={data.qrId} size={150} />,
    },
  ];
  

  console.log({ products });

  return (
    <div className="">
      <ActionButtons
        pageTitle={""}
        showTrashButton={false}
        showTrashFunction={""}
        showReFreshButton={true}
        refreshFunction={requestsCaller}
        showExportDataButton={true}
        exportDataFunction={getAllProducts}
        csvName={"ConsumptionHistory.csv"}
        totalItems={allProducts}
        loadingItems={loadingAllProducts}
        downloadItems={downloadAllProducts}
        showAddNewButton={false}
        addNewFunction={""}
      />
      <div className="border-2 mt-5">
        <DataTable usersData={products} columns={columns} loading={loading} />
      </div>
    </div>
  );
};

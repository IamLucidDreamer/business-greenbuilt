import React, { useEffect, useReducer } from "react";
import { DataTable } from "../components/table/Index";
import ActionButtons from "../components/actionsButtons/Index";
import axios from "../appConfig/httpHelper";
import { toast } from "react-toastify";
import { QrcodeOutlined } from "@ant-design/icons";
import { innerTableActionBtnDesign } from "../components/styles/innerTableActions";
// import { DrawerComp } from "./components/Drawer";
// import { FilterDrawer } from "./components/FilterDrawer";

const GenerateQr = () => {
  const token = JSON.parse(localStorage.getItem("jwt"));

  // Declaring the States Required for the Working of the Component
  const [actions, setActions] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    {
      drawer: false,
      loading: false,
      filter: false,
      pagination: 15,
      trash: false,
      newProduct: false,
      loadingAllProducts: false,
      downloadAllProducts: false,
    }
  );

  const { drawer, loading, filter, pagination } = actions;

  const [value, setValue] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    { products: [], drawerValue: {}, filterValue: {} }
  );

  const { products, drawerValue, filterValue } = value;

  // Functions Used for Different Data
  const requestsCaller = () => {
    setActions({ loading: true });
    axios
      .get("/product/get-all/corporate/?limit=500&offset=0", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setValue({
          products: res.data.data.filter((val) => val.isApproved === true),
        });
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loading: false }));
  };

  const getProductBySearch = (value) => {
    setActions({ loading: true });
    axios
      .post(
        "/product/search/?limit=500&offset=0",
        {
          key: "title",
          value: value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Search Performed Successfully.");
        setValue({
          products: res.data.data.filter((val) => val.isApproved === true),
        });
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loading: false }));
  };

  const getFilteredProduct = (value) => {
    setActions({ loading: true });
    const filterValue = {};
    if (value.industryTypeSelected !== "") {
      filterValue.industryType = value.industryTypeSelected;
    }
    if (value.packagingTypeSelected !== "") {
      filterValue.packagingType = value.packagingTypeSelected;
    }
    if (value.uomSelected !== "") {
      filterValue.uom = value.uomSelected;
    }
    console.log({ filterValue });
    axios
      .post("/product/get-all/query/?limit=500&offset=0", filterValue, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Filters Applied Successfully.");
        setValue({
          products: res.data.data.filter((val) => val.isApproved === true),
        });
        console.log(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loading: false }));
  };

  const GenerateHelper = (record) => {
    setActions({ drawer: true });
    setValue({ drawerValue: record });
  };

  useEffect(() => requestsCaller(), []);

  const columns = [
    {
      key: "title",
      title: "Title",
      render: (data) => data.title,
    },
    {
      key: "packagingType",
      title: "Packaging Type",
      render: (data) => data.packagingType,
    },
    {
      key: "uom",
      title: "UOM",
      render: (data) => data.uom,
    },
    {
      key: "description",
      title: "Description",
      render: (data) => data.description,
    },
    {
      key: "points",
      title: "Points",
      render: (data) => data.points,
    },
    {
      key: "isApproved",
      title: "Status",
      render: (data) => (data.isApproved ? "Approved" : "Pending"),
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
        <QrcodeOutlined
          title="View"
          style={innerTableActionBtnDesign}
          onClick={() => {
            GenerateHelper(props.record);
          }}
        />
      </div>
    );
  };

  const onCloseDrawer = () => {
    setActions({ drawer: false });
    setValue({ drawerValue: { qrId: "" } });
  };

  const openFilterDrawer = () => {
    setActions({ filter: true });
  };

  const onCloseFilterDrawer = () => {
    setActions({ filter: false });
    setValue({ filterValue: {} });
  };

  console.log({ products });

  return (
    <div className="">
      <ActionButtons
        pageTitle={"Generate QR"}
        showSearchButton={true}
        onSearch={getProductBySearch}
        showFilterButton={true}
        onFilter={openFilterDrawer}
        showTrashButton={false}
        showTrashFunction={""}
        showReFreshButton={true}
        refreshFunction={requestsCaller}
        showExportDataButton={false}
        exportDataFunction={""}
        totalItems={""}
        loadingItems={""}
        downloadItems={""}
        showAddNewButton={false}
        addNewFunction={""}
      />
      <div className="border-2 mt-5">
        <DataTable usersData={products} columns={columns} loading={loading} />
      </div>
      {/* <DrawerComp
        title={"QR Code"}
        width={"75%"}
        visible={drawer}
        onCloseDrawer={onCloseDrawer}
        data={drawerValue}
      ></DrawerComp> */}
      <div>
        {/* <FilterDrawer
          title={"Set Product Filters"}
          visible={filter}
          onCloseDrawer={onCloseFilterDrawer}
          data={filterValue}
          applyFilter={getFilteredProduct}
          resetFilter={requestsCaller}
        /> */}
      </div>
    </div>
  );
};

export default GenerateQr;

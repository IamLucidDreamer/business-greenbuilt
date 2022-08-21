import react from "react";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { innerTableActionBtnDesign } from "../../components/styles/innerTableActions";
import QRCode from "react-qr-code";

export const columns = [
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
];

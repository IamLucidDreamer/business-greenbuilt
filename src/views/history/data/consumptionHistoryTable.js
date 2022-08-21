import react from "react";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { innerTableActionBtnDesign } from "../../components/styles/innerTableActions";
import QRCode from "react-qr-code";

export const columns = [
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

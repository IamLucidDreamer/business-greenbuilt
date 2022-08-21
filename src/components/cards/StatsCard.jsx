import React from "react";
import {
  UserOutlined,
  QrcodeOutlined,
  DeploymentUnitOutlined,
  ScanOutlined ,
  PoweroffOutlined,
  FireOutlined,
  SyncOutlined 
} from "@ant-design/icons";

const StatsCard = (props) => {
  return (
    <div class="w-80 rounded-lg shadow-lg overflow-hidden bg-white">
      <div class="p-4 flex items-center">
        <div class="p-3 rounded-full text-green-1 bg-green-100 mr-8">
          {props.icon === 1 ? (
            <UserOutlined style={{ fontSize: "40px" }} />
          ) : null}
          {props.icon === 2 ? (
            <DeploymentUnitOutlined style={{ fontSize: "40px" }} />
          ) : null}
          {props.icon === 3 ? (
            <QrcodeOutlined style={{ fontSize: "40px" }} />
          ) : null}
          {props.icon === 4 ? (
            <ScanOutlined  style={{ fontSize: "40px" }} />
          ) : null}
          {props.icon === 5 ? (
            <PoweroffOutlined style={{ fontSize: "40px" }} />
          ) : null}
          {props.icon === 6 ? (
            <FireOutlined style={{ fontSize: "40px" }} />
          ) : null}
          {props.icon === 7 ? (
            <SyncOutlined  style={{ fontSize: "40px" }} />
          ) : null}
        </div>
        <div>
          <p class="mb-2 text-xl font-medium text-gray-600 ">{props.title}</p>
          <p class="text-2xl font-semibold text-gray-700">{props.stat}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;

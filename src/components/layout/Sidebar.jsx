import React, { useState } from "react";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  QrcodeOutlined,
  FundProjectionScreenOutlined,
  FileOutlined,
  HistoryOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logoGreenbuilt.png";
import "../styles/sidebar.css";
import { Layout, Menu } from "antd";

export const Sidebar = ({ setTitle }) => {
  const {  Sider } = Layout;
  const [collapsed, setCollapsed] = useState(true);

  const navigate = useNavigate();

  const routes = [
    {
      name: "Statistics",
      route: "/business/dashboard",
      icon: "ashboardOutlined",
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      style={{
        backgroundColor: "#fff",
        boxShadow: "1px 1px 6px #c1c1c1",
        zIndex: 2,
      }}
    >
      <img
        src={Logo}
        alt=""
        className={`mx-auto my-1.5 duration-300 ${collapsed ? "w-0" : "w-44"}`}
      />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        style={{ backgroundColor: "#fff", marginTop: "10px" }}
      >
        {routes.map((data, index) => (
          <Menu.Item
            key="1"
            icon={<DashboardOutlined style={{ fontSize: "18px" }} />}
            style={{ fontSize: "18px", display: "flex", color: "#0a2c3c" }}
            onClick={() => {
              navigate("/business/dashboard");
              setTitle("Statistics");
            }}
          >
            Dashboard
          </Menu.Item>
        ))}

        <Menu.Item
          key="2"
          icon={<UnorderedListOutlined style={{ fontSize: "18px" }} />}
          style={{ fontSize: "18px", display: "flex", color: "#0a2c3c" }}
          onClick={() => {
            navigate("/business/product");
            setTitle("Products");
          }}
        >
          Products
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<QrcodeOutlined style={{ fontSize: "18px" }} />}
          style={{ fontSize: "18px", display: "flex", color: "#0a2c3c" }}
          onClick={() => {
            navigate("/business/generateqr");
            setTitle("Generate QR");
          }}
        >
          Generate QR
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<FundProjectionScreenOutlined style={{ fontSize: "18px" }} />}
          style={{ fontSize: "18px", display: "flex", color: "#0a2c3c" }}
          onClick={() => {
            navigate("/business/monthlyplan");
            setTitle("Monthly Consumption Plan");
          }}
        >
          Consumption Plan
        </Menu.Item>
        <Menu.Item
          key="5"
          icon={<FormOutlined style={{ fontSize: "18px" }} />}
          style={{ fontSize: "18px", display: "flex", color: "#0a2c3c" }}
          onClick={() => {
            navigate("/business/monthlyconsumption");
            setTitle("Actual Consumption");
          }}
        >
          Actual Consumption
        </Menu.Item>
        <Menu.Item
          key="6"
          icon={<HistoryOutlined style={{ fontSize: "18px" }} />}
          style={{ fontSize: "18px", display: "flex", color: "#0a2c3c" }}
          onClick={() => {
            navigate("/business/history");
            setTitle("History");
          }}
        >
          History
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

import React, { useState } from "react";
import { Layout, Menu, Dropdown } from "antd";
import { Outlet } from "react-router-dom";

import "./styles/dashboardStyles.css";
import { HeaderElement } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { Content } = Layout;
  const [title, setTitle] = useState("Statistics");
  const user = useSelector(state => state?.user)
  console.log(user , "Dashboard")
  const setStateTitle = (value) => setTitle(value);

  const routes = [
    {
      name: "Statistics",
      route: "/business/dashboard",
      icon: "ashboardOutlined",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#e1e1e1" }}>
      <Sidebar setTitle={setStateTitle} />
      <Layout className="site-layout">
        <HeaderElement title={title} />
        <Content style={{ padding: "8px 24px", backgroundColor: "#f0f0f0" }}>
          {/* For Managing Component Change within the Nested Routes Outlet is used*/}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

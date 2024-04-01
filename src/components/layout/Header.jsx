import React, { useEffect, useState } from "react";
import { Layout, Menu, Dropdown, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined, DownOutlined, BellOutlined } from "@ant-design/icons";
import { logout } from "../../store/actions/user";
import axios from "../../appConfig/httpHelper";

export const HeaderElement = ({ title }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState(true);
  const [notificationData, setNotificationData] = useState([]);

  const { Header } = Layout;

  const DropDownMenu = () => (
    <Menu>
      <Menu.Item key="1">User Profile</Menu.Item>
      <Menu.Item key="2" onClick={() => dispatch(logout())}>
        LogOut
      </Menu.Item>
    </Menu>
  );

  const getNotifications = () => {
    const token = JSON.parse(localStorage.getItem("jwt"));
    axios
      .get(`/notification/user/${user?.id}?limit=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setNotificationData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {if(user.id){getNotifications()}}, [user]);

  const Notification = () => (
    <Modal
      title="Notifications"
      style={{ top: 80, right: 20, position: "absolute" }}
      visible={showNotification}
      closable={true}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      onCancel={() => {
        setShowNotification(false);
        setNotification(false);
      }}
    >
      <button className="text-blue-700 underline hover:no-underline">
        Mark All Read
      </button>
      {notificationData.map((data) => (
        <div className="bg-slate-100 my-1 pt-2 px-2 rounded">
          <h1 className="m-0 text-lg text-purple-1">{data?.text}</h1>
          <h1 className="text-right">{`${data?.date}/${data?.month}/${data?.year}`}</h1>
        </div>
      ))}
    </Modal>
  );

  console.log(notification, "Hello");

  return (
    <Header
      style={{
        paddingLeft: "35px",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 1,
        boxShadow: "0px 1px 8px #c1c1c1",
      }}
    >
      <h1 className="text-purple-1 text-xl m-0">Dashboard / {title}</h1>
      <div className="flex items-center justify-center">
        <button
          onClick={() => setShowNotification(true)}
          className={`mr-8 w-11 h-11 p-2 rounded-full flex items-center justify-center  ${
            notification
              ? `bg-purple-1 bg-opacity-10 border-1 border-purple-1 animate-pulse`
              : ""
          }`}
        >
          {notification ? (
            <span class="flex h-3 w-3 absolute -mt-8 -mr-8">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-1 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-purple-1"></span>
            </span>
          ) : null}
          <BellOutlined style={{ color: "#140035", fontSize: 24 }} />
        </button>
        <Notification />
        <Dropdown overlay={DropDownMenu} className="cursor-pointer">
          <div className="flex items-center">
            <h1 className="text-purple-1 text-base pr-3 m-0">{user.name}</h1>

            <div className="">
              <UserOutlined
                style={{
                  backgroundColor: "#fff",
                  fontSize: 28,
                  borderRadius: 14,
                }}
              />
              <DownOutlined style={{ color: "#140035", paddingLeft: 8 }} />
            </div>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

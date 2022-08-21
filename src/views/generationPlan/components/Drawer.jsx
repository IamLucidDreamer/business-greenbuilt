import React from "react";
import { Row, Col, Drawer, Tabs, TabPane, Image } from "antd";
import { Desc } from "../../components/layout/Desc";
import { DataTable } from "../../components/table/Index";

export const DrawerComp = (props) => {
  const { TabPane } = Tabs;
  console.log({ props });

  const columnsNestedTable = [
    {
      key: "sourceType",
      title: "Source Type",
      render: (data) => data.sourceType,
    },
    {
      key: "ownCaptive",
      title: "Own Captive",
      render: (data) => data.ownCaptive,
    },
    {
      key: "groupCaptive",
      title: "Group Captive",
      render: (data) => data.groupCaptive,
    },
    {
      key: "thirdPartyPurchase",
      title: "Third Party Purchase",
      render: (data) => data.thirdPartyPurchase,
    },
    {
      key: "total",
      title: "Total",
      render: (data) =>
        data?.ownCaptive + data?.thirdPartyPurchase + data?.groupCaptive,
    },
  ];

  return (
    <Drawer
      title={props.title}
      width="75%"
      placement="right"
      onClose={() => props.onCloseDrawer()}
      visible={props.visible}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Product information" key="1">
          <DataTable
            usersData={props?.data?.monthlyPlans}
            columns={columnsNestedTable}
            pagination={false}
          />
        </TabPane>
      </Tabs>
    </Drawer>
  );
};

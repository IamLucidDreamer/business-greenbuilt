import React from "react";
import { Row, Col, Button, Switch, Input, Space } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";

const { Search } = Input

export const ActionButtons = (props) => {
  const navigate = useNavigate();
  return (
    <div className="my-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-purple-1 m-0">
        {props.pageTitle}
      </h1>
      <Row gutter={30} className="flex items-center ">
      {props.showSearchButton ? (
          <Col>
              <Space direction="vertical">
                <Search placeholder="input search text" onSearch={props.onSearch} enterButton />
              </Space>
          </Col>
        ) : null}
        {props.showSearchButton ? (
          <Col>
           <Button
                className="w-44"
                type="primary"
                style={{ fontWeight: "bold" }}
                onClick={props.onFilter}
              >
              Filters
            </Button>
          </Col>
        ) : null}
        {props.showTrashButton ? (
          <Col>
            <div className="">
              Trash: &nbsp;
              <Switch
                defaultChecked={props.trash}
                onChange={() => props.showTrashFunction()}
                style={{ backgroundColor: "#616161" }}
              />
            </div>
          </Col>
        ) : null}
        {props.showReFreshButton ? (
          <Col>
            <Button
              type="primary"
              className="flex items-center"
              onClick={() => props.refreshFunction()}
            >
              <ReloadOutlined />
            </Button>
          </Col>
        ) : null}
        {props.showExportDataButton ? (
          <Col>
            {props.downloadItems ? (
              <Button
                className="w-44"
                type="primary"
                style={{ fontWeight: "bold" }}
                loading={props.loadingAllProducts}
              >
                <CSVLink
                  filename={props.csvName}
                  data={props.totalItems}
                  onClick={() => {
                    toast.success("The file is downloading");
                  }}
                  className="w-44"
                >
                  Download CSV
                </CSVLink>
              </Button>
            ) : (
              <Button
                className="w-44"
                type="primary"
                style={{ fontWeight: "bold" }}
                loading={props.loadingAllProducts}
                onClick={() => props.exportDataFunction()}
              >
                Export to CSV
              </Button>
            )}
          </Col>
        ) : null}
        {props.showAddNewButton ? (
          <Col>
            <Button
              className="w-44"
              type="primary"
              style={{ fontWeight: "bold" }}
              onClick={() => props.addNewFunction()}
            >
              Add New
            </Button>
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

export default ActionButtons;

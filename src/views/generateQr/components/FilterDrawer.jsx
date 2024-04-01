import React, { useState } from "react";
import { Row, Col, Drawer, Tabs, TabPane, Image, Button } from "antd";
import { useSelector } from "react-redux";

export const FilterDrawer = (props) => {
  const [industryTypeSelected, setIndustryTypeSelected] = useState("");
  const [packagingTypeSelected, setPackagingTypeSelected] = useState("");
  const [uomSelected, setUomSelected] = useState("");

  const industryType = useSelector((state) => state.statics.industryType);
  const uom = useSelector((state) => state.statics.uom);
  const packagingType = useSelector((state) => state.statics.packagingType);

  const resetFilters = () => {
    setIndustryTypeSelected("");
    setPackagingTypeSelected("");
    setUomSelected("");
    props.resetFilter()
  };

  const { TabPane } = Tabs;
  console.log({ props });
  return (
    <Drawer
      title={props.title}
      width="500px"
      placement="right"
      onClose={() => props.onCloseDrawer()}
      visible={props.visible}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Filters" key="1" style={{ padding: 10 }}>
          {/* <h1 className="text-xl font-bold">Industry Type</h1>s */}
          {/* <div className="flex flex-wrap gap-4">
            {industryType.map((data) => (
              <Button
                type={industryTypeSelected === data.name ? "ghost" : "primary"}
                style={{
                  backgroundColor:
                    industryTypeSelected === data.name ? "#140035" : "",
                  color: industryTypeSelected === data.name ? "#fff" : "",
                }}
                onClick={() => setIndustryTypeSelected(data.name)}
              >
                {data.name}
              </Button>
            ))}
          </div> */}
          <h1 className="text-xl font-bold mt-4">Packaging Type</h1>
          <div className="flex flex-wrap gap-4">
            {packagingType.map((data) => (
              <Button
                type={packagingTypeSelected === data.name ? "ghost" : "primary"}
                style={{
                  backgroundColor:
                    packagingTypeSelected === data.name ? "#140035" : "",
                  color: packagingTypeSelected === data.name ? "#fff" : "",
                }}
                onClick={() => setPackagingTypeSelected(data.name)}
              >
                {data.name}
              </Button>
            ))}
          </div>
          <h1 className="text-xl font-bold mt-4">Unit of Measurement</h1>
          <div className="flex flex-wrap gap-4">
            {uom.map((data) => (
              <Button
                type={uomSelected === data.name ? "ghost" : "primary"}
                style={{
                  backgroundColor: uomSelected === data.name ? "#140035" : "",
                  color: uomSelected === data.name ? "#fff" : "",
                }}
                onClick={() => setUomSelected(data.name)}
              >
                {data.name}
              </Button>
            ))}
          </div>
          <div className="absolute bottom-5 bg-white flex justify-between items-center w-10/12">
            <div className="w-1/2">
              <Button type="default" onClick={() => resetFilters()}>
                Reset
              </Button>
            </div>
            <div className="w-1/2">
              <Button
                type="primary"
                onClick={() =>
                  props.applyFilter({
                    industryTypeSelected,
                    packagingTypeSelected,
                    uomSelected,
                  })
                }
              >
                Apply
              </Button>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </Drawer>
  );
};

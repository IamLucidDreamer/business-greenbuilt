import React from "react";
import { Drawer } from "antd";

const DrawerComp = ({title ,width, visible, onCloseDrawer, children }) => {
  return (
    <Drawer
      title={title}
      width={width}
      placement="right"
      onClose={() => onCloseDrawer()}
      visible={visible}
    >
      {children}
    </Drawer>
  );
};

export default DrawerComp;

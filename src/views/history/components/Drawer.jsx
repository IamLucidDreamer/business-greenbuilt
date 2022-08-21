import React, { useState, useEffect } from "react";
import { Row, Col, Drawer, Tabs, TabPane, Image } from "antd";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const DrawerComp = (props) => {
  const { TabPane } = Tabs;

  const [qrCode, setQrCode] = useState([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (props.visible) {
      setQrCode(props.data);
    }
  }, [props.data]);

  console.log(props.data, "hello");

  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    console.log("Hello1");
    console.log(input);
    html2canvas(input)
      .then((canvas) => {
        console.log("Hello2");
        const imgData = canvas.toDataURL("image/png");
        console.log("Hello3");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "JPEG", 0, 0);
        pdf.output("dataurlnewwindow");
        pdf.save(`qrDownload ${props?.date}.pdf`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Drawer
      title={props.title}
      width="75%"
      placement="right"
      onClose={() => {
        props.onCloseDrawer();
      }}
      visible={props.visible}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Generate QR" key="1">
          <form>
            <Row>
              <Col span={12} lg={12} md={12} sm={32} xs={32}>
                {show ? (
                  <button
                    type="button"
                    onClick={() => printDocument()}
                    className="w-36 py-2 px-4 my-5 bg-purple-1 border-2 border-purple-1 focus:outline-none rounded-2xl text-lg text-left text-white font-bold group duration-500 flex justify-evenly items-center"
                  >
                    Download
                  </button>
                ) : null}
              </Col>
              <div
                id="divToPrint"
                className="flex flex-wrap justify-between gap-10 w-8/12"
              >
                {show ? (
                  <>
                    {qrCode.map((data) => (
                      <div
                        className={
                          !data?.isRedeemed
                            ? "border-red-500 border-8 m-2 p-2"
                            : "border-purple-1 border-8 m-2 p-2"
                        }
                      >
                        <QRCode key={data.qrId} value={data.qrId} size={80} />
                      </div>
                    ))}
                  </>
                ) : null}
              </div>
            </Row>
          </form>
        </TabPane>
      </Tabs>
    </Drawer>
  );
};

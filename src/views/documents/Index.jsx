import React, { useState } from "react";
import { Button } from "antd";
import axios from "../../appConfig/httpHelper";
import { toast } from "react-toastify";

export const Documents = () => {
  const token = JSON.parse(localStorage.getItem("jwt"));

  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState("");

  const uplaodDocument = () => {
    const formData = new FormData();
    formData.append("title", fileName);
    formData.append("file", file);
    axios
      .post("/document/upload/1", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => toast.success(res.data.message))
      .catch((err) => console.log(err));
  };
  return (
    <div className="mt-4 ">
      <div className="flex gap-4">
        <Button
          type="primary"
          onClick={() => setFileName("Power Purchase Agreement")}
        >
          Power Purchase Agreement
        </Button>
        <Button
          type="primary"
          onClick={() => setFileName("Energy Wheeling Agreement")}
        >
          Energy Wheeling Agreement
        </Button>
      </div>
      {fileName !== "" ? (
        <>
          <input
            type="file"
            className="p-4 border-4 rounded-lg border-purple-1 mt-4"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button onClick={() => uplaodDocument()}>Upload</Button>
        </>
      ) : null}
    </div>
  );
};

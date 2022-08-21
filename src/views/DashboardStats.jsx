import React, { useEffect, useState } from "react";
import StatsCard from "../components/cards/StatsCard";
import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import axios from "../appConfig/httpHelper";

const DashboardStats = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState("");

  const dataLoader = () => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("jwt"));
    console.log(token);
    axios
      .get(`/statistics/corporate/get-all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data, "Hello");
        setStats(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  };

  useEffect(() => {
    dataLoader();
    console.log("Hello UseEffect");
  }, []);

  return (
    <div className="relative px-4 py-2">
      <div className="flex justify-between items-center mr-10">
        <h1 className="text-2xl font-bold text-purple-1 m-0">
          Dashboard Statistics
        </h1>
        <Button type="primary" loading={loading} onClick={() => dataLoader()}>
          <ReloadOutlined style={{ margin: "0" }} />
        </Button>
      </div>
      <div className="flex flex-wrap items-center mt-10 gap-8">
        <StatsCard
          title={"Points"}
          stat={stats.availablePoints || 0}
          icon={1}
        />
        <StatsCard
          title={"Total Products"}
          stat={stats.totalProducts || 0}
          icon={2}
        />
        <StatsCard
          title={"Total QR's Generated"}
          stat={stats.totalQRGenerated || 0}
          icon={3}
        />
        <StatsCard
          title={"Total QR's Consumed"}
          stat={stats.totalQRConsumed || 0}
          icon={4}
        />
        <StatsCard
          title={"Total Points"}
          stat={stats.totalPoints || 0}
          icon={5}
        />
        <StatsCard
          title={"Total CO2 Offset"}
          stat={`${Math.round(stats.totalPoints * 0.935) || 0} Kg`}
          icon={6}
        />
        <StatsCard
          title={"Total H20 Saved"}
          stat={`${Math.round(stats.totalPoints * 2.59) || 0} Litres`}
          icon={7}
        />
      </div>
    </div>
  );
};

export default DashboardStats
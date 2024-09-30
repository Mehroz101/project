import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useParkingOwner } from "../../context/ReservationContext";

// Function to get the last 7 days' data
const getLast7DaysData = (data) => {
  const today = new Date();
  const past7Days = new Date();
  past7Days.setDate(today.getDate() - 6); // 6 days before today, including today makes 7 days

  // Filter data to include only the last 7 days
  return data.filter((item) => {
    const itemDate = new Date(item.createdAt); // Convert createdAt to Date object
    return itemDate >= past7Days && itemDate <= today;
  });
};

// Function to aggregate data by date and sort them
const aggregateDataByDate = (data) => {
  const result = {};

  data.forEach((item) => {
    const date = new Date(item.createdAt).toLocaleDateString(); // Format date
    if (!result[date]) {
      result[date] = { name: date, request: 0, earning: 0 };
    }
    result[date].request += 1; // Increment request count
    if (item.state === "completed") {
      console.log("reservation is completed");
      result[date].earning += parseFloat(item.totalPrice); // Sum up earnings
    }
  });
  for (const date in result) {
    result[date].earning = parseFloat(result[date].earning.toFixed(2));
  }

  // Convert the result to an array and sort by date
  const sortedData = Object.values(result).sort((a, b) => {
    const dateA = new Date(a.name);
    const dateB = new Date(b.name);
    return dateA - dateB; // Sort in ascending order
  });

  return sortedData;
};

const Chart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { reservation } = useParkingOwner();

  useEffect(() => {
    const fetchData = () => {
      try {
        if (reservation.length === 0) return; // Skip processing if no data

        // Filter and aggregate data
        const filteredData = getLast7DaysData(reservation);
        const aggregatedData = aggregateDataByDate(filteredData);
        setChartData(aggregatedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reservation]); // Depend on reservation

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="request"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="earning"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;

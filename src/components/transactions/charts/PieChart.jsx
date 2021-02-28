import { useState } from "react";
import Pie from "react-apexcharts";
import { useSelector } from "react-redux";
const PieChart = () => {
  const roomTransactions = useSelector((state) => state.entities.room.roomTransactions);

  const loadDetails = () => {
    let categoryVsAmount = {};
    let finalDetails = { series: [], labels: [] };
    roomTransactions.forEach((transaction) => {
      if (!categoryVsAmount[transaction.category]) {
        categoryVsAmount[transaction.category] = 0;
      }

      categoryVsAmount[transaction.category] += transaction.amount;
    });

    for (let prop in categoryVsAmount) {
      finalDetails.series.push(categoryVsAmount[prop]);
      finalDetails.labels.push(prop);
    }

    return finalDetails;
  };

  loadDetails();
  return (
    <Pie
      options={{
        labels: loadDetails().labels,
        responsive: [
          {
            breakpoint: 780,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      }}
      series={loadDetails().series}
      type="pie"
      width="350"
    />
  );
};

export default PieChart;

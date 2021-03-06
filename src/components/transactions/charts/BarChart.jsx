import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import "../../../styles/expensesByUsers.scss";

const BarChart = () => {
  const roomTransactions = useSelector((state) => state.entities.room.roomTransactions);
  const filteredTransactions = useSelector((state) => state.entities.room.filteredTransactions);

  const loadDetails = () => {
    let userVsAmount = {};
    let finalDetails = { series: [], categories: [] };

    if (filteredTransactions.length) {
      filteredTransactions.forEach((transaction) => {
        if (!userVsAmount[transaction.madeByEmail]) {
          userVsAmount[transaction.madeByEmail] = 0;
        }

        userVsAmount[transaction.madeByEmail] += transaction.amount;
      });
    } else {
      roomTransactions.forEach((transaction) => {
        if (!userVsAmount[transaction.madeByEmail]) {
          userVsAmount[transaction.madeByEmail] = 0;
        }

        userVsAmount[transaction.madeByEmail] += transaction.amount;
      });
    }

    for (let prop in userVsAmount) {
      finalDetails.series.push(userVsAmount[prop]);
      finalDetails.categories.push(prop);
    }

    return finalDetails;
  };

  loadDetails();

  const options = {
    chart: {
      width: "100%",
      height: 380,
      type: "bar",
    },
    fill: {
      colors: ["#71C7FF", "#26E7A6", "#FEBC3B", "#FF6178"],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        barHeight: "40%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },

    xaxis: {
      categories: loadDetails().categories,
    },
    legend: {
      position: "right",
      verticalAlign: "top",
      containerMargin: {
        left: 35,
        right: 60,
      },
    },
    responsive: [
      {
        breakpoint: 1250,
        options: {
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          legend: {
            position: "bottom",
          },
          xaxis: {
            labels: {
              show: false,
            },
          },
        },
      },
    ],
  };

  return (
    <div className="expeneses-by-users-container">
      <h3>Expenses by members</h3>
      <div className="max-width-chart">
        <Chart
          type="bar"
          series={[
            {
              name: "total expenses",
              data: loadDetails().series,
            },
          ]}
          options={options}
        />
      </div>
    </div>
  );
};

export default BarChart;

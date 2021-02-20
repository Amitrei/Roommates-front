import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import "../../../styles/expensesByUsers.scss";
const BarChart = () => {
  const roomTransactions = useSelector((state) => state.entities.room.roomTransactions);

  const loadDetails = () => {
    let userVsAmount = {};
    let finalDetails = { series: [], categories: [] };
    roomTransactions.forEach((transaction) => {
      if (!userVsAmount[transaction.madeByEmail]) {
        userVsAmount[transaction.madeByEmail] = 0;
      }

      userVsAmount[transaction.madeByEmail] += transaction.amount;
    });

    for (let prop in userVsAmount) {
      finalDetails.series.push(userVsAmount[prop]);
      finalDetails.categories.push(prop);
    }

    return finalDetails;
  };

  loadDetails();
  console.log(loadDetails());
  return (
    <div className="expeneses-by-users-container">
      <h3>Expenses by members</h3>
      <Chart
        type="bar"
        series={[
          {
            name: "total expenses",
            data: loadDetails().series,
          },
        ]}
        options={{
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: loadDetails().categories,
          },
        }}
        width="500"
      />
    </div>
  );
};

export default BarChart;

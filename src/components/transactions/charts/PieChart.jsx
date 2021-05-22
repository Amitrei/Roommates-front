import Pie from "react-apexcharts";
import { useSelector } from "react-redux";
const PieChart = () => {
  const roomTransactions = useSelector((state) => state.entities.room.roomTransactions);
  const filteredTransactions = useSelector((state) => state.entities.room.filteredTransactions);

  const loadDetails = () => {
    let categoryVsAmount = {};
    let finalDetails = { series: [], labels: [] };

    if(filteredTransactions.length) {
      filteredTransactions.forEach((transaction) => {
        if (!categoryVsAmount[transaction.category]) {
          categoryVsAmount[transaction.category] = 0;
        }
  
        categoryVsAmount[transaction.category] += transaction.amount;
      }); 
    }

    else{
      roomTransactions.forEach((transaction) => {
        if (!categoryVsAmount[transaction.category]) {
          categoryVsAmount[transaction.category] = 0;
        }
  
        categoryVsAmount[transaction.category] += transaction.amount;
      });
    }
   

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

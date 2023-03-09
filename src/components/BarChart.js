import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ statList }) {
    const [chartData, setChartData] = React.useState({
        labels: statList.map((statList) => statList.date), //statList.date.slice(0,10)), 
        datasets: [
          {
            label: "Passages",
            data: statList.map((statList) => statList.nb_passage)
          },
        ]
      })
    return <Bar data={chartData} />;
}

export default BarChart;
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartArray }) {
    const [chartData, setChartData] = React.useState({
        labels: chartArray,
        datasets: [
          {
            label: "Passages",
            data: chartArray,
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    return <Bar data={chartData} />;
}

export default BarChart;
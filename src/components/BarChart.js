import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import 'date-fns';
import 'chartjs-adapter-date-fns';

function BarChart({ statList }) {
  let dayTab = [];
  for (let i = 0; i < statList.length; i++) {
    let dayExists = false;
    let dayValue = Date.parse(statList[i].date.slice(0,10) + ' 00:00:00 GMT-0500');
    for (let j = 0; j < dayTab.length && !dayExists; j++) {
      if (dayValue == dayTab[j].x) {
        dayTab[j].y += statList[i].nb_passage;
        dayExists = true;
      }
    }
    if (!dayExists) {
      dayTab.push({x: dayValue, y: statList[i].nb_passage});
    }
  }
  let chartData = { datasets: [{ label: "Passages", data: dayTab}] };
  let chartOptions = { responsive: true, scales: { x: { type: 'time', time: { unit: 'day' } } } };
  return <Bar data={chartData} options={chartOptions} />;
}

export default BarChart;
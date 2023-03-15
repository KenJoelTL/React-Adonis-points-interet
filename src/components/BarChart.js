import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import 'chartjs-adapter-date-fns';

function BarChart({ statList }) {
  let dayTab = [];
  let dayIndex = -1;
  for (let i = 0; i < statList.length; i++) {
    // Pour le 3e livrable, la logique sera adaptée pour supporter jours, semaine ou mois.
    // Pour l'instant toutefois, elle supporte seulement par jours.
    let dayValue = Date.parse(statList[i].date.slice(0,10) + ' 00:00:00 GMT-0500');
    if (dayIndex >= 0 && dayValue == dayTab[dayIndex].x) {
      dayTab[dayIndex].y += statList[i].nb_passage;
    } else {
      dayTab.push({x: dayValue, y: statList[i].nb_passage});
      dayIndex++;
    }
  }
  let chartData = { datasets: [{ label: "Passages", data: dayTab}] };
  let chartOptions = { responsive: true, scales: { x: { type: 'time', time: { unit: 'day' } } } };
  return <Bar data={chartData} options={chartOptions} />;
}

export default BarChart;
import React from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"
import 'chartjs-adapter-date-fns'
import startOfWeek from 'date-fns/startOfWeek'

function BarChart({ statList, timeGrouping }) {
  let groupedList = []
  let groupedIndex = -1
  let groupedDate
  for (let i = 0; i < statList.length; i++) {
    if (timeGrouping == 'month') {
      groupedDate = Date.parse(statList[i].date.slice(0, 7) + '-01 00:00:00 GMT-0500')
    } else if (timeGrouping == 'week') {
      groupedDate = Date.parse(startOfWeek(new Date(statList[i].date.slice(0, 10)), { weekStartsOn: 1 }))
    } else { // jour
      groupedDate = Date.parse(statList[i].date.slice(0, 10) + ' 00:00:00 GMT-0500')
    }
    if (groupedIndex >= 0 && groupedDate == groupedList[groupedIndex].x) {
      groupedList[groupedIndex].y += statList[i].nb_passage
    } else {
      groupedList.push({ x: groupedDate, y: statList[i].nb_passage })
      groupedIndex++
    }
  }
  let chartData = { datasets: [{ label: "Passages", data: groupedList }] }
  let chartOptions = { responsive: true, scales: { x: { type: 'time', time: { unit: timeGrouping } } } }
  return <Bar data={chartData} options={chartOptions} />
}

export default BarChart
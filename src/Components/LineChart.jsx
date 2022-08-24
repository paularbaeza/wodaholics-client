import { useMemo } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function LineChart(props) {
  const { userBenchmarks, dateOfBenchmark } = props;

  const labels = dateOfBenchmark;
  const scores = userBenchmarks;


  const options = {
    fill: true,
    responsive: true,
    scales: {
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "Score:",
          data: scores,
          tension: 0.4,
          borderColor: "#FFB000",
          pointRadius: 8,
          pointBackgroundColor: "#FF7400",
          backgroundColor: "rgb(255,168,57,0.1)",
        },
      ],
      labels,
    };
  }, []);

  return <Line data={data} options={options} />;
}

export default LineChart;

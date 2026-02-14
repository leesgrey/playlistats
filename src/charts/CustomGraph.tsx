import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartOptions, ChartData } from "chart.js";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

interface CustomGraphProps {
  id: string | null;
  customX: (number | null)[];
  customY: (number | null)[];
  labels: string[];
  xLabel: string;
  yLabel: string;
}

const axisRanges: Record<
  string,
  { suggestedMin?: number; suggestedMax?: number }
> = {
  acousticness: { suggestedMin: 0, suggestedMax: 1 },
  danceability: { suggestedMin: 0, suggestedMax: 1 },
  energy: { suggestedMin: 0, suggestedMax: 1 },
  instrumentalness: { suggestedMin: 0, suggestedMax: 1 },
  liveness: { suggestedMin: 0, suggestedMax: 1 },
  loudness: { suggestedMin: -60, suggestedMax: 0 },
  speechiness: { suggestedMin: 0, suggestedMax: 1 },
  tempo: {},
  valence: { suggestedMin: 0, suggestedMax: 1 },
};

const CustomGraph = ({
  customX,
  customY,
  labels,
  xLabel,
  yLabel,
}: CustomGraphProps) => {
  const chartData: ChartData<"scatter"> = {
    datasets: [
      {
        label: "Custom Graph",
        data: customX.map((x, idx) => ({
          x: x ?? 0,
          y: customY[idx] ?? 0,
        })),
        backgroundColor: "#d66767",
        borderColor: "#ece6e1",
      },
    ],
  };

  const options: ChartOptions<"scatter"> = {
    scales: {
      x: {
        type: "linear",
        ticks: { color: "#ece6e1" },
        title: {
          display: true,
          text: xLabel || "",
          color: "#ece6e1",
        },
        ...axisRanges[xLabel],
      },
      y: {
        type: "linear",
        ticks: { color: "#ece6e1" },
        title: {
          display: true,
          text: yLabel || "",
          color: "#ece6e1",
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => labels[context.dataIndex] || "",
        },
      },
    },
  };

  return <Scatter data={chartData} options={options} />;
};

export default CustomGraph;

import { Doughnut } from "react-chartjs-2";
import { useMemo } from "react";

const COLORS = [
  "#405BD5",
  "#6F40D5",
  "#BA40D5",
  "#D540A5",
  "#D5405B",
  "#D56F40",
];

const labelColors: Record<string, string | undefined> = {
  4: COLORS[0],
  3: COLORS[1],
  1: COLORS[2],
  2: COLORS[3],
  5: COLORS[4],
  6: COLORS[5],
};

type TimeSigDoughnutProps = {
  sigCount: Record<string, number>;
};

const TimeSigDoughnut = ({ sigCount }: TimeSigDoughnutProps) => {
  const getColors = (labels: string[]) => {
    return labels.map((sig) => {
      if (labelColors[sig]) {
        return labelColors[sig];
      }

      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgba(${r}, ${g}, ${b})`;
    });
  };

  const chartData = useMemo(() => {
    const labels = Object.keys(sigCount);

    return {
      labels,
      datasets: [
        {
          data: Object.values(sigCount),
          backgroundColor: getColors(labels),
        },
      ],
    };
  }, [sigCount]);

  return (
    <Doughnut
      data={chartData}
      options={{
        plugins: {
          legend: {
            position: "right",
            labels: {
              color: "#ece6e1",
            },
          },
        },
      }}
    />
  );
};

export default TimeSigDoughnut;

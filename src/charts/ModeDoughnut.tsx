import { Doughnut } from "react-chartjs-2";
import { useMemo } from "react";

type ModeDoughnutProps = {
  modes: {
    major: number;
    minor: number;
  };
};

const ModeDoughnut = ({ modes }: ModeDoughnutProps) => {
  const chartData = useMemo(() => {
    return {
      labels: ["major", "minor"],
      datasets: [
        {
          data: [modes.major, modes.minor],
          backgroundColor: ["#FF6384", "#36A2EB"],
        },
      ],
    };
  }, [modes]);

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

export default ModeDoughnut;

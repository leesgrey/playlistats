import { Doughnut } from "react-chartjs-2";
import { useMemo } from "react";

type GenreDoughnutProps = {
  genres: Record<string, number>;
};

const GenreDoughnut = ({ genres }: GenreDoughnutProps) => {
  const data = useMemo(() => {
    const labels = Object.keys(genres);

    return {
      labels,
      datasets: [
        {
          data: Object.values(genres),
          backgroundColor: getColors(labels),
        },
      ],
    };
  }, [genres]);

  const getColors = (genreKeys: string[]) => {
    return genreKeys.map(() => {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgba(${r}, ${g}, ${b})`;
    });
  };

  return (
    <Doughnut
      data={data}
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

export default GenreDoughnut;

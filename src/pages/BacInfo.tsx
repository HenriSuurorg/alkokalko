import React from "react";
import { RouteComponentProps } from "react-router";
import { Line } from "react-chartjs-2";
import { bacStatus } from "../utils/bacStatus";
import { userParameters } from "../utils/userParameters";
import "chartjs-plugin-annotation";
import { ChartOptions } from "chart.js";
import { soberingTime } from "../utils/soberingTime";

interface Props
  extends RouteComponentProps<
    { id: string },
    {},
    {
      currentBac: number;
      graphBacData: number[];
      curBacIdx: number;
      currentBac2: number;
    }
  > {}

export const BacInfo: React.FC<Props> = ({ location, history, match }) => {
  const { currentBac, graphBacData, curBacIdx, currentBac2 } = location.state;
  const { eliminationRate } = userParameters(match.params.id);

  let labels = [];

  for (let n in graphBacData) {
    // labels.push("");
    labels.push((parseFloat(n) * 0.01).toFixed(2));
  }

  const editDrinks = () => {
    history.push(`/user/drinks/${match.params.id}`);
  };

  const editUser = () => {
    history.push("/user");
  };

  const description = bacStatus(currentBac);

  const graphData = {
    labels: labels,
    datasets: [
      {
        label: "vere alkoholisisaldus",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(220,56,6,100)",
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: graphBacData,
      },
    ],
  };
  const options = {
    annotation: {
      annotations: [
        {
          type: "line",
          mode: "vertical",
          scaleID: "x-axis-0",
          value: (curBacIdx * 0.01).toFixed(2),
          borderColor: "black",
          borderWidth: 2,
          borderDash: [5, 5],
          label: {
            backgroundColor: "rgba(220,56,6,100)",
            content: "praegune joove",
            enabled: false,
          },
        },
      ],
    },
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
    },
  };

  return (
    <div className="container" style={{ maxWidth: "800px" }}>
      <h1>Sinu vere alkoholisisaldus: {currentBac}</h1>

      <h1>
        Sa oled kaine ~{soberingTime(graphBacData, curBacIdx, eliminationRate)}{" "}
        tunni pärast
      </h1>
      <h3>{description}</h3>
      <button onClick={editDrinks}>muuda jooke</button>
      <button onClick={editUser}>muuda kasutajat</button>
      <Line
        data={graphData as any}
        legend={{ display: false }}
        options={options as ChartOptions}
      />
    </div>
  );
};

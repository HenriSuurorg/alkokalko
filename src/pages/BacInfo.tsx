import React from "react";
import { RouteComponentProps } from "react-router";
import { Line } from "react-chartjs-2";
import { bacStatus } from "../utils/bacStatus";
import { userParameters } from "../utils/userParameters";

interface Props
  extends RouteComponentProps<
    { id: string },
    {},
    { currentBac: number; graphBacData: number[] }
  > {}

export const BacInfo: React.FC<Props> = ({ location, history, match }) => {
  const { currentBac, graphBacData } = location.state;
  const { eliminationRate } = userParameters(match.params.id);

  let labels = [];

  for (let _ in graphBacData) {
    labels.push("");
    //labels.push((parseFloat(n) * 0.01).toFixed(2));
  }

  const editDrinks = () => {
    history.push(`/user/drinks/${match.params.id}`);
  };

  const editUser = () => {
    history.push("/user");
  };

  console.log(graphBacData);

  const description = bacStatus(currentBac);

  const graphData = {
    labels: labels,
    datasets: [
      {
        label: "alcohol Content",
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
        Sa oled kaine ~{Math.round(currentBac / eliminationRate)} tunni pärast
      </h1>
      <h3>{description}</h3>
      <button onClick={editDrinks}>muuda jooke</button>
      <button onClick={editUser}>muuda kasutajat</button>
      <Line data={graphData} legend={{ display: false }} options={options} />
    </div>
  );
};

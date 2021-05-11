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
    }
  > {}

export const BacInfo: React.FC<Props> = ({ location, history, match }) => {
  const { currentBac, graphBacData, curBacIdx } = location.state;
  const { eliminationRate } = userParameters(match.params.id);

  let labels = [];

  for (let n in graphBacData) {
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
    tooltips: { enabled: false },
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
    },
  };

  return (
    <div className="container bac__container">
      <div className="Logo bac__logo">
        <h1>Alko-</h1>
        <h1>Kalko</h1>
      </div>
      <div className="bac__buttons">
        <h2 onClick={editUser} className="bac__edit-user-button">
          muuda kasutajat
        </h2>
        <h2 onClick={editDrinks} className="bac__edit-drinks-button">
          muuda jooke
        </h2>
      </div>
      <div className="bac__info-container">
        <div className="bac__main-text">
          <h2>
            Sinu vere alkoholisisaldus on{" "}
            <b>{(currentBac * 10).toFixed(2)} promilli</b>
          </h2>
          <h5>
            Mis tähendab, et 1000 milliliitris sinu organismis ringlevas veres
            on 1.4 grammi puhast alkoholi.
          </h5>
        </div>
        <hr className="bac__line" />
        <h3 className="bac__description">{description}</h3>
        <hr className="bac__line" />
        <div className="bac__main-text">
          <h2>
            Sa oled kaine{" "}
            <b>
              ~{soberingTime(graphBacData, curBacIdx, eliminationRate)} tunni
              pärast
            </b>
          </h2>
          <h5>
            Tegmist on oletusega! Seda aega ei tohi kasutada, et välja
            arvestada, millal võib rooli minna!
          </h5>
        </div>
        <div className="bac__graph-container">
          <Line
            data={graphData as any}
            legend={{ display: false }}
            options={options as ChartOptions}
          />
        </div>
      </div>
    </div>
  );
};

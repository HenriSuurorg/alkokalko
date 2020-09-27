export type drinkType = {
  type: string;
  volume: string;
  unit: string;
  abv: string;
  timePassed: string;
};

export type duplicateDrinkType = {
  type: string;
  volume: string;
  unit: string;
  abv: string;
};

export type chartDataType = {
  labels: string[];
  datasets: [
    {
      label: string;
      fill: boolean;
      lineTession: number;
      backgroundColor: string;
      borderColor: string;
      borderDashOffset: number;
      borderJoinStyle: string;
      pointBorderWidth: number;
      pointHoverRadius: number;
      pointHoverBackgroundColor: string;
      pointHoverBorderColor: string;
      pointHoverBorderWidth: number;
      pointRadius: number;
      pointHitRadius: number;
      data: number[];
    }
  ];
};

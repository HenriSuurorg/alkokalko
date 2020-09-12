export const userParameters = (id: string) => {
  const paramArray = id.split(";");
  return {
    widmarkFactor: parseFloat(paramArray[0]),
    eliminationRate: parseFloat(paramArray[1]),
    absorptionRate: parseFloat(paramArray[2]),
    weight: parseFloat(paramArray[3]),
  };
};

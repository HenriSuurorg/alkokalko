export const soberingTime = (
  graphData: number[],
  curBacIdx: number,
  eliminationRate: number
) => {
  const temp = graphData.slice(curBacIdx, graphData.length);
  const max = Math.max(...temp);
  const idx = temp.findIndex((val) => val === max);

  const time = max / eliminationRate - idx / 100;

  return Math.round(time);
};

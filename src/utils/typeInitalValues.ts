/* 
              <option value="large-beer">Suur õlu</option>
              <option value="small-beer">Väike õlu</option>
              <option value="glass-wine">Klaas veini</option>
              <option value="shot-vodka">Pits viina</option>
              <option value="gin">Gin</option>
              <option value="cognac">Konjak</option>
              <option value="whisky">Viski</option>
              <option value="coctail">Kokteil</option>
              <option value="other">Muu jook</option>
*/
export const typeInitalValues = (type: string) => {
  let volume = "";
  let abv = "";
  if (type === "large-beer") {
    volume = "500";
    abv = "4.8";
  } else if (type === "small-beer") {
    volume = "500";
    abv = "4.8";
  } else if (type === "glass-wine") {
    volume = "170";
    abv = "13";
  } else if (type === "shot-vodka") {
    volume = "40";
    abv = "40";
  } else if (type === "gin") {
    volume = "50";
    abv = "40";
  } else if (type === "cognac") {
    volume = "50";
    abv = "40";
  } else if (type === "whisky") {
    volume = "100";
    abv = "40";
  } else if (
    type === "gin-tonic" ||
    type === "mojito" ||
    type === "bloody-mary"
  ) {
    volume = "400";
    abv = "15";
  } else if (type === "white-russian") {
    volume = "100";
    abv = "25";
  } else if (type === "martini") {
    volume = "100";
    abv = "33";
  } else if (type === "coctail") {
    volume = "400";
    abv = "15";
  }
  return { type: type, volume: volume, unit: "ml", abv: abv, timePassed: "" };
};

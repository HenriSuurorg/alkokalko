import React from "react";
import { Formik } from "formik";
import { drinkSchema } from "../validationSchemas/drinkSchema";
import { duplicateDrinkType } from "../types";
import { typeInitalValues } from "../utils/typeInitalValues";
import { CgMathPlus } from "react-icons/cg";

interface Props {
  closeForm: (
    type: string,
    volume: string,
    unit: string,
    abv: string,
    timePassed: string
  ) => void;
  duplicateDrinkData: duplicateDrinkType | null;
  addingNewDrink: boolean;
  cancelAdding: () => void;
}

export const NewDrink: React.FC<Props> = ({
  closeForm,
  duplicateDrinkData,
  addingNewDrink,
  cancelAdding,
}) => {
  return !addingNewDrink ? null : (
    <div className="newdrink__container">
      <Formik
        initialValues={{
          type: duplicateDrinkData?.type || "large-beer",
          volume: duplicateDrinkData?.volume || "500",
          unit: duplicateDrinkData?.unit || "ml",
          timePassed: "",
          abv: duplicateDrinkData?.abv || "40",
        }}
        onSubmit={(values) => {
          closeForm(
            values.type,
            values.volume,
            values.unit,
            values.abv,
            values.timePassed
          );
        }}
        validationSchema={drinkSchema}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setValues,
          errors,
          touched,
        }) => (
          <form className="newdrink__form">
            <div className="newdrink__parameter-container newdrink__title">
              <h4>Mis jook?</h4>
              <select
                name="type"
                onChange={(e) => setValues(typeInitalValues(e.target.value))}
                onBlur={handleBlur}
                value={values.type}
                className="newdrink__type-input"
              >
                <option value="large-beer">Suur õlu</option>
                <option value="small-beer">Väike õlu</option>
                <option value="glass-wine">Klaas veini</option>
                <option value="shot-vodka">Pits viina</option>
                <option value="cognac">Konjak</option>
                <option value="whisky">Viski</option>
                <option value="gin-tonic">Gin Tonic</option>
                <option value="mojito">Mojito</option>
                <option value="bloody-mary">Bloody Mary</option>
                <option value="white-russian">White Russian</option>
                <option value="martini">Martini</option>
                <option value="coctail">Muu kokteil</option>
                <option value="other">Muu jook</option>
              </select>
            </div>
            <div className="newdrink__parameter-container newdrink__parameter-container1">
              <h4
                style={{
                  color:
                    errors.volume && touched.volume ? "#ff0033" : "#3f4649",
                }}
              >
                Kui palju?
              </h4>
              <div className="newdrink__parameter-subcontainer">
                <input
                  name="volume"
                  placeholder=""
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.volume}
                  type="text"
                  className="newdrink__volume-input"
                />
                <h3>ml</h3>
              </div>
            </div>
            <hr className="drinkcard__line" />
            <div className="newdrink__parameter-container newdrink__parameter-container2">
              <h4
                style={{
                  color: errors.abv && touched.abv ? "#ff0033" : "#3f4649",
                }}
              >
                Kui kange?
              </h4>
              <div className="newdrink__parameter-subcontainer">
                <input
                  name="abv"
                  placeholder=""
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.abv}
                  type="text"
                  className="newdrink__abv-input"
                />
                <h3>%</h3>
              </div>
            </div>
            <div className="newdrink__parameter-container newdrink__parameter-container3">
              <h4
                style={{
                  color:
                    errors.timePassed && touched.timePassed
                      ? "#ff0033"
                      : "#3f4649",
                }}
              >
                {" "}
                Mitu tundi tagasi?{" "}
              </h4>
              <div className="newdrink__parameter-subcontainer">
                <input
                  name="timePassed"
                  placeholder=""
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.timePassed}
                  type="text"
                  className="newdrink__timePassed-input"
                />
                <h3>tundi</h3>
              </div>
            </div>
            <CgMathPlus
              className="drinkcard__del-icon drinkcard__action-icon newdrink__del-icon"
              onClick={() => cancelAdding()}
            />
            <CgMathPlus
              className="drinkcard__plus-icon drinkcard__action-icon newdrink__plus-icon"
              onClick={() => handleSubmit()}
            />
            <button
              className="newdrink__mobile-del-button"
              onClick={() => cancelAdding()}
            />
            <CgMathPlus
              className="drinkcard__plus-icon drinkcard__action-icon newdrink__plus-icon"
              onClick={() => handleSubmit()}
            />
            <button className="newdrink__mobile-del-button">Kustuta</button>
            <button
              className="newdrink__mobile-plus-button"
              onClick={() => handleSubmit()}
            >
              Lisa
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

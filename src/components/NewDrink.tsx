import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { drinkSchema } from "../validationSchemas/drinkSchema";
import { duplicateDrinkType } from "../types";

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
}

export const NewDrink: React.FC<Props> = ({
  closeForm,
  duplicateDrinkData,
  addingNewDrink,
}) => {
  return !addingNewDrink ? null : (
    <div>
      <Formik
        initialValues={{
          type: duplicateDrinkData?.type || "",
          volume: duplicateDrinkData?.volume || "",
          unit: duplicateDrinkData?.unit || "",
          timePassed: "",
          abv: duplicateDrinkData?.abv || "",
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
          touched,
          errors,
          values,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
        }) => (
          <form>
            <select
              name="type"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.type}
              className="newdrink__drink-type-input"
            >
              <option value="25">jook</option>
              <option value="vodka">viin</option>
              <option value="beer">õlu</option>
              <option value="wine">vein</option>
            </select>
            <input
              name="volume"
              placeholder="suurus (ml)"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.volume}
              type="text"
              className="newdrink__drink-volume-input"
            />
            <select
              name="unit"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.unit}
              className="newdrink__drink-type"
            >
              <option value="5">ühik</option>
              <option value="ml">ml</option>
            </select>
            <input
              name="timePassed"
              placeholder="aega möödas (h)"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.timePassed}
              type="text"
              className="newdrink__drink-timepassed-input"
            />
            <input
              name="abv"
              placeholder="joogi kangus (%)"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.abv}
              type="text"
              className="newdrink__drink-abv-input"
            />
            <ErrorMessage name="abv" />
            <button onClick={() => handleSubmit()}>Kinnita</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

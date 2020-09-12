import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { drinkSchema } from "../validationSchemas/drinkSchema";
import { duplicateDrinkType } from "../types";

interface Props {
  closeForm: (
    type: string,
    volume: string,
    unit: string,
    ABV: string,
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
  const handleSubmit = (values: any) => {
    closeForm(
      values.type,
      values.volume,
      values.unit,
      values.ABV,
      values.timePassed
    );
  };

  return !addingNewDrink ? null : (
    <div>
      <Formik
        initialValues={{
          type: duplicateDrinkData?.type || "",
          volume: duplicateDrinkData?.volume || "",
          unit: duplicateDrinkData?.unit || "",
          timePassed: "",
          ABV: duplicateDrinkData?.ABV || "",
        }}
        onSubmit={handleSubmit}
        validationSchema={drinkSchema}
      >
        {() => (
          <Form>
            <Field name="type" as="select">
              <option value="25">jook</option>
              <option value="vodka">viin</option>
              <option value="beer">õlu</option>
              <option value="wine">vein</option>
            </Field>
            <Field name="volume" placeholder="suurus (ml)" />
            <ErrorMessage name="volume" />
            <Field name="unit" as="select">
              <option value="5">ühik</option>
              <option value="ml">ml</option>
            </Field>
            <Field name="timePassed" placeholder="aega möödas (h)" />
            <ErrorMessage name="timePassed" />
            <Field name="ABV" placeholder="joogi kangus (%)" />
            <ErrorMessage name="ABV" />
            <button type="submit">Kinnita</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

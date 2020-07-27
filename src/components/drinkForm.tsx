import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface Props {
  closeForm: (
    type: string,
    volume: string,
    unit: string,
    ABV: string,
    timePassed: string
  ) => void;
}

const DrinkForm: React.FC<Props> = ({ closeForm }) => {
  const validationSchema = Yup.object({
    type: Yup.string().required("See väli on kohustuslik"),
    volume: Yup.number().required("See väli on kohustuslik"),
    unit: Yup.string().required("See väli on kohustuslik"),
    timePassed: Yup.number().required("See väli on kohustuslik"),
    ABV: Yup.number()
      .max(100, "Siseta joogi kangus protsentides")
      .required("See väli on kohustuslik"),
  });

  const handleSubmit = (values: any) => {
    closeForm(
      values.type,
      values.volume,
      values.unit,
      values.ABV,
      values.timePassed
    );
  };

  return (
    <Formik
      initialValues={{
        type: "",
        volume: "",
        unit: "",
        timePassed: "",
        ABV: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(props) => (
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
            <option value="25">ühik</option>
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
  );
};

export default DrinkForm;

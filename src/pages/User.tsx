import React from "react";
import { Formik } from "formik";
import { RouteComponentProps } from "react-router";
import { useLocalStorage } from "../utils/useLocalState";
import { userParamCalc } from "../utils/userParamCalc";
import { userSchema } from "../validationSchemas/userSchema";

interface UserProps extends RouteComponentProps {}

export const User: React.FC<UserProps> = ({ history }) => {
  const [userParams, setUserParams] = useLocalStorage("userParams", {});
  return (
    <Formik
      initialValues={{
        weight: userParams.weight || "",
        height: userParams.height || "",
        age: userParams.age || "",
        sex: userParams.sex || "",
        stomachState: userParams.stomachState || "",
        drinkingHabits: userParams.drinkingHabits || "",
      }}
      onSubmit={(values) => {
        const params = userParamCalc(
          values.weight,
          values.height,
          values.age,
          values.sex,
          values.stomachState,
          values.drinkingHabits
        );
        setUserParams({
          weight: values.weight,
          height: values.height,
          age: values.age,
          sex: values.sex,
          stomachState: values.stomachState,
          drinkingHabits: values.drinkingHabits,
        });

        history.push(
          `/user/drinks/${params.widmarkFactor};${params.eliminationRate};${params.absorptionRate};${params.weight}`
        );
      }}
      validationSchema={userSchema}
    >
      {({
        touched,
        errors,
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isValid,
      }) => (
        <div className="userform__container">
          <form className="userform__form-container">
            <div className="Logo Logo__userform">
              <h1>Alko-</h1>
              <h1>Kalko</h1>
            </div>
            <div className="userform__title-container">
              <h2>Sisesta oma füüsilised näitajad</h2>
            </div>
            <div className="userform__radio-container left-element">
              <input
                type="radio"
                name="sex"
                value="male"
                id="male"
                checked={values.sex === "male"}
                onChange={() => setFieldValue("sex", "male")}
                style={{ display: "none" }}
              />
              <label
                className="userform__radio-label"
                htmlFor="male"
                style={{
                  border:
                    values.sex === "male"
                      ? "1px solid #dc3806"
                      : "1px solid #818181",
                }}
              >
                Mees
              </label>
            </div>
            <div className="userform__radio-container right-element">
              <input
                type="radio"
                name="sex"
                value="female"
                id="female"
                checked={values.sex === "female"}
                onChange={() => setFieldValue("sex", "female")}
                style={{ display: "none" }}
              />
              <label
                className="userform__radio-label"
                htmlFor="female"
                style={{
                  border:
                    values.sex === "female"
                      ? "0.5px solid #dc3806"
                      : "0.5px solid #B1B4B6",
                }}
              >
                Naine
              </label>
            </div>

            <h4
              className="left-element userform__description"
              style={{
                color: errors.weight && touched.weight ? "#ff0033" : "#3f4649",
              }}
            >
              Sisesta oma kaal kilogrammides
            </h4>
            <input
              name="weight"
              placeholder="Kaal (kg)"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.weight}
              type="text"
              className="right-element userform__text-input"
            />

            <h4
              className="left-element userform__description"
              style={{
                color: errors.height && touched.height ? "#ff0033" : "#3f4649",
              }}
            >
              Sisesta oma pikkus sentimeetrites
            </h4>
            <input
              name="height"
              placeholder="Pikkus (cm)"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.height}
              type="text"
              className="right-element userform__text-input"
            />

            <h4
              className="left-element userform__description"
              style={{
                color: errors.age && touched.age ? "#ff0033" : "#3f4649",
              }}
            >
              Sisesta oma vanus aastates
            </h4>
            <input
              name="age"
              placeholder="Vanus (aastat)"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.age}
              type="text"
              className="right-element userform__text-input"
            />

            <h4
              className="left-element userform__description"
              style={{
                color:
                  errors.stomachState && touched.stomachState
                    ? "#ff0033"
                    : "#3f4649",
              }}
            >
              Kui tühi oli su kõht enne <br /> alkoholi tarbimist?
            </h4>
            <select
              name="stomachState"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.stomachState}
              className="right-element userform__select-input"
            >
              <option value="25"></option>
              <option value="full">täis</option>
              <option value="mostly-full">pigem täis</option>
              <option value="average">keskmiselt</option>
              <option value="mostly-empty">pigem tühi</option>
              <option value="empty">tühi</option>
            </select>

            <h4
              className="left-element userform__description"
              style={{
                color:
                  errors.drinkingHabits && touched.drinkingHabits
                    ? "#ff0033"
                    : "#3f4649",
              }}
            >
              Kui tihti tarbid korraga rohkem <br /> kui 3 ühikut alkoholi?
            </h4>
            <select
              name="drinkingHabits"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.drinkingHabits}
              className="right-element userform__select-input"
            >
              <option value="25"></option>
              <option value="everyday">Iga päev</option>
              <option value="often">Mitu korda nädalas</option>
              <option value="sometimes">Korra nädalas</option>
              <option value="rarely">Vähem kui korra nädalas</option>
            </select>
            <button
              onClick={() => handleSubmit()}
              type="submit"
              className="full-element userform__button"
              disabled={isValid ? false : true}
            >
              Kinnita
            </button>
          </form>
        </div>
      )}
    </Formik>
  );
};

import React from "react";
import "../Style.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import userParamCalc from "./userParamCalc";
import { RouteComponentProps } from "react-router";
import useLocalState from "./useLocalState";

interface Props extends RouteComponentProps {}

const UserForm: React.FC<Props> = ({ history }) => {
	const [localStorageParams, setLocalStorageParams] = useLocalState("userParams", {});
	const validationSchema = Yup.object({
		weight: Yup.number()
			.max(320, "Sisesta oma kaal kilogrammides")
			.required("See väli on kohustuslik"),
		height: Yup.number()
			.max(235, "Sisesta oma pikkus sentimeetrites")
			.required("See väli on kohustuslik"),
		age: Yup.number()
			.max(120, "Sisesta oma vanus aastates")
			.required("See väli on kohustuslik"),
		sex: Yup.string()
			.min(4, "See väli on kohustuslik")
			.required("See väli on kohustuslik"),
		stomachState: Yup.string()
			.min(4, "See väli on kohustuslik")
			.required("See väli on kohustuslik"),
		drinkingHabits: Yup.string()
			.min(4, "See väli on kohustuslik")
			.required("See väli on kohustuslik")
	});

	return (
		<div>
			<Formik
				initialValues={{
					weight: localStorageParams ? localStorageParams.weight : "",
					height: localStorageParams ? localStorageParams.height : "",
					age: localStorageParams ? localStorageParams.age : "",
					sex: localStorageParams ? localStorageParams.sex : "",
					stomachState: localStorageParams ? localStorageParams.stomachState : "",
					drinkingHabits: localStorageParams ? localStorageParams.drinkingHabits : ""
				}}
				onSubmit={values => {
					const params = userParamCalc(
						values.weight,
						values.height,
						values.age,
						values.sex,
						values.stomachState,
						values.drinkingHabits
					);
					setLocalStorageParams({
						weight: values.weight,
						height: values.height,
						age: values.age,
						sex: values.sex,
						stomachState: values.stomachState,
						drinkingHabits: values.drinkingHabits
					});
					history.push({
						pathname: `/drinks/${params.widmarkFactor};${params.eliminationRate};${params.absorptionRate};${params.weight}`,
						state: {
							weight: values.weight,
							height: values.height,
							age: values.age,
							stomachState: values.stomachState,
							drinkingHabits: values.drinkingHabits
						}
					});
				}}
				validationSchema={validationSchema}
			>
				{props => (
					<Form>
						<Field name="weight" placeholder="Kaal (kg)" />
						<ErrorMessage name="weight" />
						<Field name="height" placeholder="Pikkus (cm)" />
						<ErrorMessage name="height" />
						<Field name="age" placeholder="Vanus (aastat)" />
						<ErrorMessage name="age" />
						<Field name="sex" as="select">
							<option value="25">sugu</option>
							<option value="male">mees</option>
							<option value="female">naine</option>
						</Field>
						<ErrorMessage name="sex" />
						<Field name="stomachState" as="select">
							<option value="25">Kui täis oli su kõht enne esimest jooki</option>
							<option value="full">täis</option>
							<option value="mostly-full">pigem täis</option>
							<option value="average">keskmiselt</option>
							<option value="mostly-empty">pigem tühi</option>
							<option value="empty">tühi</option>
						</Field>
						<ErrorMessage name="stomachState" />
						<Field name="drinkingHabits" as="select">
							<option value="25">Kui tihti tarbid tavaliselt alkoholi?</option>
							<option value="everyday">Iga päev</option>
							<option value="often">Mitu korda nädalas</option>
							<option value="sometimes">Korra nädalas</option>
							<option value="rarely">Vähem kui korra nädalas</option>
						</Field>
						<ErrorMessage name="drinkingHabits" />
						<button type="submit">Kinnita</button>
						<pre>{JSON.stringify(props.values, null, 2)}</pre>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default UserForm;

import React from "react";
import "../Style.css";
import { Formik } from "formik";
import * as Yup from "yup";
import userParamCalc from "./userParamCalc";
import { RouteComponentProps } from "react-router";
import useLocalState from "./useLocalState";
import { Form, Input, Button, FlexRow, Radio, Label } from "../formStyledComponents.js";

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
				{({ touched, errors, values, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
					<Form>
						<FlexRow>
							<Radio
								type="radio"
								name="sex"
								value="male"
								id="male"
								checked={values.sex === "male"}
								onChange={() => setFieldValue("sex", "male")}
							/>
							<Label
								for="male"
								borderStyle={values.sex === "male" ? "1px solid #DC3806" : "1px solid #B1B4B6"}
							>
								Male
							</Label>
							<Radio
								type="radio"
								name="sex"
								value="female"
								id="female"
								checked={values.sex === "female"}
								onChange={() => setFieldValue("sex", "female")}
							/>
							<Label
								for="female"
								borderStyle={values.sex === "female" ? "1px solid #DC3806" : "1px solid #B1B4B6"}
							>
								Female
							</Label>
						</FlexRow>
						<Input
							name="weight"
							placeholder="Kaal (kg)"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.weight}
							type="text"
						/>
						<Input
							name="height"
							placeholder="Pikkus (cm)"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.height}
							type="text"
						/>

						<Input
							name="age"
							placeholder="Vanus (aastat)"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.age}
							type="text"
						/>
						<Input
							name="stomachState"
							as="select"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.stomachState}
						>
							<option value="25">Kui täis oli su kõht enne esimest jooki</option>
							<option value="full">täis</option>
							<option value="mostly-full">pigem täis</option>
							<option value="average">keskmiselt</option>
							<option value="mostly-empty">pigem tühi</option>
							<option value="empty">tühi</option>
						</Input>
						<Input
							name="drinkingHabits"
							as="select"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.drinkingHabits}
						>
							<option value="25">Kui tihti tarbid tavaliselt alkoholi?</option>
							<option value="everyday">Iga päev</option>
							<option value="often">Mitu korda nädalas</option>
							<option value="sometimes">Korra nädalas</option>
							<option value="rarely">Vähem kui korra nädalas</option>
						</Input>
						<Button type="submit">Kinnita</Button>
						<pre>{JSON.stringify(values, null, 2)}</pre>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default UserForm;

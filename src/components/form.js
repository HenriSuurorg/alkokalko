import React, { useState } from "react";
import "./Style.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UserForm = () => {
	const [age, setAge] = useState();
	const [weight, setWeight] = useState();
	const [height, setHeight] = useState();
	const [sex, setSex] = useState();
	const [stomachState, setStomachState] = useState();
	const [drinkingHabits, setDrinkingHabits] = useState();

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
					weight: "",
					height: "",
					age: "",
					sex: "",
					stomachState: "",
					drinkingHabits: ""
				}}
				onSubmit={values => {
					setHeight(values.height);
					setWeight(values.weight);
					setAge(values.age);
					setStomachState(values.stomachState);
					setSex(values.sex);
					setDrinkingHabits(values.drinkingHabits);
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
							<option value="25">Kui täis on su kõht</option>
							<option value="full">täis</option>
							<option value="average">keskmiselt</option>
							<option value="empty">tühi</option>
						</Field>
						<ErrorMessage name="stomachState" />
						<Field name="drinkingHabits" as="select">
							<option value="25">Kui tihti tarbid tavaliselt alkoholi?</option>
							<option value="often">Mitu korda nädalas?</option>
							<option value="sometimes">Korra nädalas</option>
							<option value="rarely">Vähem kui korra nädalas</option>
						</Field>
						<ErrorMessage name="drinkingHabits" />
						<button type="submit">Kinnita</button>
						<pre>{JSON.stringify(props.values, null, 2)}</pre>
					</Form>
				)}
			</Formik>
			{age && <h1>{age} years old</h1>}
			{height && <h1>{height} cm</h1>}
			{weight && <h1>{weight} kg</h1>}
			{sex && <h1>Sex: {sex}</h1>}
			{stomachState && <h1>My stomach is: {stomachState}</h1>}
			{drinkingHabits && <h1>I drink: {drinkingHabits}</h1>}
		</div>
	);
};

export default UserForm;

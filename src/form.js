import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UserForm = () => {
	const [age, setAge] = useState();
	const [weight, setWeight] = useState();
	const [height, setHeight] = useState();

	const validationSchema = Yup.object({
		weight: Yup.number()
			.max(320, "Sisesta oma kaal kilogrammides")
			.required("See väli on kohustuslik"),
		height: Yup.number()
			.max(235, "Sisesta oma pikkus sentimeetrites")
			.required("See väli on kohustuslik"),
		age: Yup.number()
			.max(120, "Sisesta oma vanus aastates")
			.required("See väli on kohustuslik")
	});

	return (
		<div className="formpage-container">
			<Formik
				initialValues={{
					weight: "",
					height: "",
					eliminationRate: "",
					age: "",
					alcoholMass: "",
					timePassed: "",
					absorptionRate: ""
				}}
				onSubmit={values => {
					setAge(values.age);
					setHeight(values.height);
					setWeight(values.height);
				}}
				validationSchema={validationSchema}
			>
				{props => (
					<Form className="form-container">
						<Field name="weight" placeholder="Kaal (kg)" />
						<ErrorMessage name="weight" />
						<Field name="height" placeholder="Pikkus (cm)" />
						<ErrorMessage name="height" />
						<Field name="age" placeholder="Vanus (aastat)" />
						<ErrorMessage name="age" />
						<button type="submit">Kinnita</button>
					</Form>
				)}
			</Formik>
			{age && <h1>{age} years old</h1>}
			{height && <h1>{height} cm</h1>}
			{weight && <h1>{weight} kg</h1>}
		</div>
	);
};

export default UserForm;

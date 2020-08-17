import styled from "styled-components";

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
`;

export const Input = styled.input``;

export const Button = styled.button`
	width: 300px;
	height: 35px;
`;

export const FlexRow = styled.div`
display: flex;
flex-direction: row;
padding: ${props => props.padding}
margin: ${props => props.margin}
`;

export const Radio = styled.input`
	display: none;
`;

export const Label = styled.label`
	font-family: "B612", sans-serif;
	border: ${props => props.borderStyle || "1px solid #DC3806"};
	padding: 7px 70px;
	border-radius: 5px;
	display: flex;
	font-size: 15px;

	label:before {
			position: absolute;
		content: "";
		height: 15px;
		width: 15px;
		border: 3px solid #DC3806
		border-radius: 50%;
		margin-right: 10px;
	}
`;

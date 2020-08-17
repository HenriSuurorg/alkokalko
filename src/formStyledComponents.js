import styled from "styled-components";

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Input = styled.input`
	width: ${props => props.width};
`;

export const Button = styled.button`
	width: 300px;
	height: 35px;
`;

import { styled } from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const ContainerTop = styled.form`
	display: flex;
	background-color: #dcdcdc;
	flex-direction: column;
	justify-content: center;
	padding: 10px;
	gap: 10px;
	border-radius: 5px;
`;

const ContainerCard = styled.div`
	display: flex;
	width: 600px;
	background-color: #dcdcdc;
	flex-direction: column;
	justify-content: center;
	padding: 10px;
	gap: 10px;
	border-radius: 5px;
`;
const ContainerListItem = styled.div`
	background-color: #efefef;
	padding: 10px;
	border-radius: 5px;
	max-height: 400px;
	overflow: auto;
`;

const ContainerButton = styled.div`
	display: flex;
	justify-content: space-around;
	gap: 10px;
`;

const ContainerInput = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	gap: 10px;
`;

const ContainerError = styled.div`
	color: red;
	font-size: 13px;
	text-align: start;
`;

const Title = styled.div`
	font-weight: bold;
	font-size: 28px;
`;

export {
	Container,
	ContainerTop,
	ContainerCard,
	ContainerListItem,
	ContainerButton,
	ContainerInput,
	ContainerError,
	Title,
};
import { styled } from "styled-components";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 128px calc(100% - 128px);
    grid-template-areas:
        "header"
        "main";
    height: 100vh;
    width: 100vw;
    padding: 16px !important;
    background-color: transparent;
    overflow: hidden;
    box-sizing: border-box;
	background-color: #212B36;
`;

const Header = styled.div`
	grid-area: header;
	font-size: 2rem;
	font-weight: bold;
	text-align: center;
	color: white;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Main = styled.div`
	grid-area: main;
	display: flex;
	flex-direction: row;
	gap: 32px;
	align-items: start;
`;

const Card = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 16px;
	min-height: 90px;
	width: 200px;
	background-color: #dcdcdc;
	border-radius: 8px;
	position: relative;
	cursor: pointer;
	transition: all 0.3s ease;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

	&:hover {
		transform: translateY(-4px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		background-color: #e8e8e8;
	}

	a {
		text-decoration: none;
		color: #212B36;
		font-weight: 500;
		font-size: 1.1rem;
		text-align: center;
	}
`;


export {
	GridContainer,
	Header,
	Main,
	Card
}

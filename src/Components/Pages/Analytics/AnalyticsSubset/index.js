import React from "react";
import styled from "styled-components";
import Chart from "./Chart.js";
import NumericalStatistics from "./NumericalStatistics.js";
import SecondaryOptions from "./SecondaryOptions"

const Container=styled.div`
	background-color:white;
	width:100%;
	height:100%;
	padding:5%;
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;
`;

const Analytics=()=>{
	return(
		<Container>
			<NumericalStatistics/>
			<Chart/>
			<SecondaryOptions/>
		</Container>
	)
}


export default Analytics;
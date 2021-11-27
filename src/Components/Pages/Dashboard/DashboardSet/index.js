import React from "react";
import styled from "styled-components";
import Navigation from "../../../UniversalComponents/Navigation/index.js";

const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	padding:0px;
	display:flex;
	flex-direction:row;
	display:flex;
	overflow-y:auto;
	background-color:red;

	@media screen and (max-width:1370px){
		flex-direction:column;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		flex-direction:column;
    }
`;

const Dashboard=()=>{
	return(
		<Container>
			<Navigation
				pageType={"Analytics"}
			/>
		</Container>
	)
}

export default Dashboard;
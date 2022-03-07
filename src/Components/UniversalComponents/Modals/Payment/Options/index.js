import React,{useState} from "react";
import styled from "styled-components";
import Enterprise from "./Enterprise/index.js";
import Startup from "./Startup/index.js";
import Community from "./Community/index.js";
import COLOR_CONSTANTS from "../../../../../Utils/ColorConstants.js";

const Container=styled.div`
	position:fixed;
	height:80%;
	background-color:white;
	z-index:20;
	top:10%;
	width:100%;
	display:flex;
	overflow-x:auto;
	flex-direction:row;
	flex-wrap:nowrap;

	align-items:center;
	padding-right:10%;
	padding-bottom:2%;
	padding-top:2%;



	@media screen and (max-width:650px){
		top:0%;
		width:100%;
		left:0%;
		height:100%;
	}
`;

const PaymentCardContainer=styled.div`
	position:relative;
	width:30%;
	border-radius:5px;
	height:100%;
	flex-shrink:0;
	margin-rigth:5%;
	margin-left:10%;
	background-color:white;
	box-shadow:1px 1px 5px ${COLOR_CONSTANTS.GREY};

	@media screen and (max-width:1370px){
		width:70%;
	}

	@media screen and (max-width:650px){
		width:100%;
		margin-left:2%;
	}
`;


const Options=()=>{
	const paymentOptions=[
		<Enterprise/>,
		<Startup/>,
		<Community/>
	];

	const paymentOptionsRender=(component)=>{
		return(
			<PaymentCardContainer>
				{component}
			</PaymentCardContainer>
		)
	}	

	return(
		<Container>
			{paymentOptions.map(data=>
				<>{paymentOptionsRender(data)}</>
			)}
		</Container>
	)
}

export default Options;
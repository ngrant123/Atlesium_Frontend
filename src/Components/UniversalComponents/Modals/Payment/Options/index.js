import React,{useState} from "react";
import styled from "styled-components";
import Enterprise from "./Enterprise/index.js";
import Startup from "./Startup/index.js";
import Community from "./Community/index.js";
import COLOR_CONSTANTS from "../../../../../Utils/ColorConstants.js";

/*
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
*/

const Container=styled.div`
	position:relative;
	height:80%;
	background-color:white;
	z-index:20;
	width:30%;


	@media screen and (max-width:650px){
		top:0%;
		width:100%;
		left:0%;
		height:100%;
	}
`;

const PaymentCardContainer=styled.div`
	position:relative;
	border-radius:5px;
	height:100%;
	flex-shrink:0;
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

/*
	const paymentOptions=[
		<Enterprise/>,
		<Startup/>,
		<Community/>
	];

*/

const Options=()=>{

	return(
		<Enterprise/>
	)
}

export default Options;
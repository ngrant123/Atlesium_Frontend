import React,{useState,useContext} from "react";
import styled from "styled-components";
import Features from "./FeaturesBreakDown.js";
import PricingDisplay from "./PricingDisplay.js";
import FeaturesBreakDown from "./FeaturesBreakDown.js";
import {PaymentContext} from "../../PaymentContext.js";

const Container=styled.div`
	position:fixed;
	display:flex;
	flex-direction:column;
	align-items:center;
	padding-top:5%;
	padding:2%;
	width:30%;
	z-index:20;
	height:80%;
	border-radius:5px;
	overflow-y:auto;
	background-color:white;

	@media screen and (max-width:1370px){
		width:70%;
	}


	@media screen and (max-width:650px){
		width:100%;
		height:100%;
	}

	@media screen and (max-width:650px){
		#enterpriseHeader{
			width:90% !important;
		}
	}
`;

const Enterprise=()=>{
	const [displayFeaturesBreakDown,changeDisplayFeaturesBreakDown]=useState(false);
	const paymentConsumer=useContext(PaymentContext);

	const triggerDisplayFeaturesBreakDown=()=>{
		changeDisplayFeaturesBreakDown(true);
	}

	const triggerDisplayPricingDisplay=()=>{
		changeDisplayFeaturesBreakDown(false);
	}

	const closeModalIcon=()=>{
		return(
			<div style={{width:"100%",display:"flex",justifyContent:"flex-end",marginRight:"5%"}}
				onClick={()=>paymentConsumer.triggerClosePaymentModal()}>
				<svg xmlns="http://www.w3.org/2000/svg"
					style={{cursor:"pointer"}}
					class="icon icon-tabler icon-tabler-circle-x"
					 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
					 stroke-linecap="round" stroke-linejoin="round">
					  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					  <circle cx="12" cy="12" r="9" />
					  <path d="M10 10l4 4m0 -4l-4 4" />
				</svg>
			</div>
		)
	}

	return(
		<Container>
			{closeModalIcon()}
			{displayFeaturesBreakDown==false?
				<PricingDisplay
					displayFeaturesBreakDown={triggerDisplayFeaturesBreakDown}
				/>:
				<FeaturesBreakDown
					displayPricingDisplay={triggerDisplayPricingDisplay}
				/>
			}
		</Container>
	)
}

export default Enterprise;
import React,{useState} from "react";
import styled from "styled-components";
import Features from "./FeaturesBreakDown.js";
import PricingDisplay from "./PricingDisplay.js";
import FeaturesBreakDown from "./FeaturesBreakDown.js";

const Container=styled.div`
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;
	width:100%;
	height:100%;

	@media screen and (max-width:650px){
		#enterpriseHeader{
			width:90% !important;
		}
	}
`;

const Enterprise=()=>{
	const [displayFeaturesBreakDown,changeDisplayFeaturesBreakDown]=useState(false);

	const triggerDisplayFeaturesBreakDown=()=>{
		changeDisplayFeaturesBreakDown(true);
	}

	const triggerDisplayPricingDisplay=()=>{
		changeDisplayFeaturesBreakDown(false);
	}

	const closeModalIcon=()=>{
		return(
			<div style={{width:"100%",display:"flex",justifyContent:"flex-end",marginRight:"5%"}}>
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
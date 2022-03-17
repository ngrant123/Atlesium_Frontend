import React,{useContext} from "react";
import styled from "styled-components";
import COLOR_CONSTANTS from "../../../../../../Utils/ColorConstants.js";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {PaymentContext} from "../../PaymentContext.js";

const CircularIcon=styled.div`
	width:28px;
	height:28px;
	border-radius:50%;
	background-color:${COLOR_CONSTANTS.SUCCESS_ACTION_COLOR};
	transition:.8s;
	margin-bottom:20%;
	margin-right:20px;
`;


const SpecialOfferCSS={
	backgroundColor:COLOR_CONSTANTS.CALL_TO_ACTION_COLOR,
	color:"white",
	display:"flex",
	justifyContent:"center",
	alignItems:"center",
	width:"100%",
	marginLeft:"5%",
	borderRadius:"5px"
}

const HorizontalLineCSS={
	position:"relative",
	width:"80%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
}

const SubscriptionCSS={
	width:"60%",
	padding:"5%",
	borderRadius:"5px",
	color:"white",
	backgroundColor:COLOR_CONSTANTS.PRIMARY_COLOR,
	display:"flex",
	justifyContent:"center",
	alignItems:"center",
	fontSize:"18px",
	cursor:"pointer"
}
const PricingDisplay=({displayFeaturesBreakDown})=>{
	const paymentConsumer=useContext(PaymentContext);

	return(
		<React.Fragment>
				<p style={{fontSize:"24px"}}>
					<b>Enterprise</b>
				</p>
			<p style={{fontSize:"18px",width:"70%",textAlign:"center"}}>
				One time offer for early adopters
			</p>
			<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
				<p style={{marginRight:"5%"}}>
					<b>
						<span style={{color:COLOR_CONSTANTS.PRIMARY_COLOR,fontSize:"64px"}}>
							$10
						</span> 
					</b>
				</p>

				<p style={{fontSize:"36px"}}>
					<b>/month</b>
				</p>
			</div>
			<div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"60%",justifyContent:"space-between"}}
				onClick={()=>displayFeaturesBreakDown()}>
				<p style={{fontSize:"18px"}}>Features breakdown</p>
				<ArrowDropDownCircleOutlinedIcon
					style={{fontSize:"24",cursor:"pointer"}}
				/>
			</div>
			<hr style={HorizontalLineCSS}/>
			<div style={SubscriptionCSS} onClick={()=>paymentConsumer.alterScreen("Checkout")}>
				<p>
					<b>Start subscription</b>
				</p>
			</div>

			{/*
				<div style={{display:"flex",flexDirection:"row",marginTop:"10%",width:"50%",justifyContent:"space-between"}}>
					<CircularIcon/>
					<p style={{fontSize:"18px"}}> 219 spaces left </p>
				</div>
			*/}
		</React.Fragment>
	)
}

export default PricingDisplay;
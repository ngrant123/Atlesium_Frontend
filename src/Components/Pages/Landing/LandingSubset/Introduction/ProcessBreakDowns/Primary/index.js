import React from "react";
import styled from "styled-components";
import Color_Constants from "../../../../../../../Utils/ColorConstants.js";
import hands from "../../../../../../../Assets/LandingPageSpecific/breakDown_1.png";

const HeaderCSS={
	display:"flex",
	flexDirection:"column",
	width:"100%",
	display:"flex",
	textAlign:"center",
	marginBottom:"5%"
}


const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
}

const PrimaryBreakdownExplanation=()=>{
	return(
		<React.Fragment>
			<div style={HeaderCSS}>
				<p style={{fontSize:"36px"}}>
					<b>Step 1:</b>
				</p>
				<p style={{fontSize:"36px"}}>
					<b>
						Record an introduction to your 
						<span style={{color:Color_Constants.PRIMARY_COLOR}}> customers </span> 
					</b>
				</p>
			</div>
			<img src={hands} style={{width:"400px",height:"182px"}}/>
			<hr style={HorizontalLineCSS}/>
			<p style={{fontSize:"24px"}}>
				Create a video introduction on our platform of whatever you want and give 
				customers/visitors an authentic view of what you represent
			</p>
		</React.Fragment>
	)
}


export default PrimaryBreakdownExplanation;

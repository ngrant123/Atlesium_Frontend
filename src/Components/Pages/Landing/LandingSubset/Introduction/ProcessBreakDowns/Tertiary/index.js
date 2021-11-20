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

const TertiaryBreakdownExplanation=()=>{
	return(
		<React.Fragment>
			<div style={HeaderCSS}>
				<p style={{fontSize:"36px"}}>
					<b>Step 3:</b>
				</p>
				<p style={{fontSize:"36px"}}>
					<b>
						Experience a newfound  <span style={{color:Color_Constants.PRIMARY_COLOR}}> connection </span> 
						with your visitors
					</b>
				</p>
			</div>
			<img src={hands} style={{width:"400px",height:"182px"}}/>
			<hr style={HorizontalLineCSS}/>
			<p style={{fontSize:"24px"}}>
				Text simply doesn’t cut it anymore. People resonate with a face,
				so why hold your business back?
			</p>
		</React.Fragment>
	)
}


export default TertiaryBreakdownExplanation;
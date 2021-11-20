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

const SecondaryBreakdownExplanation=()=>{
	return(
		<React.Fragment>
			<div style={HeaderCSS}>
				<p style={{fontSize:"36px"}}>
					<b>Step 2:</b>
				</p>
				<p style={{fontSize:"36px"}}>
					<b>
						Attach <span style={{color:Color_Constants.PRIMARY_COLOR}}> script </span> 
						to page you want modal to show
					</b>
				</p>
			</div>
			<img src={hands} style={{width:"400px",height:"182px"}}/>
			<hr style={HorizontalLineCSS}/>
			<p style={{fontSize:"24px"}}>
				After you create your video description, we will give you a code snippet 
				that you can then attach to pages you want this video to come up. 
			</p>
		</React.Fragment>
	)
}


export default SecondaryBreakdownExplanation;



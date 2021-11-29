import React from "react";
import Color_Constants from "../../../../../../Utils/ColorConstants.js";

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

const ProcessBreakDownSkeleton=({stepNumber,headerText,image,explanationText})=>{
	return(
		<React.Fragment>
			<div style={HeaderCSS}>
				<p id="headerText" style={{fontSize:"36px"}}>
					<b>Step {stepNumber}:</b>
				</p>
				<p id="headerText" style={{fontSize:"36px"}}>{headerText}</p>
			</div>
			<div style={{width:"100%",display:"flex",justifyContent:"center"}}>
				<img id="image" src={image} style={{width:"400px",height:"182px"}}/>
			</div>
			<hr style={HorizontalLineCSS}/>
			<p id="explanationText" style={{fontSize:"24px",textAlign:"center"}}>
				{explanationText}
			</p>
		</React.Fragment>
	)
}


export default ProcessBreakDownSkeleton;
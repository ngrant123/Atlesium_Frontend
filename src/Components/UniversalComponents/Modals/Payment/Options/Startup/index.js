import React from "react";
import styled from "styled-components";
import COLOR_CONSTANTS from "../../../../../../Utils/ColorConstants.js";

const Container=styled.div`
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;
	width:100%;
	height:100%;
`;

const ComingSoonCSS={
	width:"60%",
	padding:"5%",
	borderRadius:"5px",
	color:"white",
	backgroundColor:COLOR_CONSTANTS.GREY_SECONDARY,
	display:"flex",
	justifyContent:"center",
	alignItems:"center",
	fontSize:"18px"
}

const Startup=()=>{
	return(
		<Container>
			<p style={{fontSize:"24px"}}>
				<b>Startup</b>
			</p>
			<p style={{width:"70%",textAlign:"center"}}>
				Tailored for people who have a single page website/startup up and running.
			</p>
			<div style={ComingSoonCSS}>
				<p>
					<b>Coming Soon</b>
				</p>
			</div>
		</Container>
	)
}

export default Startup;

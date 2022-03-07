import React from "react";
import styled from "styled-components";
import LiveTvIcon from '@material-ui/icons/LiveTv';
import TimelineIcon from '@material-ui/icons/Timeline';
import SettingsRemoteIcon from '@material-ui/icons/SettingsRemote';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import COLOR_CONSTANTS from "../../../../../../Utils/ColorConstants.js";

const SubscriptionCSS={
	width:"90%",
	padding:"2%",
	borderRadius:"5px",
	color:"white",
	backgroundColor:COLOR_CONSTANTS.PRIMARY_COLOR,
	display:"flex",
	justifyContent:"center",
	alignItems:"center",
	fontSize:"18px",
	cursor:"pointer"
}

const FeaturesOptionsCSS={
	display:"flex",
	flexDirection:"row",
	width:"70%",
	marginBottom:"5%"
}
const Features=({displayPricingDisplay})=>{
	return(
		<React.Fragment>
			<div style={{display:"flex",flexDirection:"row",width:"70%",marginBottom:"5%"}}>
				<ArrowBackIosIcon
					onClick={()=>displayPricingDisplay()}
					style={{fontSize:"16px",marginTop:"2%",cursor:"pointer"}}
				/>
				<p style={{fontSize:"16px"}}> Special Offer</p>
			</div>

			<div style={FeaturesOptionsCSS}>
				<LiveTvIcon style={{marginRight:"10%",fontSize:"36"}}/>
				<p style={{fontSize:"16px"}}>Four reticans immediately unlocked forever</p>
			</div>

			<div style={FeaturesOptionsCSS}>
				<TimelineIcon style={{marginRight:"10%",fontSize:"36"}}/>
				<p style={{fontSize:"16px"}}>
					Analytics available for each of these reticans so you can make data-driven decisions
				</p>
			</div>

			<div style={FeaturesOptionsCSS}>
				<SettingsRemoteIcon style={{marginRight:"10%",fontSize:"36"}}/>
				<p style={{fontSize:"16px"}}>
					Customer created video and text based interactions unlocked 
				</p>
			</div>


			<div style={FeaturesOptionsCSS}>
				<ContactPhoneIcon style={{marginRight:"10%",fontSize:"36"}}/>
				<p style={{fontSize:"16px"}}>24/7 customer support</p>
			</div>

			<div style={SubscriptionCSS}>
				<p>
					<b>Start subscription</b>
				</p>
			</div>
		</React.Fragment>
	)
}

export default Features;
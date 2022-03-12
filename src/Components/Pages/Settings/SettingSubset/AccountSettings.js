import React from "react";
import styled from "styled-components";
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import Color_Constants from "../../../../Utils/ColorConstants.js";

const Container=styled.div`
	@media screen and (max-width:650px){
		#morePaymentPlanDescription{
			width:100% !important;
		}
	}
`;

const MorePaymentPlanCSS={
	backgroundColor:Color_Constants.CALL_TO_ACTION_COLOR,
	borderRadius:"5px",
	padding:"2%",
	width:"40%",
	color:"white"
}
const AccountSettings=()=>{
	return(
		<Container>
			<div style={{display:"flex",flexDirection:"row",marginBottom:"5%",marginTop:"5%"}}>	
				<AccountBalanceOutlinedIcon
					style={{fontSize:"36",color:Color_Constants.PRIMARY_COLOR}}
				/>
				<p id="settingHeaderText" style={{fontSize:"24px",marginLeft:"2%"}}>
					<b>Account Settings</b>
				</p>
			</div>

			<div style={{display:"flex",flexDirection:"row"}}>
				<input type="checkbox" disabled="disabled"/>
				<p style={{marginLeft:"2%",color:Color_Constants.PRIMARY_COLOR}}>Update Plan</p>
			</div>
			<div id="morePaymentPlanDescription" style={MorePaymentPlanCSS}>
				<p>More payment plan options coming soon</p>
			</div>
		</Container>
	)
}

export default AccountSettings;
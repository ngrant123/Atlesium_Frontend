import React from "react";
import styled from "styled-components";
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import Color_Constants from "../../../../Utils/ColorConstants.js";

const AccountSettings=()=>{
	return(
		<React.Fragment>
			<div style={{display:"flex",flexDirection:"row",marginBottom:"5%",marginTop:"5%"}}>	
				<AccountBalanceOutlinedIcon
					style={{fontSize:"36",color:Color_Constants.PRIMARY_COLOR}}
				/>
				<p style={{fontSize:"24px",marginLeft:"2%"}}>
					<b>Account Settings</b>
				</p>
			</div>

			<div style={{display:"flex",flexDirection:"row"}}>
				<input type="checkbox"/>
				<p style={{marginLeft:"2%",color:Color_Constants.PRIMARY_COLOR}}>Update Plan</p>
			</div>
		</React.Fragment>
	)
}

export default AccountSettings;
import React,{useState} from "react";
import styled from "styled-components";
import PersonalInformation from "./PersonalInformation.js";
import AccountSettings from "./AccountSettings.js";
import PasswordReset from "./PassWordReset.js";

const Container=styled.div`
	background-color:white;
	width:100%;
	height:100%;
	padding:5%;

	#settingHeaderText{
		font-size:18px !important;
	}
`;
const Settings=()=>{
	const [displayPasswordReset,changeDisplayPasswordReset]=useState(false);
	return(
		<Container>
			{displayPasswordReset==true?
				<PasswordReset/>:
				<React.Fragment>
					<PersonalInformation/>
					<hr/>
					<AccountSettings/>
				</React.Fragment>
			}
		</Container>
	)
}

export default Settings;
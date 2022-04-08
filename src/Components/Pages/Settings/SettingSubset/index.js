import React from "react";
import styled from "styled-components";
import PersonalInformation from "./PersonalInformation.js";
import AccountSettings from "./AccountSettings.js";

const Container=styled.div`
	position:relative;
	background-color:white;
	width:100%;
	height:100%;
	padding:5%;

	#settingHeaderText{
		font-size:18px !important;
	}
`;
const Settings=({parentContainerId,history})=>{
	const props={
		parentContainerId,
		history
	}
	return(
		<Container>
			<PersonalInformation
				{...props}
			/>
			<hr/>
			<AccountSettings
				{...props}
			/>
		</Container>
	)
}

export default Settings;
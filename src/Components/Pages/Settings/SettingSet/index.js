import React from "react";
import styled from "styled-components";
import Navigation from "../../../UniversalComponents/Navigation/index.js";
import SettingsOptions from "../SettingSubset/index.js";

const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	padding:0px;
	display:flex;
	flex-direction:row;
	display:flex;
	flex-direction:row;
	overflow-y:auto;

	@media screen and (max-width:1370px){
		flex-direction:column;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		flex-direction:column;
    }
`;


const Settings=(props)=>{
	return(
		<Container id="settings">
			<Navigation
				pageType={"Settings"}
			/>
			<SettingsOptions/>
		</Container>
	)
}


export default Settings;
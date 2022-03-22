import React,{useEffect} from "react";
import styled from "styled-components";
import Navigation from "../../../UniversalComponents/Navigation/PageNavigation/index.js";
import SettingsOptions from "../SettingSubset/index.js";
import {useSelector} from "react-redux";

const Container=styled.div`
	position:absolute;
	width:100%;
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
	const profileId=useSelector(state=>state.personalInformation._id);

	useEffect(()=>{
		if(profileId=="" || profileId==null){
			props.history.push('/');
		}
	},[])

	return(
		<Container id="settings">
			<Navigation
				pageType={"Settings"}
				parentDiv={"settings"}
			/>
			<SettingsOptions
				parentContainerId={"settings"}
				history={props.history}
			/>
		</Container>
	)
}


export default Settings;
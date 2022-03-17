import React,{useEffect,useState,useMemo} from "react";
import styled from "styled-components";
import Navigation from "../../../../UniversalComponents/Navigation/PageNavigation/index.js";
import ReticanOverviews from "../AnalyticsSubset/ReticanOverviews/index.js";
import Reticans from "../AnalyticsSubset/Reticans/index.js";
import {AnaylticsProvider} from "./AnalyticsContext.js";
import AlertSystem from "../../../../UniversalComponents/Skeletons/Alerts.js";
import {useSelector} from "react-redux";

const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	padding:0px;
	display:flex;
	flex-direction:row;


	@media screen and (max-width:1370px){
		flex-direction:column;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		flex-direction:column;
    }
`;


const Analytics=(props)=>{
	const [currentAnalyticsScreenType,changeCurrentAnalyticsScreenType]=useState("Overviews");
	const [alertMessage,changeAlertMessage]=useState();
	const [displayAlertMessage,changeDisplayAlertMessage]=useState(false);
	const [targetReticanId,changeTargetReticanId]=useState();
	const profileId=useSelector(state=>state.personalInformation._id);

	useEffect(()=>{
		debugger;
		if(profileId=="" || profileId==null){
			props.history.push('/');
		}else{
			if(props.location.state!=null){
				changeTargetReticanId(props.location.state.reticanOverviewId);
				changeCurrentAnalyticsScreenType("Reticans");
			}
		}
	},[]);

	const ComponentDecider=({screenType,children})=>{
		return children.filter(child=>child.props.componentName==screenType)
	}

	const closeAlertScreen=()=>{
		changeDisplayAlertMessage(false);
	}

	const alertModal=()=>{
		return(
			<React.Fragment>
				{displayAlertMessage==true &&(
					<AlertSystem
						closeModal={closeAlertScreen}
						targetDomId={"analyticsContainer"}
						alertMessage={alertMessage}
					/>
				)}
			</React.Fragment>
		)
	}

	const ComponentMemoizedDisplay=useMemo(()=>{
		return(
			<ComponentDecider screenType={currentAnalyticsScreenType}>
				<ReticanOverviews 
					componentName={"Overviews"}
				/>
				<Reticans 
					componentName={"Reticans"}
					reticanOverviewId={targetReticanId}
				/>
			</ComponentDecider>
		)
	},[currentAnalyticsScreenType])


	return(
		<AnaylticsProvider
			value={{
				triggerDisplayScreen:(requestedScreenType,targetReticanId)=>{
					changeTargetReticanId(targetReticanId);
					changeCurrentAnalyticsScreenType(requestedScreenType);
				},
				triggerDisplayAlertMessage:(alertMessage)=>{
					changeAlertMessage(alertMessage);
					changeDisplayAlertMessage(true);
				}	
			}}
		>
			<Container id="analyticsContainer">
				{alertModal()}
				<Navigation
					pageType={"Analytics"}
					parentDiv={"analyticsContainer"}
				/>
				{ComponentMemoizedDisplay}
			</Container>
		</AnaylticsProvider>
	)
}


export default Analytics;
import React,{useState} from "react";
import styled from "styled-components";
import Navigation from "../../../../UniversalComponents/Navigation/PageNavigation/index.js";
import AlertSystem from "../../../../UniversalComponents/Skeletons/Alerts.js";

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



const SpecifiedAnalytics=()=>{
	const [alertMessage,changeAlertMessage]=useState();
	const [displayAlertMessage,changeDisplayAlertMessage]=useState(false);
	
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


	return(
		<Container id="analyticsContainer">
			{alertModal()}
			<Navigation
				pageType={"Analytics"}
			/>
			{/*
				<AnalyticsStats 
					componentName={"Analytics"}
				/>
			*/}
			<p>Specided analytics</p>
		</Container>
	)
}


export default SpecifiedAnalytics;
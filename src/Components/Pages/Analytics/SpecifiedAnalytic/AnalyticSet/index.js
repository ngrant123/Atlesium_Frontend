import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Navigation from "../../../../UniversalComponents/Navigation/PageNavigation/index.js";
import AlertSystem from "../../../../UniversalComponents/Skeletons/Alerts.js";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Chart from "../AnalyticSubset/Chart.js";
import NumericalStatistics from "../AnalyticSubset/NumericalStatistics.js";
import SecondaryOptions from "../../SecondaryOptions.js";
import {
	retrieveTimeSpecifiedAnalytics,
	retrieveSpecifiedAnaltyicsPage
} from "../../../../../Actions/Requests/AnalyticsRequests/Retrieval/SpecifiedOptionsAnalyticsRetrieval.js";
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


const Analytics=styled.div`
	position:relative;
	width:100%;
	height:100%;
	padding-left:5%;
	padding-right:5%;
	display:flex;
	flex-direction:column;
	padding-bottom:10px;
	overflow-y:auto;
	justify-content:center;
`;




const SpecifiedAnalytics=(props)=>{
	const [alertMessage,changeAlertMessage]=useState();
	const [displayAlertMessage,changeDisplayAlertMessage]=useState(false);
	const [timeRequestedType,changeTimeRequestedType]=useState("day");
	const [dataXAxisLabels,changeDataXAxisLabels]=useState();
	const [visitorsDataset,changeVisitorDataset]=useState();
	const [completionDataset,changeCompletionDataset]=useState();
	const [isLoading,changeIsLoading]=useState(true);
	const [chartProgressRateInformation,changeChartProgressRateInformation]=useState();

	const userId=useSelector(state=>state.personalInformation._id);

	useEffect(()=>{
		const fetchSpecifiedAnalyticsPage=async()=>{
			const {confirmation,data}=await retrieveSpecifiedAnaltyicsPage(
				props.match.params.id,
				userId);

			if(confirmation=="Success"){
				const {
					message:{
						chartData:{
							visitorReticanAnalytics,
		                    completionReticanAnalytics,
		                    xAxisLabels	
						},
						progressRate
					}
				}=data;

				changeChartProgressRateInformation(progressRate);
				changeVisitorDataset(visitorReticanAnalytics);
				changeCompletionDataset(completionReticanAnalytics);
				changeDataXAxisLabels(xAxisLabels);
			}else{
				const {statusCode}=data;
				let alertMessage;

				if(statusCode==400){
					alertMessage={
						header:"Analytics Page Retrieval Error",
						description:"Unfortunately there has been an error when retrieving your analytics. Please try again"
					}
				}else{
					alertMessage={
						header:"Internal Server Error",
						description:"Unfortunately there has been an error on our part. Please try again later"
					}
				}
				changeAlertMessage(alertMessage);
				changeDisplayAlertMessage(true);
			}
			changeIsLoading(false);
		}

		fetchSpecifiedAnalyticsPage();
	},[]);

	const fetchAnalytics=async()=>{
		debugger;
		const {confirmation,data}=await retrieveTimeSpecifiedAnalytics(
			props.match.params.id,
			timeRequestedType);

		if(confirmation=="Success"){
			debugger;
			const {
				message:{
					visitorReticanAnalytics,
                    completionReticanAnalytics,
                    xAxisLabels
				}
			}=data;

			changeVisitorDataset(visitorReticanAnalytics);
			changeCompletionDataset(completionReticanAnalytics);
			changeDataXAxisLabels(xAxisLabels);

		}else{
			const {statusCode}=data;
			let alertMessage;

			if(statusCode==400){
				alertMessage={
					header:"Analytics Retrieval Error",
					description:"Unfortunately there has been an error when retrieving your analytics. Please try again"
				}
			}else{
				alertMessage={
					header:"Internal Server Error",
					description:"Unfortunately there has been an error on our part. Please try again later"
				}
			}
			changeAlertMessage(alertMessage);
			changeDisplayAlertMessage(true);
		}
		changeIsLoading(false);
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
						targetDomId={"specifiedAnalyticsContainer"}
						alertMessage={alertMessage}
					/>
				)}
			</React.Fragment>
		)
	}


	return(
		<Container id="specifiedAnalyticsContainer">
			{alertModal()}
			<Navigation
				pageType={"Analytics"}
				parentDiv={"specifiedAnalyticsContainer"}
			/>
			<Analytics>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center",cursor:"pointer",marginBottom:"5%"}}>
					<ArrowBackIosIcon
						style={{fontSize:"16",marginTop:"-10px"}}
					/>
					<p style={{fontSize:"16px"}}>Reticans</p>
				</div>

				<div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
					{isLoading==true?
						<p>Loading...</p>:
						<React.Fragment>
							<NumericalStatistics
								progressRates={chartProgressRateInformation}
							/>
							<Chart
								visitorsDataset={visitorsDataset}
							    completionDataset={completionDataset}
							    xAxisLabels={dataXAxisLabels}
							    timeRequestedType={timeRequestedType}
							/>
						</React.Fragment>
					}
					<div style={{width:"100%",marginTop:"2%"}}>
						<SecondaryOptions
							headerText={"Sort-By"}
							options={[
								{option:"Date"},
								{option:"Popularity"}
							]} 
						/>
					</div>
				</div>
			</Analytics>
		</Container>
	)
}


export default SpecifiedAnalytics;
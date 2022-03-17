import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Navigation from "../../../../UniversalComponents/Navigation/PageNavigation/index.js";
import AlertSystem from "../../../../UniversalComponents/Skeletons/Alerts.js";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Chart from "../AnalyticSubset/Chart.js";
import NumericalStatistics from "../AnalyticSubset/NumericalStatistics.js";
import {
	retrieveTimeSpecifiedAnalytics,
	retrieveSpecifiedAnaltyicsPage
} from "../../../../../Actions/Requests/AnalyticsRequests/Retrieval/SpecifiedOptionsAnalyticsRetrieval.js";
import {useSelector,useDispatch} from "react-redux";
import {tokensRegeneration} from "../../../../../Actions/Tasks/UpdateTokens.js";
import {Link} from "react-router-dom";

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
	margin-top:5%;
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
	const [isAnalyticsReticanOverview,changeIsAnalyticsReticanOverview]=useState(false);

	const {
		_id,
		accessToken,
		refreshToken
	}=useSelector(state=>state.personalInformation);
	const dispatch=useDispatch();

	useEffect(()=>{
		debugger;
		if(_id=="" || _id==null){
			props.history.push('/');
		}
		console.log(props);
	},[])

	useEffect(()=>{
		const fetchSpecifiedAnalyticsPage=async({updatedAccessToken})=>{
			debugger;
			const {confirmation,data}=await retrieveSpecifiedAnaltyicsPage(
				props.match.params.id,
				_id,
				updatedAccessToken==null?accessToken:updatedAccessToken);

			if(confirmation=="Success"){
				const {
					message:{
						chartData:{
							visitorReticanAnalytics,
		                    completionReticanAnalytics,
		                    xAxisLabels	
						},
						progressRate,
						isIdReticanOverview
					}
				}=data;

				changeIsAnalyticsReticanOverview(isIdReticanOverview);
				changeChartProgressRateInformation(progressRate);
				changeVisitorDataset(visitorReticanAnalytics);
				changeCompletionDataset(completionReticanAnalytics);
				changeDataXAxisLabels(xAxisLabels);
			}else{
				errorMessage(data,fetchSpecifiedAnalyticsPage,null);
			}
			changeIsLoading(false);
		}

		fetchSpecifiedAnalyticsPage({});
	},[]);

	const errorMessage=(data,parentApiTrigger,params)=>{
		const {statusCode}=data;
		let alertMessage;

		if(statusCode==401){
			tokensRegeneration({
				currentRefreshToken:refreshToken,
				userId:_id,
				parentApiTrigger,
				dispatch,
				parameters:params==null?{}:{requestedAnaltyicsType:params}
			})
		}else{
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

	}

	const fetchAnalytics=async({requestedAnaltyicsType,updatedAccessToken})=>{
		debugger;
		const {confirmation,data}=await retrieveTimeSpecifiedAnalytics(
			props.match.params.id,
			requestedAnaltyicsType,
			isAnalyticsReticanOverview,
			updatedAccessToken==null?accessToken:updatedAccessToken,
			_id);

		if(confirmation=="Success"){
			debugger;
			const {
				message:{
					visitorReticanAnalytics,
                    completionReticanAnalytics,
                    xAxisLabels
				}
			}=data;
			changeVisitorDataset([...visitorReticanAnalytics]);
			changeCompletionDataset([...completionReticanAnalytics]);
			changeDataXAxisLabels([...xAxisLabels]);
			changeTimeRequestedType(requestedAnaltyicsType);

		}else{
			errorMessage(data,fetchAnalytics,requestedAnaltyicsType);
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
				<div style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:"5%"}}>
					<div style={{display:"flex",flexDirection:"row",alignItems:"center",cursor:"pointer"}}>
						<Link to={{pathname:'/analytics',
							state:{reticanOverviewId:props.location.state.reticanOverviewId}}}
						>
							<ArrowBackIosIcon
								style={{fontSize:"16",marginTop:"-10px"}}
							/>
						</Link>
						<p style={{fontSize:"16px"}}>Reticans</p>
					</div>
				</div>

				<div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
					{isLoading==true?
						<p>Loading...</p>:
						<React.Fragment>
							<NumericalStatistics
								progressRates={chartProgressRateInformation}
								fetchAnalytics={fetchAnalytics}
							/>
							<Chart
								visitorsDataset={visitorsDataset}
							    completionDataset={completionDataset}
							    xAxisLabels={dataXAxisLabels}
							    timeRequestedType={timeRequestedType}
							/>
						</React.Fragment>
					}
				</div>
			</Analytics>
		</Container>
	)
}


export default SpecifiedAnalytics;
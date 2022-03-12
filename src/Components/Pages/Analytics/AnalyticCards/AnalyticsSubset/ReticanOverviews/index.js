import React,{useState,useEffect,useContext} from "react";
import styled from "styled-components";
import SecondaryOptions from "../../../SecondaryOptions.js";
import ReticanOverview from "./Overviews.js";
import {
	retrieveReticanOverviewCards
} from "../../../../../../Actions/Requests/AnalyticsRequests/Retrieval/AnalyticsRetrieval.js";
import {useSelector,useDispatch} from "react-redux";
import {AnalyticsContext} from "../../AnalyticsSet/AnalyticsContext.js";
import {tokensRegeneration} from "../../../../../../Actions/Tasks/UpdateTokens.js";


const Container=styled.div`
	position:relative;
	width:100%;
	height:100%;
	padding-left:5%;
	padding-right:5%;
	padding-bottom:10px;
	overflow-y:auto;
`;


const ReticanOverviewContainer=styled.div`
	display:flex;
	flex-direction:column;
	position:relative;
	width:100%;
	margin-top:10px;
`;

const ReticanOverviewAnalysis=()=>{
	const [selectedReticanStatus,changeSelectedReticanStatus]=useState("Active");
	const [reticanOverviews,changeReticanOverviews]=useState([]);
	const {
		_id,
		accessToken,
		refreshToken
	}=useSelector(state=>state.personalInformation);
	const dispatch=useDispatch();

	const [loading,changeLoadingIndicator]=useState(true);
	const analyticsConsumer=useContext(AnalyticsContext);

	useEffect(()=>{
		const fetchData=async({updatedAccessToken})=>{
			const {confirmation,data}=await retrieveReticanOverviewCards(
												_id,
												selectedReticanStatus,
												updatedAccessToken==null?accessToken:updatedAccessToken);
			if(confirmation=="Success"){
				const {message}=data;
				changeReticanOverviews(message);
			}else{
				const {statusCode}=data;
				let alertMessage;

				if(statusCode==401){
					tokensRegeneration({
						currentRefreshToken:refreshToken,
						userId:_id,
						parentApiTrigger:fetchData,
						dispatch,
						parameters:{}
					})
				}else{					
					if(statusCode==400){
						alertMessage={
							header:"Retican Overview Retrieval Error",
							description:"Unfortunately there has been an error when retrieving your retican overviews. Please try again"
						}
					}else{
						alertMessage={
							header:"Internal Server Error",
							description:"Unfortunately there has been an error on our part. Please try again later"
						}
					}
					analyticsConsumer.triggerDisplayAlertMessage(alertMessage);
				}

			}
			changeLoadingIndicator(false);
		}
		fetchData({});
	},[]);



	const reorderByMostRecent=()=>{
		reticanOverviews.sort(function(a, b){return a.dateCreated - b.dateCreated});
		changeReticanOverviews([...reticanOverviews]);
	}

	const reorderByOldest=()=>{
		reticanOverviews.sort(function(a, b){return b.dateCreated - a.dateCreated});
		changeReticanOverviews([...reticanOverviews]);
	}


	const reorderByPopularity=()=>{

	}
	return(
		<Container>
			<div style={{marginTop:"5%",display:"flex",flexDirection:"row"}}>
				<SecondaryOptions
					headerText={"Sort-By"}
					options={[
						{
							option:"Recent",
							methodRetrieval:reorderByMostRecent
						},
						{
							option:"Oldest",
							methodRetrieval:reorderByOldest
						}
					]}
				/>
				{/*
					{
						option:"Popularity",
						methodRetrieval:reorderByPopularity
					}

					Not yet next feature addition

					<div style={{marginLeft:"2%"}}>
						<SecondaryOptions
							headerText={"Retican Status"}
							options={[
								{option:"Active"},
								{option:"Inactive"}
							]}
						/>
					</div>
				*/}
			</div>
			<hr/>
			<ReticanOverviewContainer>
				{loading==true?
					<p>Loading...</p>:
					<React.Fragment>
						{reticanOverviews.length==0?
							<p>No retican overviews</p>:
							<React.Fragment>
								{reticanOverviews.map(data=>
									<ReticanOverview
										overviewData={data}
										selectedReticanStatus={selectedReticanStatus}
									/>
								)}
							</React.Fragment>
						}
					</React.Fragment>
				}
			</ReticanOverviewContainer>
		</Container>
	)
}


export default ReticanOverviewAnalysis;
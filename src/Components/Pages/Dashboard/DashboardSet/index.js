import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Navigation from "../../../UniversalComponents/Navigation/PageNavigation/index.js";
import Campaign from "../DashboardSubset/Campaigns/index.js";
import CampaignNavigation from "../../../UniversalComponents/Navigation/CardNavigationCircle/index.js";
import {CampaignProvider} from "./CampaignContext.js";
import {
	retrieveProfileSpecificReticanOverviews,
	retrieveRetican
} from "../../../../Actions/Requests/ReticanRequests/Retrieval/ReticanRetrieval.js";
import AlertSystem from "../../../UniversalComponents/Skeletons/Alerts.js";
import LoadingAnimation from "../../../UniversalComponents/Loading/index.js";
import {useSelector} from "react-redux";


const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	padding:0px;
	display:flex;
	flex-direction:row;
	display:flex;
	overflow-y:auto;

	@media screen and (max-width:1370px){
		flex-direction:column;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		flex-direction:column;
    }
`;

const CampaignContainer=styled.div`
	position:relative;
	height:100%;
	width:100%;
	display:flex;
	flex-direction:row
`;

const campaigns=[
	{
		title:"test",
		description:"Testing out the card features yessir 1"
	},
	{
		title:"test2",
		description:"Testing out the card features yessir 2"
	},
	{
		title:"test3",
		description:"Testing out the card features yessir 3"
	}
]

const Dashboard=()=>{
	const [currentSelectedIndex,changeCurrentSelectedIndex]=useState(0);
	const [campaigns,changeCampaigns]=useState([]);
	const [stackCampaignsView,changeStackCampaignView]=useState(campaigns);
	const [previousIndex,changePreviousIndex]=useState();
	const [displayReticanOverviewAlertMessage,changeDisplayReticanOverviewAlertMessage]=useState(false);
	const [errorMessage,changeErrorMessage]=useState();
	const [reticanStatus,changeReticanStatus]=useState("Active");
	const [displayLoadingAnimation,changeDisplayLoadingAniamtion]=useState(true);
	const userId=useSelector(state=>state.personalInformation._id);
	const [indexesPreviouslyVisited,changeIndexesPreviouslyVisited]=useState({});

	useEffect(()=>{
		fetchData();
	},[]);

	const fetchReticanUrlData=async(reticanId)=>{
		debugger;
		let tempIndexesVisited=indexesPreviouslyVisited;
		console.log(Object.keys(tempIndexesVisited).length);
		console.log(tempIndexesVisited[currentSelectedIndex]);

		if(Object.keys(tempIndexesVisited).length>0 && tempIndexesVisited[currentSelectedIndex]==null){
			const {confirmation,data}=await retrieveRetican(reticanId,userId);
			if(confirmation=="Success"){
				const {message}=data;
				tempIndexesVisited[currentSelectedIndex]=true;
				changeIndexesPreviouslyVisited({...tempIndexesVisited});
				return message;
			}else{
				const {statusCode}=data;
				let errorAlertMessage;
				if(statusCode==500){
					errorAlertMessage={
						header:"Internal Server Error",
						description:"Unfortunately there has been an error on our part. Please try again later"
					}
				}else{
					errorAlertMessage={
						header:"Retican Retrieval Error",
						description:"Unfortunately, an error has occured when retrieving this retican. Please try again."
					}
				}
				changeErrorMessage(errorAlertMessage);
				changeDisplayReticanOverviewAlertMessage(true);
			}
		}

		tempIndexesVisited[currentSelectedIndex]=true;
		changeIndexesPreviouslyVisited({...tempIndexesVisited});
		return;
	}


	useEffect(()=>{
		debugger;
		if(campaigns.length>1){
			const tempStackCampaignHolders=[];
			fetchReticanUrlData(campaigns[currentSelectedIndex].primaryReticanCard.toString()).then(result=>{
				debugger;
				if(result!=null){
					campaigns[currentSelectedIndex]={
						...campaigns[currentSelectedIndex],
						primaryReticanCard:{...result}
					}
				}
				if(currentSelectedIndex==campaigns.length-1){
					tempStackCampaignHolders.push(campaigns[currentSelectedIndex]);
					tempStackCampaignHolders.push(campaigns[0]);
				}else{
					const selectedIndex=currentSelectedIndex;
					tempStackCampaignHolders.push(campaigns[selectedIndex]);
					tempStackCampaignHolders.push(campaigns[selectedIndex+1]);
				}
				if(previousIndex!=null){
					tempStackCampaignHolders.splice(0,0,{
						...campaigns[previousIndex],
						animationIndicator:true
					});
				}
				changeStackCampaignView([...tempStackCampaignHolders]);
			});
		}else{
			changeStackCampaignView(campaigns);
		}
	},[currentSelectedIndex,campaigns]);

	const fetchData=async()=>{
		const {confirmation,data}=await retrieveProfileSpecificReticanOverviews(
			userId,
			reticanStatus
		);
		debugger;
		if(confirmation=="Success"){
			const {message}=data;
			changeCampaigns(message);
		}else{	
			const {statusCode}=data;
			let errorAlertMessage;
			if(statusCode==500){
				errorAlertMessage={
					header:"Internal Server Error",
					description:"Unfortunately there has been an error on our part. Please try again later"
				}
			}else{
				errorAlertMessage={
					header:"Retican Overview Retrieval Error",
					description:"Unfortunately, an error has occured when retrieving your retican overviews. Please try again."
				}
			}
			changeErrorMessage(errorAlertMessage);
			changeDisplayReticanOverviewAlertMessage(true);
		}
		changeDisplayLoadingAniamtion(false);
	}

	const updateSelectedIndex=(selectedIndex)=>{
		console.log(selectedIndex);
		changePreviousIndex(currentSelectedIndex);
		changeCurrentSelectedIndex(selectedIndex);
	}

	const deleteCampaign=(index)=>{
		const currentStackIndex=currentSelectedIndex;
		if(currentStackIndex!=0){
			currentStackIndex--;
		}
		changeCurrentSelectedIndex(currentStackIndex);
		const parentCampaigns=campaigns;
		parentCampaigns.splice(index,1);
		changeCampaigns(parentCampaigns);
		removeCampaignFromStack(index);
	}

	const removeCampaignFromStack=(index)=>{
		debugger;
		const tempCampaigns=stackCampaignsView;
		tempCampaigns.splice(index,1);
		changeStackCampaignView([...tempCampaigns]);
	}

	const closeErrorAlertScreen=()=>{
		changeDisplayReticanOverviewAlertMessage(false);
	}

	const reticanRetrievalOverviewErrorModal=()=>{
		return(
			<React.Fragment>
				{displayReticanOverviewAlertMessage==true &&(
			        <AlertSystem
						closeModal={closeErrorAlertScreen}
						targetDomId={"dashboard"}
						alertMessage={errorMessage}
			        />
				)}
			</React.Fragment>
		)
	}

	return(
		<CampaignProvider
			value={{
				campaigns:stackCampaignsView,
				currentSelectedIndex,
				removeTargetedIndexCampaign:(index)=>{
					removeCampaignFromStack(index);
				},
				deleteCampaign:(index)=>{
					deleteCampaign(index);
				}
			}}
		>
			<Container id="dashboard">
				<Navigation
					pageType={"Dashboard"}
					parentDiv={"dashboard"}
				/>
				<CampaignContainer>
					{reticanRetrievalOverviewErrorModal()}
					{displayLoadingAnimation==true ?
						<div style={{width:"100%"}}>
							<LoadingAnimation
								loadingText={"Retrieveing retican overviews..."}
							/>
						</div>:
						<React.Fragment>
							<Campaign/>
							<div style={{height:"100%",width:"20%",borderLeft:"1px solid #ECECEC"}}>
								<CampaignNavigation 
									totalCards={campaigns}
									currentSelectedIndex={currentSelectedIndex}
									specifiedFlexDirection={"column"}
									triggerUpdatedSelectedIndex={updateSelectedIndex}
								/>
							</div>
						</React.Fragment>
					}

				</CampaignContainer>
			</Container>
		</CampaignProvider>
	)
}

export default Dashboard;
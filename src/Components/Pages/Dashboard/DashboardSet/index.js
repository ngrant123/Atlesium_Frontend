import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Navigation from "../../../UniversalComponents/Navigation/PageNavigation/index.js";
import Reticans from "../DashboardSubset/Reticans/index.js";
import ReticanNavigation from "../../../UniversalComponents/Navigation/CardNavigationCircle/index.js";
import {ReticanProvider} from "./ReticanContext.js";
import {
	retrieveProfileSpecificReticanOverviews,
	retrieveRetican
} from "../../../../Actions/Requests/ReticanRequests/Retrieval/ReticanRetrieval.js";
import AlertSystem from "../../../UniversalComponents/Skeletons/Alerts.js";
import LoadingAnimation from "../../../UniversalComponents/Loading/index.js";
import {useSelector,useDispatch} from "react-redux";
import {tokensRegeneration} from "../../../../Actions/Tasks/UpdateTokens.js";
import InitalNewUserOnboardingModal from "../../../UniversalComponents/Onboarding/InitialDashboardOnboarding.js";
import {
	retrieveDashboardOnboardingStatus
} from "../../../../Actions/Requests/ProfileRequests/Retrieval/OnboardingStatusRetrieval.js";


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

const ReticanContainer=styled.div`
	position:relative;
	height:100%;
	width:100%;
	display:flex;
	flex-direction:row;

	@media screen and (max-width:1370px){
		flex-direction:column-reverse;

		#reticanNavigationParentDiv{
			height:10% !important;
			width:100% !important;
		}
	}

	@media screen and (max-width:650px){
		margin-top:5%;
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		#reticanNavigationParentDiv{
			margin-top:5%;
		}
		margin-top:10%;
		position:absolute;
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		#reticanNavigationParentDiv{
			margin-top:10%;
		}
    }

`;

const Dashboard=(props)=>{
	const [currentSelectedIndex,changeCurrentSelectedIndex]=useState(0);
	const [reticans,changeReticans]=useState([]);
	const [stackReticansView,changeStackReticanView]=useState(reticans);
	const [previousIndex,changePreviousIndex]=useState();
	const [displayReticanOverviewAlertMessage,changeDisplayReticanOverviewAlertMessage]=useState(false);
	const [errorMessage,changeErrorMessage]=useState();
	const [reticanStatus,changeReticanStatus]=useState("Active");
	const [displayLoadingAnimation,changeDisplayLoadingAniamtion]=useState(true);
	const [displayOnboardingModal,changeDisplayOnboardingModal]=useState(false);
	const {
		_id,
		accessToken,
		refreshToken
	}=useSelector(state=>state.personalInformation);
	const dispatch=useDispatch();
	const [reticanCardDirection,changeReticanCardDirection]=useState("block");

	const [indexesPreviouslyVisited,changeIndexesPreviouslyVisited]=useState({});

	useEffect(()=>{
		debugger;
		if(_id=="" || _id==null){
			props.history.push('/');
		}
	},[]);


	useEffect(()=>{
		const fetchOnboardingData=async()=>{
			const {confirmation,data}=await retrieveDashboardOnboardingStatus(_id);
			if(confirmation=="Success"){
				const {message}=data;
				changeDisplayOnboardingModal(!message);
			}
		}
		fetchOnboardingData();
	},[]);

	useEffect(()=>{
		fetchData({});
	},[]);

	const triggerUIChange=()=>{
		if(window.innerWidth<1370){
			changeReticanCardDirection("inline-block")
		}else{
			changeReticanCardDirection("block");
		}
	}

	useEffect(()=>{
		triggerUIChange();
		window.addEventListener('resize', triggerUIChange)
	},[window.innerWidth]);


	const fetchReticanUrlData=async(reticanId)=>{
		debugger;
		let tempIndexesVisited=indexesPreviouslyVisited;
		console.log(Object.keys(tempIndexesVisited).length);
		console.log(tempIndexesVisited[currentSelectedIndex]);

		if(Object.keys(tempIndexesVisited).length>0 && tempIndexesVisited[currentSelectedIndex]==null){
			const {confirmation,data}=await retrieveRetican(reticanId,_id);
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
		if(reticans.length>1){
			const tempStackReticanHolders=[];
			fetchReticanUrlData(reticans[currentSelectedIndex].primaryReticanCard.toString()).then(result=>{
				debugger;
				if(result!=null){
					reticans[currentSelectedIndex]={
						...reticans[currentSelectedIndex],
						primaryReticanCard:{...result}
					}
				}
				if(currentSelectedIndex==reticans.length-1){
					tempStackReticanHolders.push(reticans[currentSelectedIndex]);
					tempStackReticanHolders.push(reticans[0]);
				}else{
					const selectedIndex=currentSelectedIndex;
					tempStackReticanHolders.push(reticans[selectedIndex]);
					tempStackReticanHolders.push(reticans[selectedIndex+1]);
				}
				if(previousIndex!=null){
					tempStackReticanHolders.splice(0,0,{
						...reticans[previousIndex],
						animationIndicator:true
					});
				}
				changeStackReticanView([...tempStackReticanHolders]);
			});
		}else{
			changeStackReticanView(reticans);
		}
	},[currentSelectedIndex,reticans]);



	const fetchData=async({updatedAccessToken})=>{
		const {confirmation,data}=await retrieveProfileSpecificReticanOverviews(
			_id,
			reticanStatus,
			updatedAccessToken==null?accessToken:updatedAccessToken
		);
		debugger;
		if(confirmation=="Success"){
			const {message}=data;
			changeReticans(message);
		}else{	
			const {statusCode}=data;
			let errorAlertMessage;

			if(statusCode==401){
				tokensRegeneration({
					currentRefreshToken:refreshToken,
					userId:_id,
					parentApiTrigger:fetchData,
					dispatch,
					parameters:{}
				})
			}else{
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
		}
		changeDisplayLoadingAniamtion(false);
	}

	const updateSelectedIndex=(selectedIndex)=>{
		console.log(selectedIndex);
		changePreviousIndex(currentSelectedIndex);
		changeCurrentSelectedIndex(selectedIndex);
	}

	const deleteRetican=()=>{
		debugger;
		let currentStackIndex=currentSelectedIndex;
		if(currentStackIndex!=0){
			currentStackIndex--;
		}
		changeCurrentSelectedIndex(currentStackIndex);
		const parentReticans=reticans;
		parentReticans.splice(currentSelectedIndex,1);
		changeReticans([...parentReticans]);
		removeReticanFromStack(currentSelectedIndex);
	}

	const removeReticanFromStack=(index)=>{
		debugger;
		const tempReticans=stackReticansView;
		tempReticans.splice(index,1);
		changeStackReticanView([...tempReticans]);
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

	const closeOnboardingModal=()=>{
		changeDisplayOnboardingModal(false);
	}

	const onboardingModal=()=>{
		return(
			<React.Fragment>
				{displayOnboardingModal==true &&(
					<InitalNewUserOnboardingModal
						targetDom={"dashboard"}
						closeModal={closeOnboardingModal}
						profileId={_id}
					/>
				)}
			</React.Fragment>
		)
	}

	return(
		<ReticanProvider
			value={{
				stackReticans:stackReticansView,
				reticans:reticans,
				currentSelectedIndex,
				removeTargetedIndexRetican:(index)=>{
					removeReticanFromStack(index);
				},
				deleteRetican:(index)=>{
					deleteRetican(index);
				},
				updateReticanOrdering:(updatedReticansOrdering)=>{
					changeReticans([...updatedReticansOrdering]);
					changeCurrentSelectedIndex(0);
				},
				history:props.history
			}}
		>
			{onboardingModal()}
			<Container id="dashboard">
				<Navigation
					pageType={"Dashboard"}
					parentDiv={"dashboard"}
				/>
				<ReticanContainer>
					{reticanRetrievalOverviewErrorModal()}
					{displayLoadingAnimation==true ?
						<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
							<LoadingAnimation
								loadingText={"Retrieving retican overviews..."}
							/>
						</div>:
						<React.Fragment>
							<Reticans/>
							<div id="reticanNavigationParentDiv" 
								style={{height:"100%",width:"20%",borderLeft:"1px solid #ECECEC"}}>
								<ReticanNavigation 
									totalCards={reticans}
									currentSelectedIndex={currentSelectedIndex}
									specifiedDirection={reticanCardDirection}
									triggerUpdatedSelectedIndex={updateSelectedIndex}
								/>
							</div>
						</React.Fragment>
					}

				</ReticanContainer>
			</Container>
		</ReticanProvider>
	)
}

export default Dashboard;
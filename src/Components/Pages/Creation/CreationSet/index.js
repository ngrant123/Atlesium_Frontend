 import React,{useState,useEffect,useMemo} from "react";
 import styled from "styled-components";
 import CreationProgressBar from "../CreationSubset/ProgressBar.js";
 import InitialWebInformation from "../CreationSubset/InitialWebInfo"
 import ReticanDetails from "../CreationSubset/ReticanDetails/index.js";
 import ReviewStage from "../CreationSubset/Review/index.js";
 import {
 	retrieveReticanOverviewForEditPage
 } from "../../../../Actions/Requests/ReticanRequests/Retrieval/ReticanRetrieval.js";
import AlertSystem from "../../../UniversalComponents/Skeletons/Alerts.js";
import {CreationProvider} from "./CreationContext.js";
import {useSelector,useDispatch} from "react-redux";
import {tokensRegeneration} from "../../../../Actions/Tasks/UpdateTokens.js";
import ReticanOnboardingModal from "../../../UniversalComponents/Onboarding/ReticanOnboarding.js";
import {
	retrieveReticanOnboardingStatus
} from "../../../../Actions/Requests/ProfileRequests/Retrieval/OnboardingStatusRetrieval.js";


const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	padding:0px;
	display:flex;
	flex-direction:column;
	align-items:center;
	overflow-y:auto;
	align-items:center;
	padding:15%;
	padding-top:7%;

	#callToActionSkeleton{
		padding:0px;
	}

	#loadingAnimationText{
		margin-top:0%;
	}

	@media screen and (max-width:650px){
		#componentParentContainer{
			margin-top:25% !important;
		}
		padding:10%;
		#callToActionSkeleton{
			padding:5px;
		}
	}
`;

const Creation=(props)=>{
	const [currentSelectedComponent,changeCurrentSelectedComponent]=useState("webInformation");
	const [reticanAssembly,changeReticanAssembly]=useState({});
	const [previousReticanInformation,changePreviousReticanInformation]=useState();
	const [alertMessage,changeAlertMessage]=useState();
	const [displayAlertMessage,changeDisplayAlertMessage]=useState(false);
	const [isEditReticanDesired,changeIsEditReticanDesiredStatus]=useState(false);
	const [isLoadingEditedReticanInformation,changeIsLoadingEditedReticanInformation]=useState(true);
	const [reticanHeaderColor,changeReticanHeaderColor]=useState();
	const [displayOnboardingModal,changeDisplayOnboardingModal]=useState(false);
	const [editedReticans,changeEditedReticans]=useState([]);

	const dispatch=useDispatch();

	const {
		_id,
		accessToken,
		refreshToken
	}=useSelector(state=>state.personalInformation);

	useEffect(()=>{
		if(_id=="" || _id==null){
			props.history.push('/');
		}
	},[]);

	useEffect(()=>{
		const fetchOnboardingStatus=async()=>{
			const {confirmation,data}=await retrieveReticanOnboardingStatus(_id);
			if(confirmation=="Success"){
				const {message}=data;
				changeDisplayOnboardingModal(!message);
			}
		}
		fetchOnboardingStatus();
		
	},[]);

	useEffect(()=>{
		if(props.match.params.id!=null){
			fetchReticanOverviewInformation({});
		}else{
			changeIsLoadingEditedReticanInformation(false);
		}
	},[]);

	const fetchReticanOverviewInformation=async({updatedAccessToken})=>{
		changeIsLoadingEditedReticanInformation(true);
		const {confirmation,data}=await retrieveReticanOverviewForEditPage(
											props.match.params.id,
											_id,
											updatedAccessToken==null?accessToken:updatedAccessToken);
		if(confirmation=="Success"){
			const {message}=data;
			changeIsEditReticanDesiredStatus(true);
			changeReticanAssembly(message);
			changeReticanHeaderColor(message.headerColor);
		}else{
			const {statusCode}=data;
			let reticanOverviewCreationErrorMessage;

			if(statusCode==401){
				tokensRegeneration({
					currentRefreshToken:refreshToken,
					userId:_id,
					parentApiTrigger:fetchReticanOverviewInformation,
					dispatch,
					parameters:{}
				})
			}else{
				if(statusCode==400){
					reticanOverviewCreationErrorMessage={
		        		header:"Edit Retican Overview Retrieval Error",
		        		description:"Unfortunately there has been an error when retrieving your retican overview. Please try again"
					}
				}else{
					reticanOverviewCreationErrorMessage={
		        		header:"Internal Server Error",
		        		description:"Unfortunately there has been an error on our part. Please try again later"
					}
				}
				changeAlertMessage(reticanOverviewCreationErrorMessage);
				changeDisplayAlertMessage(true);
			}

		}
		changeIsLoadingEditedReticanInformation(false);
	}

	const ComponentDecider=({children,componentSelectedName})=>{
		return children.filter(child=>child.props.name==componentSelectedName);
	}

	const displaySelectedScreen=(selectedScreen,reticanInformation)=>{
		if(reticanInformation!=null)
			updateReticanAssemblerInformation(reticanInformation);

		changeCurrentSelectedComponent(selectedScreen);
	}

	const updateReticanAssemblerInformation=(reticanInformation)=>{
		let currentReticanAssemnlyInformation=reticanAssembly;
		currentReticanAssemnlyInformation={
			...currentReticanAssemnlyInformation,
			...reticanInformation
		}
		changeReticanAssembly(currentReticanAssemnlyInformation);
	}

	const closeErrorAlertScreen=()=>{
		changeDisplayAlertMessage(false);
	}


	const reticanCreationErrorAlertModal=()=>{
	    return(
	      <React.Fragment>
	        {displayAlertMessage==true &&(
	          <AlertSystem
	            closeModal={closeErrorAlertScreen}
	            targetDomId={"reticanCreation"}
	            alertMessage={alertMessage}
	          />
	        )}
	      </React.Fragment>
	    )
  	}

  	const listReticanAsEdited=(editedReticanInformation)=>{
		const currentEditedReticans=editedReticans;
		currentEditedReticans.push(editedReticanInformation);
		changeEditedReticans([...currentEditedReticans]);
	}

  	const componentDeciderMemo=useMemo(()=>{
  		return(
  			<ComponentDecider componentSelectedName={currentSelectedComponent}>
				<InitialWebInformation 
					name="webInformation"
					progressScreen={displaySelectedScreen}
					reticanAssembly={reticanAssembly}
					isEditReticanDesired={isEditReticanDesired}
					isLoadingEditedReticanInformation={isLoadingEditedReticanInformation}
				/>
				<ReticanDetails 
					name="reticanDetails"
					progressScreen={displaySelectedScreen}
					reticanAssembly={reticanAssembly}
					isEditReticanDesired={isEditReticanDesired}
					updateReticanAssemblerInformation={updateReticanAssemblerInformation}
					reticanHeaderColor={reticanHeaderColor}
					history={props.history}
				/>
				<ReviewStage name="review"
					progressScreen={displaySelectedScreen}
					reticanAssembly={reticanAssembly}
				/>
			</ComponentDecider>
  		)
  	},[
  		currentSelectedComponent,
  		reticanAssembly,
  		isEditReticanDesired,
  		isLoadingEditedReticanInformation
  	]);

  	const closeOnboardingModal=()=>{
  		changeDisplayOnboardingModal(false);
  	}

  	const onboardingModal=()=>{
		return(
			<React.Fragment>
				{displayOnboardingModal==true &&(
					<ReticanOnboardingModal
						targetDom={"reticanCreation"}
						closeModal={closeOnboardingModal}
						profileId={_id}
					/>
				)}
			</React.Fragment>
		)
	}



	return(
		<CreationProvider
			value={{
				displayAlertScreen:(message)=>{
					changeAlertMessage(message);
					changeDisplayAlertMessage(true);
				},
				disableEditReticanStatus:()=>{
					changeIsEditReticanDesiredStatus(false);
				},
				editedReticans,
				listReticanAsEdited
			}}
		>
			{onboardingModal()}
			<Container id="reticanCreation">
				{reticanCreationErrorAlertModal()}
				<CreationProgressBar
					currentScreen={currentSelectedComponent}
				/>
				<div id="componentParentContainer" style={{marginTop:"7%",width:"100%"}}>
					{componentDeciderMemo}
				</div>
			</Container>
		</CreationProvider>
	)
}

export default Creation;

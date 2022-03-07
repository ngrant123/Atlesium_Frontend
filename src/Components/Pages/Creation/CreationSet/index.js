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


const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	padding:0px;
	display:flex;
	flex-direction:column;
	overflow-y:auto;
	align-items:center;
	padding:15%;
	padding-top:7%;

	@media screen and (max-width:650px){
		#componentParentContainer{
			margin-top:25% !important;
		}
		padding:10%;
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
	const dispatch=useDispatch();

	const {
		_id,
		accessToken,
		refreshToken
	}=useSelector(state=>state.personalInformation);

	useEffect(()=>{
		debugger;
		if(_id=="" || _id==null){
			props.history.push('/');
		}
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


	return(
		<CreationProvider
			value={{
				displayAlertScreen:(message)=>{
					changeAlertMessage(message);
					changeDisplayAlertMessage(true);
				},
				disableEditReticanStatus:()=>{
					changeIsEditReticanDesiredStatus(false);
				}
			}}
		>
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

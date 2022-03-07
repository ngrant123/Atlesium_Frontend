import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import CallToActionSkeleton from "../../../../UniversalComponents/Skeletons/CallToActionSkeleton.js";
import Color_Constants from "../../../../../Utils/ColorConstants.js";
import {deleteProfile} from "../../../../../Actions/Requests/ProfileRequests/Adapter/ProfileDeletion.js";
import {useSelector,useDispatch} from "react-redux";
import {logoutUser} from "../../../../../Actions/Redux/Actions/PersonalInformationActions.js";
import AlertSystem from "../../../../UniversalComponents/Skeletons/Alerts.js";
import {tokensRegeneration} from "../../../../../Actions/Tasks/UpdateTokens.js";

const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
}
const DeleteButtonIcon={
	borderRadius:"5px",
	color:"white",
	display:"flex",
	justifyContent:"center",
	alignItems:"center",
	padding:"5%",
	backgroundColor:Color_Constants.CALL_TO_ACTION_COLOR,
	cursor:"pointer"
}
const DeleteProfile=({closeModal,history})=>{
	const {
		_id,
		accessToken,
		refreshToken
	}=useSelector(state=>state.personalInformation);
	const dispatch=useDispatch();

	const [errorMessage,changeErrorMessage]=useState();
	const [displayDeleteProfileErrorAlertMessage,changeDisplayDeleteProfileErrorMessage]=useState(false);


	const triggerDeleteProfile=async({updatedAccessToken})=>{
		debugger;
		const {confirmation,data}=await deleteProfile(
			_id,
			updatedAccessToken==null?accessToken:updatedAccessToken);
		if(confirmation=="Success"){
			dispatch(logoutUser());
			history.push('/');
		}else{
			const {statusCode}=data;
			let errorAlertMessage;

			if(statusCode==401){
				tokensRegeneration({
					currentRefreshToken:refreshToken,
					userId:_id,
					parentApiTrigger:triggerDeleteProfile,
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
						header:"Profile Deletion Error",
						description:"Unfortunately, an error has occured when deleting your profile picture. Please try again."
					}
				}

				changeErrorMessage(errorAlertMessage);
				changeDisplayDeleteProfileErrorMessage(true);
			}
		}
	}

	const deleteProfileModal=()=>{
		return(
			<React.Fragment>
				<div style={{width:"100%",display:"flex",justifyContent:"center"}}>
					<p>
						<b>Are you sure you want to delete you profile?</b>
					</p>
				</div>
				<hr style={HorizontalLineCSS}/>
				<div style={DeleteButtonIcon} onClick={()=>triggerDeleteProfile({})}>
					Delete
				</div>
			</React.Fragment>
		)
	}

	const closeAlertModal=()=>{
		changeDisplayDeleteProfileErrorMessage(false);
	}

	const alertModal=()=>{
		return(
			<React.Fragment>
				{displayDeleteProfileErrorAlertMessage==true &&(
					<AlertSystem
						closeModal={closeAlertModal}
						targetDomId={"settings"}
						alertMessage={errorMessage}
					/>
				)}
			</React.Fragment>
		)
	}

	return(
		<React.Fragment>
			{alertModal()}
			<CallToActionSkeleton
				component={deleteProfileModal()}
				closeModal={closeModal}
				targetDom={"settings"}
			/>
		</React.Fragment>
	)
}

export default DeleteProfile; 

















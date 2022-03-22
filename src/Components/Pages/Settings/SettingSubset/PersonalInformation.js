import React,{useState,useEffect} from "react";
import styled from "styled-components";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Color_Constants from "../../../../Utils/ColorConstants.js";
import DeleteProfileModal from "../SettingSet/Modals-Portals/DeleteProfilePortal.js";
import PauseProfileModal from "../SettingSet/Modals-Portals/PauseProfilePortal.js";
import {retrieveEmail} from "../../../../Actions/Requests/ProfileRequests/Retrieval/ProfileInformation.js";
import {
	useSelector,
	useDispatch
} from "react-redux";
import AlertSystem from "../../../UniversalComponents/Skeletons/Alerts.js";
import {
	editName,
	editEmail
} from "../../../../Actions/Requests/ProfileRequests/Adapter/ProfileEditService.js";
import {
	editFirstName
} from "../../../../Actions/Redux/Actions/PersonalInformationActions.js";
import {tokensRegeneration} from "../../../../Actions/Tasks/UpdateTokens.js";

const Container=styled.div`
	@media screen and (max-width:650px){
		#editButtonIcon{
			padding:3% !important;
		}
	}
`;

const TextArea=styled.textarea`
  position:relative;
  border-radius:5px;
  width:90%;
  border-style:solid;
  border-width:1px;
  border-color:${Color_Constants.GREY};
  resize:none;
  padding:5px;
  margin-bottom:2%;
  margin-right:2%;
  height:70px;
  @media screen and (max-width:650px){
    width:80% !important;
    height:50px;
  }
`;

const UnSelectCSS={
	borderStyle:"none",
	backgroundColor:"white"
}


const VerticalLineCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"50px",
 	marginRight:"2%"
}

const EditButtonCSS={
	borderRadius:"50%",
	boxShadow:"1px 1px 5px #6e6e6e",
	padding:"10px",
	cursor:"pointer",
	marginTop:"-20px"
}
const PersonalInformationSettings=({parentContainerId,history})=>{
	const [displayDeleteProfileModal,changeDisplayDeleteProfileModal]=useState(false);
	const [displayPauseProfileModal,changeDisplayPauseProfileModal]=useState(false);
	const {
		firstName,
		_id,
		accessToken,
		refreshToken
	}=useSelector(state=>state.personalInformation);

	const [alertMessage,changeAlertMessage]=useState();
	const [displayAlertModal,changeDisplayAlertModal]=useState(false);
	const [userEmail,changeUserEmail]=useState();
	const dispatch=useDispatch();
	const [isNameEditing,changeNameEditingStatus]=useState(false);
	const [isEmailEditing,changeEmailEditingStatus]=useState(false);

	useEffect(()=>{
		const fetchData=async({updatedAccessToken})=>{
			const {confirmation,data}=await retrieveEmail(
												_id,
												updatedAccessToken==null?accessToken:updatedAccessToken);
			if(confirmation=="Success"){
				const {message}=data;
				document.getElementById("email").value=message;
				changeUserEmail(message);
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
					let emailRetrievalAlertMessage;
					if(statusCode==500){
						errorAlertMessage={
							header:"Internal Server Error",
							description:"Unfortunately there has been an error on our part. Please try again later"
						}
					}else{					
						errorAlertMessage={
							header:"Email Retrieval Error",
							description:"Unfortunately, there has been an error when retrieving your email. Please try again"
						}
					}			

					changeAlertMessage(errorAlertMessage);
					changeDisplayAlertModal(true);
				}
			}
		}
		fetchData({});
		document.getElementById("firstName").value=firstName;
	},[]);

	const closeDeleteModal=()=>{
		changeDisplayDeleteProfileModal(false);
	}
	const deleteProfileModal=()=>{
		return(
			<React.Fragment>
				{displayDeleteProfileModal==true &&(
					<DeleteProfileModal
						closeModal={closeDeleteModal}
						history={history}
					/>
				)}
			</React.Fragment>
		)
	}

	const closePauseModal=()=>{
		changeDisplayPauseProfileModal(false);
	}	
	const pauseProfileModal=()=>{
		return(
			<React.Fragment>
				{displayPauseProfileModal==true &&(
					<PauseProfileModal
						closeModal={closePauseModal}
					/>
				)}
			</React.Fragment>
		)
	}

	const triggerEditName=async({updatedAccessToken,userSubmittedName})=>{
		let editedNameAlertMessage;
		changeNameEditingStatus(true);

		if(userSubmittedName==firstName){
			changeNameEditingStatus(false);
			editedNameAlertMessage={
				header:"No change detected.",
				description:"Please alter your first name."
			}
			changeAlertMessage(editedNameAlertMessage);
			changeDisplayAlertModal(true);

		}else{
			const {confirmation,data}=await editName(
												_id,
												userSubmittedName,
												updatedAccessToken==null?accessToken:updatedAccessToken);
			if(confirmation=="Success"){
				changeNameEditingStatus(false);
				document.getElementById("firstName").value=userSubmittedName;

				editedNameAlertMessage={
					header:"Success",
					description:"First name changed"
				}
				changeAlertMessage(editedNameAlertMessage);
				changeDisplayAlertModal(true);
				dispatch(editFirstName(userSubmittedName));
			}else{
				const {statusCode}=data;
				let errorAlertMessage;

				if(statusCode==401){
					tokensRegeneration({
						currentRefreshToken:refreshToken,
						userId:_id,
						parentApiTrigger:triggerEditName,
						dispatch,
						parameters:{
							userSubmittedName
						}
					})
				}else{
					if(statusCode==500){
						errorAlertMessage={
							header:"Internal Server Error",
							description:"Unfortunately there has been an error on our part. Please try again later"
						}
					}else{					
						errorAlertMessage={
							header:"Edited Name Error",
							description:"Unfortunately, there has been an error when attempting to change your name. Please try again"
						}
					}			

					changeAlertMessage(errorAlertMessage);
					changeDisplayAlertModal(true);
				}

				changeNameEditingStatus(false);

			}
		}

		
	}

	const triggerEditEmail=async({updatedAccessToken,userSubmittedEmail})=>{
		let editedEmailAlterMessage;
		changeEmailEditingStatus(true);

		if(userEmail==userSubmittedEmail){
			changeEmailEditingStatus(false);
			editedEmailAlterMessage={
				header:"No change detected.",
				description:"Please alter your email."
			}

			changeAlertMessage(editedEmailAlterMessage);
			changeDisplayAlertModal(true);
		}else{
			const {confirmation,data}=await editEmail(
												_id,
												userSubmittedEmail,
												updatedAccessToken==null?accessToken:updatedAccessToken);
			if(confirmation=="Success"){
				changeEmailEditingStatus(false);
				changeUserEmail(userSubmittedEmail);
				document.getElementById("email").value=userSubmittedEmail;

				editedEmailAlterMessage={
					header:"Success",
					description:"Email changed"
				}

				changeAlertMessage(editedEmailAlterMessage);
				changeDisplayAlertModal(true);
			}else{
				const {statusCode}=data;
				if(statusCode==401){
					tokensRegeneration({
						currentRefreshToken:refreshToken,
						userId:_id,
						parentApiTrigger:triggerEditEmail,
						dispatch,
						parameters:{userSubmittedEmail}
					})
				}else{
					if(statusCode==403){
						editedEmailAlterMessage={
							header:"Email Taken",
							description:"The email you have typed has already been taken by someone else. Please add another one."
						}
					}else if(statusCode==500){
						editedEmailAlterMessage={
							header:"Internal Server Error",
							description:"Unfortunately there has been an error on our part. Please try again later"
						}
					}else{
						editedEmailAlterMessage={
							header:"Edited Email Error",
							description:"Unfortunately, there has been an error when attempting to change your name. Please try again"
						}
					}
					
					changeAlertMessage(editedEmailAlterMessage);
					changeDisplayAlertModal(true);
				}
				changeEmailEditingStatus(false);
			}
		}
	}

	const closeAlertModal=()=>{
		changeDisplayAlertModal(false);
	}

	const alertModal=()=>{
		return(
			<React.Fragment>
				{displayAlertModal==true &&(
					<AlertSystem
						closeModal={closeAlertModal}
						targetDomId={parentContainerId}
						alertMessage={alertMessage}
					/>
				)}
			</React.Fragment>
		)
	}

	return(
		<Container>
			{alertModal()}
			{pauseProfileModal()}
			{deleteProfileModal()}
			<div style={{display:"flex",flexDirection:"row",marginBottom:"5%"}}>
				<AccountBoxIcon
					style={{fontSize:"36",color:Color_Constants.PRIMARY_COLOR}}
				/>
				<p id="settingHeaderText" style={{fontSize:"24px",marginLeft:"2%"}}>
					<b>Personal Information</b>
				</p>
				<div class="btn-group">
					<button class="btn btn-primary dropdown-toggle" type="button" 
						data-toggle="dropdown" style={UnSelectCSS}>
						<ArrowDropDownCircleOutlinedIcon
							style={{fontSize:"24",color:"black"}}
						/>
					</button>
					<ul class="dropdown-menu" style={{padding:"10px",marginLeft:"-120px"}}>
						<li style={{cursor:"pointer"}} onClick={()=>changeDisplayDeleteProfileModal(true)}>
							Delete Profile
						</li>
						{/*
							<hr/>
							<li style={{cursor:"pointer"}} onClick={()=>changeDisplayPauseProfileModal(true)}>
								Pause Profile
							</li>
						*/}
					</ul>
				</div>
			</div>

			<div>
				<p>
					<b>First Name</b>
				</p>

				{isNameEditing==true?
					<p>Editing...</p>:
					<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
						<TextArea id="firstName" placeholder="First Name"/>
						<div style={VerticalLineCSS}/>
						<div id="editButtonIcon" style={EditButtonCSS} 
							onClick={()=>triggerEditName({
								userSubmittedName:document.getElementById("firstName").value
							})}>
							<BorderColorIcon
								style={{color:Color_Constants.PRIMARY_COLOR,}}
							/>
						</div>
					</div>
				}
			</div>

			<div>
				<p>
					<b>Email</b>
				</p>
				{isEmailEditing==true?
					<p>Editing...</p>:
					<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
						<TextArea id="email" placeholder="Email"/>
						<div style={VerticalLineCSS}/>
						<div id="editButtonIcon" style={EditButtonCSS} 
							onClick={()=>triggerEditEmail({
								userSubmittedEmail:document.getElementById("email").value
							})}>
							<BorderColorIcon
								style={{color:Color_Constants.PRIMARY_COLOR}}
							/>
						</div>
					</div>
				}
				<div style={{display:"flex",flexDirection:"row"}}>
					<input type="checkbox" style={{cursor:"pointer"}}
						onClick={()=>history.push(`/passwordReset`)}
					/>
					<p style={{marginLeft:"2%",color:Color_Constants.PRIMARY_COLOR}}>Update Password</p>
				</div>
			</div>
		</Container>
	)
}

export default PersonalInformationSettings;
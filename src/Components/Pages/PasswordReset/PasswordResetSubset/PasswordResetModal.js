import React,{useState} from "react";
import styled from "styled-components";
import {verifyPasswordResetCode} from "../../../../Actions/Requests/ProfileRequests/Retrieval/PassWordResetVerification.js";
import {updatePassword} from "../../../../Actions/Requests/ProfileRequests/Adapter/ProfileEditService.js"; 
import {useDispatch} from "react-redux";
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import RequiredFieldNotification from "../../../UniversalComponents/Notifications/RequiredFieldNotification.js";
import {clearInputField} from "../../../../Actions/Tasks/ClearInputFields.js";
import AlertSystem from "../../../UniversalComponents/Skeletons/Alerts.js";


const Container=styled.div`
	position:absolute;
	top:20%;
	width:50%;
	border-radius:5px;
	height:50%;
	background-color:white;
	box-shadow:1px 1px 10px #d5d5d5;
	padding:20px;
	display:flex;
	flex-direction:column;
	overflow-y:auto;
	@media screen and (max-width:650px){
		top:0%;
		width:100% !important;
		height:100% !important;
		padding-top:20%;
	}
    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
	 	padding-top:0%;
	 	top:0%;
		width:100% !important;
		height:100% !important;
    }
`;
const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	width:85%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	margin-bottom:2%;
	margin-right:2%;

	@media screen and (max-width:700px){
		width:95% !important;
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		min-height:100px;
    }
`;

const Button=styled.div`

	   width:30%;
	   height:10%;
	   border-color: #C8B0F4;
	   border-style:solid;
	   background-color:#C8B0F4;
	   color:white;
	   text-decoration:none;

	   display: flex;
	   align-items: center;
	   justify-content: center;
	   transition:8s;
	  border-radius:5px;
	  padding:20px;
	  margin-bottom:10%;
	  cursor:pointer;
	   z-index:2;
	   &:hover{

	      background-color:white;

	    color:#C8B0F4;
	   border-style:solid;
	   border-color: #C8B0F4;
	   text-decoration:none;

	   }

	  @media screen and (max-width:400px) {top:78%}
	  @media screen and (max-width:330px) {top:79%;font-size:10px}
	  @media screen and (max-width:414px) {top:77%;}
	  @media screen and (max-height:570px) {top:85%}
	  @media screen and (max-height:530px) {top:75%;height:20%}
`;


const PasswordReset=(props)=>{
	const{
		email,
		triggerEmailConfirmationModal,
		history,
		parentContainerId
	}=props;

	const [displayEnterPasswordPrompt,changeEnterPasswordPrompt]=useState(true);
	const [userRefreshToken,changeUserRefreshToken]=useState();
	const [userAccessToken,changeUserAccessToken]=useState();
	const [displayPasswordSuggestionsModal,changeDisplayPasswordSuggestionModal]=useState(false);
	const [alertMessage,changeAlertMessage]=useState();
	const [displayPasswordResetAlert,changePasswordRestAlertDisplay]=useState(false);
	const [erroredInputIds,changeErroredInputIds]=useState([]);
	const [passwordResetToken,changePasswordResetToken]=useState();

	const dispatch=useDispatch();

	const verifyToken=async()=>{
		const userSubmittedToken=document.getElementById("verificationCode").value;

		if(userSubmittedToken==""){
			let tempErrorInputIds=[];
        	tempErrorInputIds.push("verificationCode");
        	changeErroredInputIds(tempErrorInputIds);
		}else{
			const {confirmation,data}=await verifyPasswordResetCode(email,userSubmittedToken);
			if(confirmation=="Success"){
				changeEnterPasswordPrompt(false);
				changePasswordResetToken(userSubmittedToken);
			}else{
				const {statusCode}=data;
				let alertExplanation;
				if(statusCode==401){
					alertExplanation={
						header:"Time expired",
						description:'Your verification code is incorrect or the time has expired. Please try again'
					}
				}else{
					alertExplanation={
						header:"Internal Server Error",
						description:"Unfortunately there has been an error on our part. Please try again later"
					}
				}
				changeAlertMessage(alertExplanation);
				changePasswordRestAlertDisplay(true);
			}	
		}
	}

	const setPasswordForUser=async({isAccessTokenUpdated,updatedAccessToken})=>{
		const newPassword=document.getElementById("newPassword").value;

		if(newPassword==""){
			let tempErrorInputIds=[];
        	tempErrorInputIds.push("newPassword");
        	changeErroredInputIds(tempErrorInputIds);	
		}else{
			const {confirmation,data}=await updatePassword({
												newPassword,
												passwordResetToken,
												email,
												password:newPassword,
												accessToken:isAccessTokenUpdated==true?updatedAccessToken:
												userAccessToken
											});
			if(confirmation=="Success"){
				const { 
					message:{
		                accessToken,
		                refreshToken	
					}
	            }=data;

	            changeUserRefreshToken(refreshToken);
	            changeUserAccessToken(accessToken);

				alert('Password updated. You will be redirected to the landing screen to login again');

				history.push({pathname:'/'});
			}else{
				const {statusCode}=data;
				let alertExplanation;
				if(statusCode==401){
					changeEnterPasswordPrompt(false);
				}else{
					alertExplanation={
						header:"Internal Server Error",
						description:"Unfortunately there has been an error on our part. Please try again later"
					}
				}
				changeAlertMessage(alertExplanation);
				changePasswordRestAlertDisplay(true);
			}
		}
	}

	const closePasswordSuggestionsModal=()=>{
		changeDisplayPasswordSuggestionModal(false);
	}

	const closeErrorAlertScreen=()=>{
		changePasswordRestAlertDisplay(false);
	}

	const alertModal=()=>{
		return(
			<React.Fragment>
				{displayPasswordResetAlert==true &&(
					<AlertSystem
						closeModal={closeErrorAlertScreen}
						targetDomId={parentContainerId}
						alertMessage={alertMessage}
					/>
				)}
			</React.Fragment>
		)
	}
	return(
		<React.Fragment>
			{alertModal()}
			{/*
				<PasswordSuggestions
					closePasswordSuggestionsModal={closePasswordSuggestionsModal}
					displayPasswordSuggestionsModal={displayPasswordSuggestionsModal}
				/>
			*/}
			<Container>
				<p style={{fontSize:"30px"}}>
					<b>Reset password</b>
				</p>
				{displayEnterPasswordPrompt==true?
					<React.Fragment>
						<p>
							Please enter the verification code that was sent to your email. It will be located in either your inbox or spam.
							The code will be invalid in five minutes
					 	</p>

					 	<RequiredFieldNotification
					 		id={"verificationCode"}
				          	InputComponent={
				          		<InputContainer 
				          			id="verificationCode" 
				          			placeholder="Enter verification code"
				          			onClick={()=>clearInputField(changeErroredInputIds,erroredInputIds,"verificationCode")}
				          		/>
				         	}
				          	erroredInputIds={erroredInputIds}
					 	/>
						<Button onClick={()=>verifyToken()}>
							Submit
						</Button>
					</React.Fragment>:
					<React.Fragment>
						<div style={{display:"flex",flexDirection:"column"}}>
							<RequiredFieldNotification
						 		id={"newPassword"}
					          	InputComponent={
					          		<InputContainer 
					          			id="newPassword" 
					          			placeholder="New Password"
					          			onClick={()=>clearInputField(changeErroredInputIds,erroredInputIds,"newPassword")}
					          		/>
					         	}
					          	erroredInputIds={erroredInputIds}
						 	/>
							{/*
								<div style={{width:"25%"}}>
									<HelpOutlineOutlinedIcon
										style={{fontSize:"30",marginRight:"5%",color:"#C8B0F4",cursor:"pointer"}}
										onClick={()=>changeDisplayPasswordSuggestionModal(true)}
									/>
								</div>
							*/}
						</div>
						<Button onClick={()=>setPasswordForUser({isAccessTokenUpdated:false})}>
							Submit
						</Button>
					</React.Fragment>
				}
				<p style={{color:"#5298F8",cursor:"pointer"}} onClick={()=>triggerEmailConfirmationModal()}>
					Resend Verfication Code
				</p>
			</Container>
		</React.Fragment>
	)
}

export default PasswordReset;
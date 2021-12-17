import React,{useState} from "react";
import styled from "styled-components";
import {
	passwordResetConfirmationEmail
} from "../../../../Actions/Requests/EmailRequests/ProfileEmailService/PasswordRestEmailConfirmation.js";
import ErrorAlertSystem from "../../../UniversalComponents/Skeletons/Alerts.js";
import RequiredFieldNotification from "../../../UniversalComponents/Notifications/RequiredFieldNotification.js";
import {clearInputField} from "../../../../Actions/Tasks/ClearInputFields.js";

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


const SubmitButton=styled.div`

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

const EmailConfirmation=({triggerResetModal,parentContainerId})=>{
	const [erroredInputIds,changeErroredInputIds]=useState([]);
	const [errorMessage,changeErrorMessage]=useState();
	const [displayEmailVerificationErrorAlert,changeEmailVerificationCodeErrorAlert]=useState(false);

	const sendResetEmailConfirmation=async()=>{
		const userSubmittedEmail=document.getElementById("email").value;
		if(userSubmittedEmail==""){
			let tempErrorInputIds=[];
        	tempErrorInputIds.push("email");
        	changeErroredInputIds(tempErrorInputIds);
		}else{
			const {confirmation,data}=await passwordResetConfirmationEmail(document.getElementById("email").value);
			if(confirmation=="Success"){
				triggerResetModal(document.getElementById("email").value);
			}else{
				let emailErrorMessage;
				const {statusCode}=data;
				if(statusCode==500){
					emailErrorMessage={
						header:"Internal Server Error",
						description:"Unfortunately there has been an error on our part. Please try again later"
					}
				}else{
					emailErrorMessage={
						header:"Email verification code error",
						description:"Unfortunately, there has been an error when sending your verification code. Please try again"
					}
				}
				changeErrorMessage(emailErrorMessage);
				changeEmailVerificationCodeErrorAlert(true);
			}
		}
	}

	const closeErrorAlertScreen=()=>{
		changeEmailVerificationCodeErrorAlert(false);
	}

	const errorAlertModal=()=>{
		return(
			<React.Fragment>
				{displayEmailVerificationErrorAlert==true &&(
					<ErrorAlertSystem
						closeModal={closeErrorAlertScreen}
						targetDomId={parentContainerId}
						alertMessage={errorMessage}
					/>
				)}
			</React.Fragment>
		)
	}
	return(
		<Container>
			<p style={{fontSize:"30px"}}>
				<b>Reset password</b>
			</p>
			<p style={{fontSize:"20px",color:"#BDBDBD"}}>
				Please enter your email so we can send you a code to use as verification
			</p>
			<hr/>
		    <RequiredFieldNotification
	          	id={"email"}
	          	InputComponent={
		          	<InputContainer 
		          		id="email" 
		          		placeholder="Enter your email"
		          		onClick={()=>clearInputField(changeErroredInputIds,erroredInputIds,"email")}
		          	/>
	         	}
	          	erroredInputIds={erroredInputIds}
	        />

			<SubmitButton onClick={()=>sendResetEmailConfirmation()}>
				Submit
			</SubmitButton>
		</Container>
	)
}

export default EmailConfirmation;
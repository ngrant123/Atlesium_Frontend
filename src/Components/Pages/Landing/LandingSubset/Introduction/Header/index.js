import React,{useState,useContext} from "react";
import styled from "styled-components";
import Color_Constants from "../../../../../../Utils/ColorConstants.js";
import SympociaLogo from "../../../../../../Assets/Logos/StampIcon.png";
import ArrowForwardIosIcon from '@material-ui/icons/KeyboardArrowDown';
import LoginModal from "../../../LandingSet/Modals-Portals/SignInPortal.js";
import {LandingPageContext} from "../../../LandingSet/LandingPageContext.js";
import RequiredFieldNotification from "../../../../../UniversalComponents/Notifications/RequiredFieldNotification.js";
import {isEmailValid} from "../../../../../../Actions/Validation/EmailValidation.js";
import ErrorAlertSystem from "../../../../../UniversalComponents/Skeletons/Alerts.js";

import {hasEmailBeenPreviouslyUsed} from "../../../../../../Actions/Requests/ProfileRequests/Retrieval/ProfileInformation.js";

const Container=styled.div`
	display:flex;
	flex-direction:column;
	justify-content:space-between;
	height:100%;
	width:100%;
	margin-top:0%;

	@media screen and (max-width:650px){
		width:100%;
		#primaryText{
			font-size:14px !important;
		}

		#getStartedDiv{
			height:40px !important;
			font-size:12px !important;
		}

		#parentCompanyDiv{
			margin-top:20% !important;
			font-size:12px !important;
		}
		#parentCompanyLogo{
			width:40px !important;
			height:40px !important;
		}

		#callToActionsButtons{
			margin-top:20%;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		width:100%;
		height:100%;
		#primaryText{
			font-size:14px !important;
		}

		#getStartedDiv{
			height:40px !important;
			font-size:12px !important;
		}

		#parentCompanyDiv{
			display:none !important;
		}
		#parentCompanyLogo{
			width:40px !important;
			height:40px !important;
		}

		#callToActionsButtons{
			margin-top:20%;
		}
	}
`;

const InputContainer=styled.textarea`
	position:relative;
	width:100%;
	height:60px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:10px;
	border-top-left-radius: 5px 5px;
	border-bottom-left-radius: 5px 5px;



	@media screen and (max-width:650px){
		height:40px;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		height:40px;
    }
`;

const SecondaryButton=styled.div`
	border-radius:5px;
	background-color:#1E1E1E;
	display:flex;
	flex-direction:row;
	padding:4px;
	width:35%;
	justify-content:space-between;
	cursor:pointer;
	transition:.8s;
	&:hover{
	    background-color:white;
		box-shadow:2px 10px 10px #b9d6ff;
   }

   @media screen and (max-width:650px){
		width:50%;
		font-size:12px !important;
		margin-right:2%;
   }
   	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		width:50%;
		font-size:12px !important;
		margin-right:2%;
    }
`;

const PrimaryGetStartButtonCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"#3898ec",
	padding:"10px",
	color:"white",
	height:"60px",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	cursor:"pointer",
	width:"40%",
	display:"flex",
	alignItems:"center",
	justifyContent:"center",	
	borderTopRightRadius:"5px 5px",
	borderBottomRightRadius:"5px 5px"
}

const SecondaryButtonCSS={
	borderRadius:"5px",
	backgroundColor:"#1E1E1E",
	display:"flex",
	flexDirection:"row",
	padding:"4px",
	width:"35%",
	justifyContent:"space-between",
	cursor:"pointer"
}

const CallToActionsButtonsCSS={
	width:"100%",
	display:"flex",
	justifyContent:"space-between",
	marginBottom:"10%",
	marginTop:"5%"
}

const Header=({incrementPageCounter})=>{
	const [displaySignInModal,changeDisplaySignInModal]=useState(false);
	const landingPageConsumer=useContext(LandingPageContext);
	const [erroredInputIds,changeErroredInputIds]=useState([]);
	const [displayEmailErrorAlert,changeDisplayEmailErrorAlert]=useState(false);
	const [errorMessage,changeErrorMessage]=useState();

	const closeSignInModal=()=>{
		changeDisplaySignInModal(false);
	}

	const signInModal=()=>{
		return(
			<React.Fragment>
				{displaySignInModal==true &&(
					<LoginModal
						closeModal={closeSignInModal}
						history={landingPageConsumer.history}
						parentContainerId={landingPageConsumer.parentContainerId}
					/>
				)}
			</React.Fragment>
		)
	}

	const initializeProfileCreation=async()=>{
		debugger;
		const userSubmittedEmail=document.getElementById("email").value;
		if(userSubmittedEmail==""){
			const tempErroredIds=[];
			tempErroredIds.push("email");
			changeErroredInputIds(tempErroredIds);
		}else{
			const {
				data:{
					message
				}
			}=await hasEmailBeenPreviouslyUsed(userSubmittedEmail);
			debugger;
			if(isEmailValid(userSubmittedEmail) && message==false){
				landingPageConsumer.triggerDisplayProfileCreation(userSubmittedEmail);
			}else{
				let emailCreationErrorMessage;
				if(message==true){
					emailCreationErrorMessage={
						header:"Email already assigned",
						description:"The email you provided is already used. Please enter another email"
					}
				}else{
					emailCreationErrorMessage={
						header:"Invalid email",
						description:"The email you provided is invalid. Please enter a valid email"
					}
				}
				changeErrorMessage(emailCreationErrorMessage);
				changeDisplayEmailErrorAlert(true);
			}
		}
	}


	const clearInputField=(id)=>{
		debugger;
		let isInputErroredOut=false;
		for(var i=0;i<erroredInputIds.length;i++){
			if(erroredInputIds[i]==id){
				isInputErroredOut=true;
				erroredInputIds.splice(i,1);
				break;
			}
		}
		if(isInputErroredOut){
			changeErroredInputIds([...erroredInputIds]);

		}
	}

	const closeErrorAlertScreen=()=>{
		changeDisplayEmailErrorAlert(false);
	}

	const emailErrorAlertModal=()=>{
		return(
			<React.Fragment>
				{displayEmailErrorAlert==true &&(
					<ErrorAlertSystem
						closeModal={closeErrorAlertScreen}
						targetDomId={landingPageConsumer.parentContainerId}
						alertMessage={errorMessage}
					/>
				)}
			</React.Fragment>
		)
	}

	return(
		<Container>
			{emailErrorAlertModal()}
			{signInModal()}
			<div id="headerTextInformation" style={{marginTop:"25%",marginBottom:"15%"}}>
				<div style={{width:"100%",display:"flex",textAlign:"center",marginBottom:"5%"}}>
					<p id="headerText" style={{fontSize:"36px"}}>
						<b>A new way to 
							<span style={{color:Color_Constants.PRIMARY_COLOR}}> connect </span> 
							to your customers
						</b>
					</p>
				</div>

				<p id="primaryText" style={{fontSize:"24px"}}>
					Onboard and interact with your customers on a more personal level than ever before. 
					Engagment on a whole new level
				</p>
				<RequiredFieldNotification
					id={"email"}
					InputComponent={
						<div style={{width:"100%",display:"flex",flexDirection:"row",alignItems:"center"}}>
							<InputContainer 
								id="email" 
								placeholder="Enter your email"
								onClick={()=>clearInputField("email")}
							/>
							<div id="getStartedDiv" style={PrimaryGetStartButtonCSS} 
								onClick={()=>initializeProfileCreation()}>
								Get Started
							</div>
						</div>
					}
					erroredInputIds={erroredInputIds}
				/>

				<div id="callToActionsButtons" style={CallToActionsButtonsCSS}>
					<SecondaryButton onClick={()=>incrementPageCounter(1,true)}>
						<div style={{backgroundColor:"white",padding:"10px"}}>
							How it works
						</div>
						<div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"30%"}}>
							<ArrowForwardIosIcon
								style={{color:"white",fontSize:"24"}}
							/>
						</div>
					</SecondaryButton>
					<SecondaryButton onClick={()=>changeDisplaySignInModal(true)}>
						<div style={{backgroundColor:"white",padding:"10px",width:"50%"}}>
							Sign In
						</div>
						<div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"30%"}}>
							<ArrowForwardIosIcon
								style={{color:"white",fontSize:"24"}}
							/>
						</div>
					</SecondaryButton>
				</div>
			</div>

			<a href="https://sympocia.com/" style={{textDecoration:"none"}}>
				<div id="parentCompanyDiv" style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%"}}>
					<img id="parentCompanyLogo" src={SympociaLogo} style={{width:"50px",height:"45px",borderRadius:"50%"}}/>
					<p style={{marginLeft:"2%",color:Color_Constants.CALL_TO_ACTION_COLOR}}>Made by Sympocia</p>
				</div>
			</a>
		</Container>
	)
}

export default Header;
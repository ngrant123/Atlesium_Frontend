import React,{useState,useContext,useRef,useEffect} from "react";
import styled from "styled-components";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import {LandingPageContext} from "../../LandingSet/LandingPageContext.js";
import COLOR_CONSTANTS from "../../../../../Utils/ColorConstants.js";
import {createProfile} from "../../../../../Actions/Requests/ProfileRequests/Adapter/ProfileCreation.js";
import RequiredFieldNotification from "../../../../UniversalComponents/Notifications/RequiredFieldNotification.js";
import ErrorAlertSystem from "../../../../UniversalComponents/Skeletons/Alerts.js";
import {Link} from "react-router";
import Payment from "../../../../UniversalComponents/Modals/Payment/index.js";

/*
		@media screen and (max-width:650px){
		#headerText{
			flex-direction:column !important;
		}
	}
*/
const Container=styled.div`
	position:relative;
	display:flex;
	flex-direction:column;
	width:100%;

	@media screen and (max-width:650px){
		#headerText{
			font-size:24px !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		#headerTextParentDiv{
			display:none !important;
		}
    }
`;

const InputContainer=styled.textarea`
	position:relative;
	width:100%;
	height:60px;
	border-style:solid;
	border-width:1px;
	border-color:${COLOR_CONSTANTS.GREY};
	resize:none;
	padding:10px;
	border-radius:5px;



	@media screen and (max-width:650px){
		height:40px;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		height:40px;
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
	borderRadius:"5px"
}


const ProfileCreation=({userSpecifiedEmail,parentContainerId,history})=>{
	const landingPageConsumer=useContext(LandingPageContext);
	const [inputRefMapping,changeInputRefMapping]=useState({});
	const [displayRequiredField,changeDisplayRequiredField]=useState(false);
	const [erroredInputIds,changeErroredInputIds]=useState([]);
	const [displayProfileCreationErrorAlert,changeProfileCreationErrorAlert]=useState(false);
	const [errorMessage,changeErrorMessage]=useState();
	const [createProfileIndicator,changeCreatingProfileIndicator]=useState(false);
	const [displayPaymentScreen,changeDisplayPaymentScreen]=useState(false);
	const [reduxInformation,changeReduxInformation]=useState();

	useEffect(()=>{
		changeDisplayPaymentScreen(true);
	},[])

	const triggerCreateProfile=async()=>{
		const userSubmittedFirstName=document.getElementById("firstName").value;
		const userSubmittedPassword=document.getElementById("password").value;

		if(userSubmittedFirstName=="" || userSubmittedPassword==""){
			const tempErroredIds=[];
			if(userSubmittedFirstName==""){
				tempErroredIds.push("firstName");
			}
			if(userSubmittedPassword==""){
				tempErroredIds.push("password");
			}
			changeErroredInputIds(tempErroredIds);
			changeDisplayRequiredField(true);
		}else{
			let userInformation={
		        firstName:userSubmittedFirstName,
	            email:userSpecifiedEmail,
	            password:userSubmittedPassword
			}
			changeCreatingProfileIndicator(true);
			const {confirmation,data}=await createProfile(userInformation);
	

			if(confirmation=="Success"){
				const {
					message:{
						tokens,
						profileId
					}
				}=data;

				let {
					password,
					email,
					...reduxAppropriateUserInformation
				}=userInformation;

				reduxAppropriateUserInformation={
					...reduxAppropriateUserInformation,
					_id:profileId,
					...tokens
				}
				changeReduxInformation(reduxAppropriateUserInformation);
				changeDisplayPaymentScreen(true);
			}else{
				//alert 
				const {message}=data;
				let profileCreationErrorMessage;
				if(message.statusCode==400){
					profileCreationErrorMessage={
						header:"Profile creation error",
						description:"Please check if you have the correct format for your signup information and please try again"
					}
				}else{
					profileCreationErrorMessage={
						header:"Internal Server Error",
						description:"Unfortunately there has been an error on our part. Please try again later"
					}
				}
				changeErrorMessage(profileCreationErrorMessage);
				changeProfileCreationErrorAlert(true);
			}
			changeCreatingProfileIndicator(false);
		}
	}






	const RequiredField=({inputComponent,inputId})=>{
		return(
			<RequiredFieldNotification
				id={inputId}
				InputComponent={inputComponent}
				erroredInputIds={erroredInputIds}
			/>
		)
	}

	const clearInputField=(id)=>{
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
		changeProfileCreationErrorAlert(false);
	}

	const creationErrorAlertModal=()=>{
		return(
			<React.Fragment>
				{displayProfileCreationErrorAlert==true &&(
					<ErrorAlertSystem
						closeModal={closeErrorAlertScreen}
						targetDomId={parentContainerId}
						alertMessage={errorMessage}
					/>
				)}
			</React.Fragment>
		)
	}

	const closePaymentModal=()=>{
		changeDisplayPaymentScreen(false);
	}

	const paymentModal=()=>{
		return(
			<React.Fragment>
				{displayPaymentScreen==true &&(
					<Payment
						targetIdDom={parentContainerId}
						closeModal={closePaymentModal}
						userSpecifiedEmail={userSpecifiedEmail}
						reduxInformation={reduxInformation}
						history={history}
					/>
				)}
			</React.Fragment>
		)
	}

	return(
		<Container>
			{paymentModal()}
			{creationErrorAlertModal()}
			<div id="headerTextParentDiv" style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
				<ArrowBackIosRoundedIcon
					style={{fontSize:"18",color:"black",cursor:"pointer",marginBottom:"2%",marginRight:"5%"}}
					onClick={()=>landingPageConsumer.hideProfileCreation()}
				/>
				<p id="headerText" style={{fontSize:"36px"}}>
					<b>Welcome to Atlesium</b>
				</p>
			</div>
			<div style={{marginBottom:"5%"}}>
				<RequiredField
					inputComponent={
						<InputContainer 
							id="firstName" 
							placeholder="Enter first name"
							onClick={()=>clearInputField("firstName")}
						/>}
					inputId={"firstName"}
				/>
			</div>

			<div style={{marginBottom:"5%"}}>
				<RequiredField
					inputComponent={
						<InputContainer 
							id="password" 
							placeholder="Enter password"
							onClick={()=>clearInputField("password")}
							style={{webkitTextSecurity:"circle"}}
						/>}
					inputId={"password"}
				/>
			</div>

			{createProfileIndicator==true?
				<p>Creating profile....</p>:
				<div style={PrimaryGetStartButtonCSS} onClick={()=>triggerCreateProfile()}>
					Create Profile
				</div>
			}
			<p style={{marginTop:"5%",color:COLOR_CONSTANTS.GREY_SECONDARY,width:"90%"}}>
				By continuing, you agree to Atlesium's 
				<b style={{color:"black",cursor:"pointer"}}
					onClick={()=>history.push('/termsOfService')}> Terms of Service </b>
				and acknowledge you've read our 
				<b style={{color:"black",cursor:"pointer"}}
					onClick={()=>history.push('/privacyPolicy')}> Privacy Policy </b>
			</p>
		</Container>
	)
}

export default ProfileCreation;
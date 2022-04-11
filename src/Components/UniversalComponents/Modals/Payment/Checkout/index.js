import React,{useEffect,useState} from "react";
import styled from "styled-components";
import COLOR_CONSTANTS from "../../../../../Utils/ColorConstants.js";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {renderPaymentHoistedFields} from "./HoistedFields.js";
import {useDispatch,useSelector} from "react-redux";
import {createTranscation} from "../../../../../Actions/Requests/Payment/Transaction.js";
import {
	updateProfilePaymentCardInformation
} from "../../../../../Actions/Requests/Payment/ProfilePaymentRecord.js";
import AlertSystem from "../../../../UniversalComponents/Skeletons/Alerts.js";
import {initializeProfile} from "../../../../../Actions/Redux/Actions/PersonalInformationActions.js";

import {tokensRegeneration} from "../../../../../Actions/Tasks/UpdateTokens.js";

const Container=styled.div`
	position:relative;
	display:flex;
	flex-direction:column;
	align-items:center;
	padding-top:5%;
	padding:2%;

	${({isNewProfileCreationCheckout})=>
		isNewProfileCreationCheckout==true?
		`width:30%;`:
		`width:100%;`
	}

	z-index:20;
	height:80%;
	border-radius:5px;

	${({isNewProfileCreationCheckout})=>
		isNewProfileCreationCheckout==true?
		`overflow-y:auto;`:
		`overflow-y:visible;`
	}


	background-color:white;

	@media screen and (max-width:1370px){
		width:70%;
	}

	@media screen and (max-width:650px){
		width:100%;
		height:100%;
	}

	@media screen and (max-width:650px){
		#enterpriseHeader{
			width:90% !important;
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
	overflow-y:auto;



	@media screen and (max-width:650px){
		height:40px;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		height:40px;
    }
`;

const InputCSS={
	position:"relative",
	width:"100%",
	height:"60px",
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:COLOR_CONSTANTS.GREY,
	resize:"none",
	padding:"10px",
	borderRadius:"5px",
	overflowY:"auto"
}

const SubscriptionCSS={
	width:"100%",
	padding:"5%",
	borderRadius:"5px",
	color:COLOR_CONSTANTS.PRIMARY_COLOR,
	backgroundColor:"white",
	display:"flex",
	justifyContent:"center",
	alignItems:"center",
	fontSize:"18px",
	cursor:"pointer",
	borderStyle:"solid",
	borderWidth:COLOR_CONSTANTS.PRIMARY_COLOR,
	marginTop:"5%"
}
/*
	<InputContainer id="card-number" placeholder="Enter card Number"/>
*/

const Checkout=(props)=>{
	const {
		reduxInformation,
		userSpecifiedEmail,
		history,
		targetIdDom,
		isNewProfileCreationCheckout,
		closeModal
	}=props;

	const submitButtonText=isNewProfileCreationCheckout==true?"Start Subscription":"Edit Card Information";
	const {
		_id,
		accessToken,
		refreshToken
	}=useSelector(state=>state.personalInformation);

	const [displayPaymentErrorAlert,changePaymentAlertDisplay]=useState(false);
	const [alertMessage,changeAlertMessage]=useState();
	const [loadingFieldsStatus,changeLoadingFieldsStatus]=useState(true);
	const dispatcher=useDispatch();

	useEffect(()=>{
		const triggerPaymentHoistedFields=async()=>{
			const {statusCode}=await renderPaymentHoistedFields(generateTransactionToken,triggerErrorAlertMessage);
			if(statusCode==400 || statusCode==500){
				let paymentErrorMessage;
				if(statusCode==400){
					paymentErrorMessage={
						header:"Payment error",
						description:"Please check if you have the correct format for your payment information and please try again"
					}
				}else if(statusCode==500){
					paymentErrorMessage={
						header:"Internal Server Error",
						description:"Unfortunately there has been an error on our part. Please try again later"
					}
				}
				triggerErrorAlertMessage(paymentErrorMessage);

			}else{
				changeLoadingFieldsStatus(false);
			}
		}

		triggerPaymentHoistedFields();
	},[]);

	const triggerErrorAlertMessage=(alertMessage)=>{
		changeAlertMessage(alertMessage); 
		changePaymentAlertDisplay(true);
	}

	const handlePaymentError=(statusCode)=>{
		if(statusCode==400 || statusCode==500){
			let paymentErrorMessage;
			if(statusCode==400){
				paymentErrorMessage={
					header:"Payment error",
					description:"Please check if you have the correct format for your payment information and please try again"
				}
			}else if(statusCode==500){
				paymentErrorMessage={
					header:"Internal Server Error",
					description:"Unfortunately there has been an error on our part. Please try again later"
				}
			}
			triggerErrorAlertMessage(paymentErrorMessage);
		}
	}

	const handleCreateTranscation=async(paymentNonce)=>{
		const {confirmation,data}=await createTranscation(
			paymentNonce,
			userSpecifiedEmail,
			reduxInformation._id,
			reduxInformation.firstName);

		if(confirmation=="Success"){
			dispatcher(initializeProfile(reduxInformation));
			history.push('/dashboard');
		}else{
			const {statusCode}=data;
			handlePaymentError(statusCode);
		}
	}

	const editCardInformation=async({paymentNonce,updatedAccessToken})=>{
		const {confirmation,data}=await updateProfilePaymentCardInformation(
			paymentNonce,
			_id,
			updatedAccessToken==null?accessToken:updatedAccessToken);

		if(confirmation=="Success"){
			let	paymentMessage={
				header:"Success",
				description:"Payment Card Information Updated"
			}

			changeAlertMessage(paymentMessage); 
			changePaymentAlertDisplay(true);
			closeModal();
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				tokensRegeneration({
					currentRefreshToken:refreshToken,
					userId:_id,
					parentApiTrigger:editCardInformation,
					dispatch:dispatcher,
					parameters:{paymentNonce}
				})
			}else{
				handlePaymentError(statusCode);
			}
		}
	}

	const generateTransactionToken=async(paymentNonce,errors)=>{
		if(errors){
		}else{
			if(isNewProfileCreationCheckout){
				handleCreateTranscation(paymentNonce);
			}else{
				editCardInformation({paymentNonce});
			}
		}
	}	

	const closeErrorAlertScreen=()=>{
		changePaymentAlertDisplay(false);
	}

	const paymentErrorAlertModal=()=>{
		return(
			<React.Fragment>
				{displayPaymentErrorAlert==true &&(
					<AlertSystem
						closeModal={closeErrorAlertScreen}
						targetDomId={targetIdDom}
						alertMessage={alertMessage}
					/>
				)}
			</React.Fragment>
		)
	}

	return(
		<React.Fragment>
			{paymentErrorAlertModal()}
			<Container isNewProfileCreationCheckout={isNewProfileCreationCheckout}>
				<div style={{width:"100%",cursor:"pointer"}} onClick={()=>closeModal()}>
					<ArrowBackIosIcon/>
				</div>
				<form submit="/" method="post" id="paymentCardForm">
					{/*
						<label for="card-number" style={{marginTop:"5%"}}>Card Number </label>
						<div id="card-number" style={InputCSS}></div>

						<div style={{display:"flex",flexDirection:"row",marginTop:"5%"}}>
							<div>
								<label for="expiration-date">Expiration </label>
								<div id="expiration-date" style={InputCSS}></div>
							</div>

							<div>
								<label for="cvv">CVV </label>
								<div id="cvv" style={{...InputCSS,marginLeft:"5%",width:"95%"}}></div>
							</div>
						</div>
						<input style={SubscriptionCSS} type="submit" value={submitButtonText} id="submit"/>
					*/}
					<div id="card-container"></div>
					{loadingFieldsStatus==true?
						<p>Loading...</p>:
						<input id="sq-creditcard" 
							style={SubscriptionCSS} 
							type="submit" 
							value={submitButtonText} 
							id="submit"
						/>
					}
				</form>
			</Container>
		</React.Fragment>
	)
}

export default Checkout;
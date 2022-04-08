import React,{useState} from "react";
import styled from "styled-components";
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import Color_Constants from "../../../../Utils/ColorConstants.js";
import Checkout from "../../../UniversalComponents/Modals/Payment/Checkout/index.js";
import {retrieveEmail} from "../../../../Actions/Requests/ProfileRequests/Retrieval/ProfileInformation.js";
import {
	useSelector,
	useDispatch
} from "react-redux";
import {tokensRegeneration} from "../../../../Actions/Tasks/UpdateTokens.js";
import AlertSystem from "../../../UniversalComponents/Skeletons/Alerts.js";
import CallToActionSkeleton from "../../../UniversalComponents/Skeletons/CallToActionSkeleton.js";

const Container=styled.div`
	@media screen and (max-width:650px){
		#morePaymentPlanDescription{
			width:100% !important;
		}
	}
`;

const MorePaymentPlanCSS={
	backgroundColor:Color_Constants.CALL_TO_ACTION_COLOR,
	borderRadius:"5px",
	padding:"2%",
	width:"40%",
	color:"white"
}
const AccountSettings=({parentContainerId,history})=>{
	const [displayCreditCardUpdateModal,changeCreditCardDisplayModal]=useState(false);
	const [userSpecifiedEmail,changeUserEmail]=useState();
	const [alertMessage,changeAlertMessage]=useState();
	const [displayAlertModal,changeDisplayAlertModal]=useState(false);

	const dispatch=useDispatch();

	const profileReduxInformation=useSelector(state=>state.personalInformation);
	const {
		_id,
		accessToken,
		refreshToken
	}=profileReduxInformation;

	const closeCreditCardModal=()=>{
		changeCreditCardDisplayModal(false);
		document.getElementById("paymentPlanCheckbox").checked=false;

	}

	const creditCardUpdateModal=()=>{
		return(
			<React.Fragment>
				{displayCreditCardUpdateModal==true &&(
					<CallToActionSkeleton
						component={
							<Checkout
								targetIdDom={parentContainerId}
								closeModal={closeCreditCardModal}
								userSpecifiedEmail={userSpecifiedEmail}
								reduxInformation={profileReduxInformation}
								history={history}
								isNewProfileCreationCheckout={false}
							/>
						}
						closeModal={closeCreditCardModal}
						targetDom={parentContainerId}
					/>
				)}
			</React.Fragment>
		)
	}

	const triggerDisplayCreditCardEditModal=async({updatedAccessToken})=>{
		const {confirmation,data}=await retrieveEmail(
											_id,
											updatedAccessToken==null?accessToken:updatedAccessToken);
		if(confirmation=="Success"){
			const {message}=data;
			changeUserEmail(message);
			changeCreditCardDisplayModal(true);
		}else{
			const {statusCode}=data;
			let errorAlertMessage;

			if(statusCode==401){
				tokensRegeneration({
					currentRefreshToken:refreshToken,
					userId:_id,
					parentApiTrigger:triggerDisplayCreditCardEditModal,
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
		<React.Fragment>
			{alertModal()}
			{creditCardUpdateModal()}
			<Container>
				<div style={{display:"flex",flexDirection:"row",marginBottom:"5%",marginTop:"5%"}}>	
					<AccountBalanceOutlinedIcon
						style={{fontSize:"36",color:Color_Constants.PRIMARY_COLOR}}
					/>
					<p id="settingHeaderText" style={{fontSize:"24px",marginLeft:"2%"}}>
						<b>Account Settings</b>
					</p>
				</div>

				<div style={{display:"flex",flexDirection:"row"}}>
					<input type="checkbox" id="paymentPlanCheckbox" 
						onClick={()=>triggerDisplayCreditCardEditModal({})}
					/>
					<p style={{marginLeft:"2%",color:Color_Constants.PRIMARY_COLOR}}>Update Credit Card Information</p>
				</div>
				<hr/>
				<div style={{display:"flex",flexDirection:"row"}}>
					<input type="checkbox" disabled="disabled"/>
					<p style={{marginLeft:"2%",color:Color_Constants.PRIMARY_COLOR}}>Update Plan</p>
				</div>
				<div id="morePaymentPlanDescription" style={MorePaymentPlanCSS}>
					<p>More payment plan options coming soon</p>
				</div>
			</Container>
		</React.Fragment>
	)
}

export default AccountSettings;
import React,{useState} from "react";
import styled from "styled-components";
import Checkout from "./Checkout/index.js";
import PaymentOptions from "./Options/index.js";
import {createPortal} from "react-dom";
import {PaymentProvider} from "./PaymentContext.js";

const ShadowContainer = styled.div`
  position:fixed;
  width:200%;
  height:100vh;
  left:-10%;
  top:0%;
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  display:block;
`;

const Container=styled.div`
	position:fixed;
	display:flex;
	justify-content:center;
	align-items:center;
	width:100%;
	height:100%;
	z-index:4;
`;

const Payment=({targetIdDom,closePaymentModal,userSpecifiedEmail,reduxInformation,history})=>{
	const [screenDesired,changeScreenDesired]=useState("Options");

	const closeAndResetModal=()=>{
		changeScreenDesired("Options")
	}

	return createPortal(
		<PaymentProvider
			value={{
				alterScreen:(userSelectedScreen)=>{
					changeScreenDesired(userSpecifiedEmail);
				},
				triggerClosePaymentModal:()=>{
					closePaymentModal()
				}
			}}
		>
			<Container>
				{screenDesired=="Options"?
					<PaymentOptions/>:
					<Checkout
						userSpecifiedEmail={userSpecifiedEmail}
						reduxInformation={reduxInformation}
						history={history}
						targetIdDom={targetIdDom}
						isNewProfileCreationCheckout={true}
						closeModal={closeAndResetModal}
					/>
				}
				<ShadowContainer 
					onClick={()=>closePaymentModal()}
				/>

			</Container>
		</PaymentProvider>
	,document.getElementById(targetIdDom))
}

export default Payment;
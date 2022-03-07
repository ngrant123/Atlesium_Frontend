import React,{useState} from "react";
import styled from "styled-components";
import Checkout from "./Checkout/index.js";
import PaymentOptions from "./Options/index.js";
import {createPortal} from "react-dom";

const ShadowContainer = styled.div`
  position:fixed;
  width:200%;
  height:100vh;
  left:-10%;
  top:0%;
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  display:block;
  z-index:20;
`;

const Payment=({targetIdDom,closePaymentModal})=>{
	console.log(targetIdDom);
	const [screenDesired,changeScreenDesired]=useState("Options");

	return createPortal(
		<React.Fragment>
			<ShadowContainer 
				onClick={()=>closePaymentModal()}
			/>

			{screenDesired=="Options"?
				<PaymentOptions/>:
				<Checkout/>
			}
		</React.Fragment>
	,document.getElementById(targetIdDom))
}

export default Payment;
import React from "react";
import styled from "styled-components";
import {generateSessionToken} from "../../../../../Actions/Requests/Payment/TokenGeneration.js";

const initializeCard=async(payments)=>{
	try{
	   const card = await payments.card();
	   await card.attach('#card-container'); 
	   return card; 
	}catch(err){
		throw err;
	}
}

export const renderPaymentHoistedFields=async(generateTransactionToken,triggerErrorAlertMessage)=>{
	try{
		let form=document.querySelector('#paymentCardForm');
		if(!window.Square){
			console.log("window square missing");
			return {statusCode:400}
		}else{
			const applicationId=process.env.NODE_ENV=="production"?process.env.REACT_APP_SQUARE_PRODUCTION_APPLICATION_ID:
								process.env.REACT_APP_SQUARE_SANDBOX_APPLICATION_ID;
								
			const locationId=process.env.NODE_ENV=="production"?process.env.REAC_APP_SQUARE_PRODUCTION_LOCATION_ID:
			process.env.REACT_APP_SQUARE_SANDBOX_LOCATION_ID;

			const payments = window.Square.payments(applicationId, locationId);

			let paymentCard=await initializeCard(payments);

			var analyzeForm=async(event)=>{
				event.preventDefault();
				const tokenResult=await paymentCard.tokenize();
				if(tokenResult.status=="OK"){
					generateTransactionToken(tokenResult.token);
				}else{
					const errorMessage={
						header:"Internal Server Error",
						description:"Unfortunately there has been an error on our part. Please try again later"
					}
					triggerErrorAlertMessage(errorMessage);
				}
				return;
			}


			form.addEventListener('submit', analyzeForm, false);
			return {statusCode:200}
		}
	}catch(err){
		console.log(err);
		return {statusCode:400};
	}

}

/*
	import React from "react";
	import styled from "styled-components";
	import {generateSessionToken} from "../../../../../Actions/Requests/Payment/TokenGeneration.js";

	export const renderPaymentHoistedFields=async(generateTransactionToken)=>{
		let {confirmation,data}=await generateSessionToken();

		if(confirmation=="Success"){
			const token=data.message;
			let form=document.querySelector('#paymentCardForm');
			window.braintree.client.create({
				authorization:token
			},(err,tokenizedClientInstance)=>{
				if(err){
					return {statusCode:500};
				}else{
					window.braintree.hostedFields.create({
						client:tokenizedClientInstance,
						styles:{
							'input': {
				                'font-size': '16px',
				                'font-family': 'courier, monospace',
				                'font-weight': 'lighter',
				                'color': '#ccc'
			                },
			                ':focus': {
			                	'color': 'black'
			                },
			                '.valid': {
			                	'color': '#8bdda8'
			                }
						},
						fields:{
							number:{
								selector:'#card-number',
								placeholder:'Enter card number'
							},
							cvv:{
								selector:'#cvv',
								placeholder:'123'
							},
							expirationDate:{
								selector:'#expiration-date',
								placeholder:'MM/YYYY'
							}
						}
					},(err,hostedFieldsInstance)=>{
						if(err){
							return {statusCode:500};
						}else{
							var analyzeForm=async(event)=>{
								event.preventDefault();
								let isFormValid=true;
								let hoistedFields=hostedFieldsInstance.getState().fields;
								Object.keys(hoistedFields).forEach((field)=>{
									if(!hoistedFields[field].isValid){
										isFormValid=false;
									}
								})

								if(!isFormValid){
									return {statusCode:400}
								}else{
									const userName=
									hostedFieldsInstance.tokenize({
										cardHolderName:document.getElementById("firstName").value
									},(err,payload)=>{
										if(err){
											return {statusCode:500};
										}else{
											generateTransactionToken(payload.nonce);
											return {statusCode:200};
										}
									})
								}
							}
						}
						form.addEventListener('submit', analyzeForm, false);
					})
				}
			})

		}else{
			return data.message;
		}
	}
*/
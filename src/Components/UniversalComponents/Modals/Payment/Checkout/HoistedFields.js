import React from "react";
import styled from "styled-components";
import {generateSessionToken} from "../../../../../Actions/Requests/Payment/TokenGeneration.js";

export const renderPaymentHoistedFields=async(generateTransactionToken)=>{
	let {confirmation,data}=await generateSessionToken();

	if(confirmation=="Success"){
		debugger;
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
										console.log(payload.nonce);
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
import React,{useState,createPortal,useEffect} from "react";
import styled from "styled-components";
import AlertSystem from "../../../../UniversalComponents/Skeletons/Alerts.js";
import {requestAccess} from "../../../../../Actions/Requests/ProfileRequests/Adapter/RequestAccess.js";

const RequestAccess=({closeRequestAccess,parentContainerId})=>{
	const [displayRequestAccessAlert,changeDisplayRequestAccessAlert]=useState(false);
	const [message,changeMessage]=useState();

	useEffect(()=>{
		const fetchData=async()=>{
			const {confirmation,data}=await requestAccess(document.getElementById("email").value);
			let requestedAccessMessage;
			if(confirmation=="Success"){
				requestedAccessMessage={
					header:"Request Access Success",
					description:"Thank you for requesting access to Atlesium. We will notify you when more spots are available. You should have recieved an email right now."
				}
			}else{
				const {message}=data;
				if(message.statusCode==401){
					requestedAccessMessage={
						header:"Request Access Error",
						description:"Email already taken."
					}
				}else{
					requestedAccessMessage={
						header:"Internal Server Error",
						description:"Unfortunately there has been an error on our part. Please try again later."
					}
				}
			}
			changeMessage(requestedAccessMessage);
			changeDisplayRequestAccessAlert(true);
		}
		fetchData();
	},[])

	return(
		<React.Fragment>
			{displayRequestAccessAlert==true&&(
				<AlertSystem
					closeModal={closeRequestAccess}
					targetDomId={parentContainerId}
					alertMessage={message}
				/>
			)}
		</React.Fragment>
	)
}

export default RequestAccess;
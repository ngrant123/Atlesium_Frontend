import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Introduction from "../LandingSubset/Introduction/index.js";
import SlidingWindow from "../LandingSubset/ScrollingWindow/index.js";
import ProfileCreation from "../LandingSubset/ProfileCreation/index.js";
import {LandingPageProvider} from "./LandingPageContext.js";

const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	padding:0px;
	display:flex;
	flex-direction:row;
`;

const PrimaryInformationContainer=styled.div`
	position:relative;
	height:100%;
	width:70%;
	display:flex;
	flex-direction:column;
	align-items:center;
	justify-content:center;
	padding:70px;

	@media screen and (max-width:1370px){
		width:90% !important;
	}

	@media screen and (max-width:650px){
		width:100% !important;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		width:100% !important;
    }
`;

const SlidingWindowContainer=styled.div`
	width:50%;
	@media screen and (max-width:650px){
		#scrollingWindow{
			display:none !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		#scrollingWindow{
			display:none !important;
		}
    }
`;

const Landing=({history})=>{
	const [displayProfileCreation,changeDisplayProfileCreation]=useState(false);
	const [userSpecifiedEmail,changeUserSpecifiedEmail]=useState();
	return(
		<LandingPageProvider
			value={{
				triggerDisplayProfileCreation:(userSubmittedEmail)=>{
					changeUserSpecifiedEmail(userSubmittedEmail);
					changeDisplayProfileCreation(true);
				},
				hideProfileCreation:()=>{
					changeDisplayProfileCreation(false);
				},
				parentContainerId:"landingPage",
				history
			}}
		>
			<Container id="landingPage">
				<PrimaryInformationContainer>
					{displayProfileCreation==false?
						<Introduction/>:
						<ProfileCreation
							userSpecifiedEmail={userSpecifiedEmail}
							parentContainerId={"landingPage"}
							history={history}
						/>
					}
				</PrimaryInformationContainer>
				<SlidingWindow/>
			</Container>
		</LandingPageProvider>
	)
}

export default Landing;
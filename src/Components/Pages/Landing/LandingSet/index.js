import React,{useState,useEffect} from "react";
import styled,{keyframes} from "styled-components";
import Introduction from "../LandingSubset/Introduction/index.js";
import SlidingWindow from "../LandingSubset/ScrollingWindow/index.js";
import ProfileCreation from "../LandingSubset/ProfileCreation/index.js";
import {LandingPageProvider} from "./LandingPageContext.js";
import COLOR_CONSTANTS from "../../../../Utils/ColorConstants.js";
import WeekendIcon from '@material-ui/icons/Weekend';
import {
	retrieveTotalProfiles
} from "../../../../Actions/Requests/ProfileRequests/Retrieval/MiscellaneousProfileInformation.js";

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
		width:100% !important;
	}

	@media screen and (max-width:650px){
		padding:20px;
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

const SeatsAvailableIndicator=styled.div`
	position:absolute;
	margin-left:40%;
	width:20%;
	height:10%;
	top:30;
	right:30;
	background-color:white;
	z-index:3;
	border-radius:5px;
	border-style:solid;
	border-width:2px;
	border-color:${COLOR_CONSTANTS.SUCCESS_ACTION_COLOR};
	display:flex;
	flex-direction:row;

	animation: glowing 1300ms infinite;

    @keyframes glowing {
	    0% { border-color: #D6C5F4; box-shadow: 0 0 5px ${COLOR_CONSTANTS.SUCCESS_ACTION_COLOR}; }
	    50% { border-color: #C8B0F4; box-shadow: 0 0 20px ${COLOR_CONSTANTS.SUCCESS_ACTION_COLOR}; }
	    100% { border-color: #B693F7; box-shadow: 0 0 5px ${COLOR_CONSTANTS.SUCCESS_ACTION_COLOR}; }
	}

	@media screen and (max-width:1370px){
		width:40%;
	}

	@media screen and (max-width:650px){
		display:none;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		display:none;
    }
`;


const VerticalLineCSS={
	position:"relative",
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"100%"
}

const CircularActivePeopleIconCSS={
	width:"28px",
	height:"28px",
	borderRadius:"50%",
	backgroundColor:COLOR_CONSTANTS.SUCCESS_ACTION_COLOR
}

const Landing=({history})=>{
	const [displayProfileCreation,changeDisplayProfileCreation]=useState(false);
	const [userSpecifiedEmail,changeUserSpecifiedEmail]=useState();
	const [totalSeatsRemaining,changeTotalSeatsRemaining]=useState(0);

	useEffect(()=>{
		const fetchTotalProfiles=async()=>{
			const {confirmation,data}=await retrieveTotalProfiles();
			if(confirmation=="Success"){
				const {message}=data;
				const seatsAvailable=250-message>=0?250-message:0;
				changeTotalSeatsRemaining(seatsAvailable);
			}
		}
		fetchTotalProfiles();
	},[]);

	const seatsAvailableModal=()=>{
		return(
			<SeatsAvailableIndicator>
				<div style={{width:"30%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
					<div style={CircularActivePeopleIconCSS}/>
				</div>
				<div style={VerticalLineCSS}/>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%",marginLeft:"2%"}}>
					<WeekendIcon style={{fontSize:"30"}}/>
					<p style={{marginTop:"5%",marginLeft:"5%",width:"100%"}}><b>{totalSeatsRemaining} </b> seats left</p>
				</div>
			</SeatsAvailableIndicator>
		)
	}
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
				history,
				totalSeatsRemaining
			}}
		>
			<Container id="landingPage">
				{seatsAvailableModal()}
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
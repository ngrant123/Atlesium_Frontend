import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Video from "../DetailsSubset/Video/index.js";
import Comments from "../DetailsSubset/Comments/index.js";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import {Link} from "react-router-dom";
import {
	retrieveReticanResponses
} from "../../../../Actions/Requests/ResponsesRequests/Retrieval/ResponseRetrieval.js";

import{
	retrieveResponseEligibleForResponses,
	retrieveReticanAndResponses
} from "../../../../Actions/Requests/ReticanRequests/Retrieval/ReticanRetrieval.js";
import LoadingAnimation from "../../../UniversalComponents/Loading/index.js";
import AlertSystem from "../../../UniversalComponents/Skeletons/Alerts.js";
import {useSelector} from "react-redux";
import {DetailsProvider} from "./DetailsContext.js";
import {
	deleteResponse
} from "../../../../Actions/Requests/ResponsesRequests/Adapter/EditResponses.js";

const Container=styled.div`
	position:absolute;
	width:100%;
	padding:0px;
	height:100%;
	display:flex;
	flex-direction:row;
	overflow-y:auto;
	align-items:center;
	padding:15%;
	padding-top:7%;
	margin-top:5%;

	@media screen and (max-width:1370px){
		flex-direction:column !important;
		height:auto;
		#verticalLine{
			display:none !important;
		}

		#mobileHorizontalLine{
			display:block !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		height:auto;
    }
`;

const VerticalLineCSS={
	position:"relative",
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"100%",
 	marginRight:"2%",
 	marginLeft:"2%"
}

const MobileHorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"10px",
	borderRadius:"5px",
	borderRadius:"5px",
	display:"none",
	borderColor:"#EBEBEB",
	display:"none"
}

const reticanVideos=[
	{
		_id:1234,
		comments:[
			{
				comment:"geagegg4sbr rhrsgsr jsrhrs srbhsrhrshrss srrsnrhrhrhrsb rssrvrsbrsbr"
			},
			{
				comment:"Yessir"
			}
		],
		commentType:"Text"
	},
	{
		_id:123333,
		comments:[
			{
				comment:"Test"
			},
			{
				comment:"Yessir"
			}
		],
		commentType:"Video"
	},
	{
		_id:123333,
		comments:[
			{
				comment:"Test"
			},
			{
				comment:"Yessir"
			}
		],
		commentType:"Video"
	}
]


/*	
	Thought process:
		Not all reticans have responses right?
		Create api that  retrieves one with responses 
			Populating the video url in the process and get the comments also 

		Then seperates
*/

const ReticanDetails=(props)=>{
	debugger;
	const [currentSelectedIndex,changeCurrentSelectedIndex]=useState(0);
	const [reticans,changeReticans]=useState([]);
	const [reticanSpecificResponses,changeReticanSpecificResponses]=useState([]);
	const [isLoading,changeIsLoadingStatus]=useState(true);
	const [initialLoadCompleted,changeInitialLoadCompleted]=useState(false);
	const [feedTrackerId,changeFeedTrackerId]=useState();
	const [displayResponseRetrievalAlertMessage,changeDisplayResponseRetrievalMessage]=useState(false);
	const [errorMessage,changeErrorMessage]=useState();
	const [isLoadingNextPosts,changeIsLoadingNextPosts]=useState(false);
	const [endOfPostIndicator,changeEndOfPostIndicator]=useState(false);

	const userId=useSelector(state=>state.personalInformation._id);

	const uuid=()=>{
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	useEffect(()=>{
		const {
			match:{
				params:{
					reticanOverviewId
				}
			}
		}=props;

		const fetchInitialData=async()=>{
			const trackerId=uuid();
			const {confirmation,data}=await retrieveResponseEligibleForResponses(
				userId,
				trackerId,
				reticanOverviewId
			);

			if(confirmation=="Success"){
				debugger;
				const {message}=data;
				console.log(message);
				const {
					responses
				}=message[0];

				changeReticanSpecificResponses(responses);
				changeReticans(message);
			}else{
				const {statusCode}=data;
				reticanResponsesErrorMessage(statusCode);
			}
			changeFeedTrackerId(trackerId);
			changeIsLoadingStatus(false);
			changeInitialLoadCompleted(true);
		}
		fetchInitialData();
	},[]);

	const reticanResponsesErrorMessage=(statusCode)=>{
		let currentErrorMessage;
		if(statusCode==500){
			currentErrorMessage={
				header:"Internal Server Error",
				description:"Unfortunately there has been an error on our part. Please try again later"
			}
		}else{
			currentErrorMessage={
				header:"Retican Respsonse Retrieval Error",
				description:"Unfortunately, an error has occured when retrieving this retican's responses. Please try again."
			}
		}
		changeErrorMessage(currentErrorMessage);
		changeDisplayResponseRetrievalMessage(true);
	}

	useEffect(()=>{
		if(initialLoadCompleted){	
			fetchReticanAndResponses();
		}

	},[currentSelectedIndex]);

	const fetchReticanAndResponses=async()=>{
		const trackerId=uuid();
		const {confirmation,data}=await retrieveReticanAndResponses({
			reticanId:reticans[currentSelectedIndex]._id.toString(),
			responsesType:reticans[currentSelectedIndex].reticanOptionType,
            feedTrackerId:trackerId,
            profileId:userId
		});

        if(confirmation=="Success"){
        	const {message}=data;
			const {
				responses,
				...reticanInformation
			}=message;
			const currentReticans=reticans;
			currentReticans[currentSelectedIndex]={...reticanInformation};
			changeReticans([...currentReticans]);
			changeReticanSpecificResponses(responses);
			changeIsLoadingStatus(false);
			changeFeedTrackerId(trackerId);

			changeIsLoadingNextPosts(false);
			changeEndOfPostIndicator(false);
        }else{
			const {statusCode}=data;
			reticanResponsesErrorMessage(statusCode);
        }
	}

	const fetchResponses=async()=>{
		const reticanResponseRetrievalInformation={
			ownerId:userId,
            reticanId:reticans[currentSelectedIndex]._id.toString(),
            feedTrackerId,
            responsesType:reticans[currentSelectedIndex].reticanOptionType
		}
		changeIsLoadingNextPosts(true);
		const {confirmation,data}=await retrieveReticanResponses(reticanResponseRetrievalInformation);

		if(confirmation=="Success"){
			const {message}=data;
			if(message.length==0){
				changeEndOfPostIndicator(true);
			}else{
				let currentReticanResponses=reticanSpecificResponses;
				const updatedReticanResposnes=currentReticanResponses.concat(message);
				changeReticanSpecificResponses([...updatedReticanResposnes]);
			}

		}else{
			const {statusCode}=data;
			reticanResponsesErrorMessage(statusCode);
		}
		changeIsLoadingNextPosts(false);
	}

	const triggerDeleteResponse=async(responseId)=>{
		const {confirmation,data}=await deleteResponse(
			responseId,
			reticans[currentSelectedIndex]._id);
		if(confirmation=="Success"){
			for(var i=0;i<reticanSpecificResponses.length;i++){
				if(responseId==reticanSpecificResponses[i]._id){
					reticanSpecificResponses.splice(i,1);
					break;
				}
			}
			changeReticanSpecificResponses([...reticanSpecificResponses]);
		}else{
			const {statusCode}=data;
			reticanResponsesErrorMessage(statusCode);
		}

	}

	const updateIndex=(selectedIndex)=>{
		changeIsLoadingStatus(true);
		changeCurrentSelectedIndex(selectedIndex);
	}

	const closeErrorAlertScreen=()=>{
		changeDisplayResponseRetrievalMessage(false);
	}

	const reticanRetrievalOverviewErrorModal=()=>{
		return(
			<React.Fragment>
				{displayResponseRetrievalAlertMessage==true &&(
			        <AlertSystem
						closeModal={closeErrorAlertScreen}
						targetDomId={"reticanDetails"}
						alertMessage={errorMessage}
			        />
				)}
			</React.Fragment>
		)
	}


	return(
		<DetailsProvider
			value={{
				triggerFetchResponses:()=>{
					fetchResponses();
				},
				deleteResponse:(responseId)=>{
					triggerDeleteResponse(responseId);
				},
				isLoadingNextPosts,
				endOfPostIndicator
			}}
		>
			<Container id="reticanDetails">
				{isLoading==true?
					<LoadingAnimation 
						loadingText={"Retrieving retican responses..."}
					/>:
					<React.Fragment>
						<div style={{position:"relative",display:"flex",flexDirection:"column",height:"100%",justifyContent:"space-between"}}>
							<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
								<Link to={{pathname:"/dashboard"}}>
									<ArrowBackIosRoundedIcon
										style={{fontSize:"18",marginTop:"-10px",color:"black"}}
									/>
								</Link>
								<p style={{fontSize:"18px",marginLeft:"4%"}}>
									<b>Retican Details</b>
								</p>
							</div>
							<Video
								triggerUpdatedSelectedIndex={updateIndex}
								currentSelectedIndex={currentSelectedIndex}
								totalReticans={reticans}
								currentSelectedReticanVideo={reticans[currentSelectedIndex].videoUrl}
							/>
						</div>
						<div id="verticalLine" style={VerticalLineCSS}/>
						<hr id="mobileHorizontalLine" style={MobileHorizontalLineCSS}/>
						<Comments
							responses={reticanSpecificResponses}
							responseType={reticans[currentSelectedIndex].reticanOptionType}
						/>
					</React.Fragment>
				}
			</Container>
		</DetailsProvider>
	)
}


export default ReticanDetails;
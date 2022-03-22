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
import {useSelector,useDispatch} from "react-redux";
import {DetailsProvider} from "./DetailsContext.js";
import {
	deleteResponse
} from "../../../../Actions/Requests/ResponsesRequests/Adapter/EditResponses.js";
import {tokensRegeneration} from "../../../../Actions/Tasks/UpdateTokens.js";
import Navigation from "../../../UniversalComponents/Navigation/PageNavigation/index.js";

const Container=styled.div`
	position:absolute;
	width:100%;
	padding:0px;
	height:100%;
	display:flex;
	flex-direction:row;
	@media screen and (max-width:1370px){
		flex-direction:column !important;
		height:auto;
		#verticalLine{
			display:none !important;
		}

		#mobileHorizontalLine{
			display:block !important;
		}

		#responsesContainer{
			flex-direction:column !important;
		}
		#reticanDetailsHeaderTitle{
			display:none !important;
		}
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		height:auto;
    }
`;

const ResponseContainerCSS={
	display:"flex",
	flexDirection:"column",
	width:"100%",
	height:"100%",
	padding:"5%",
	paddingTop:"7%"
}

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


const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"10px",
	borderRadius:"5px",
	borderRadius:"5px",
	borderColor:"#EBEBEB"
}
const MobileHorizontalLineCSS={
	...HorizontalLineCSS,
	display:"none"
}

const ReticanDetails=(props)=>{
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

	const {
		_id,
		accessToken,
		refreshToken
	}=useSelector(state=>state.personalInformation);
	const dispatch=useDispatch();

	const uuid=()=>{
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	useEffect(()=>{
		if(_id=="" || _id==null){
			props.history.push('/');
		}
	},[])

	useEffect(()=>{
		const {
			match:{
				params:{
					reticanOverviewId
				}
			}
		}=props;

		const fetchInitialData=async({updatedAccessToken})=>{
			const trackerId=uuid();
			const {confirmation,data}=await retrieveResponseEligibleForResponses(
				_id,
				trackerId,
				reticanOverviewId,
				updatedAccessToken==null?accessToken:updatedAccessToken
			);

			if(confirmation=="Success"){
				const {message}=data;
				if(message.length==0){
					changeReticanSpecificResponses([]);
					changeReticans([]);
				}else{
					const {
						responses
					}=message[0];

					changeReticanSpecificResponses(responses);
					changeReticans(message);
				}
			}else{
				const {statusCode}=data;
				reticanResponsesErrorMessage(statusCode,fetchInitialData);
			}
			changeFeedTrackerId(trackerId);
			changeIsLoadingStatus(false);
			changeInitialLoadCompleted(true);
		}
		fetchInitialData({});
	},[]);

	const reticanResponsesErrorMessage=(statusCode,parentApiTrigger)=>{
		let currentErrorMessage;
		if(statusCode==401){
			tokensRegeneration({
				currentRefreshToken:refreshToken,
				userId:_id,
				parentApiTrigger:parentApiTrigger,
				dispatch,
				parameters:{}
			})
		}else{
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
	}

	useEffect(()=>{
		if(initialLoadCompleted){	
			fetchReticanAndResponses({});
		}

	},[currentSelectedIndex]);

	const fetchReticanAndResponses=async({updatedAccessToken})=>{
		const trackerId=uuid();
		const {confirmation,data}=await retrieveReticanAndResponses({
			reticanId:reticans[currentSelectedIndex]._id.toString(),
			responsesType:reticans[currentSelectedIndex].reticanOptionType,
            feedTrackerId:trackerId,
            profileId:_id,
            accessToken:updatedAccessToken==null?accessToken:updatedAccessToken
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
			reticanResponsesErrorMessage(statusCode,fetchReticanAndResponses);
        }
	}

	const fetchResponses=async({updatedAccessToken})=>{
		const reticanResponseRetrievalInformation={
			ownerId:_id,
            reticanId:reticans[currentSelectedIndex]._id.toString(),
            feedTrackerId,
            responsesType:reticans[currentSelectedIndex].reticanOptionType,
            accessToken:updatedAccessToken==null?accessToken:updatedAccessToken
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
			reticanResponsesErrorMessage(statusCode,fetchResponses);
		}
		changeIsLoadingNextPosts(false);
	}

	const triggerDeleteResponse=async({responseId,updatedAccessToken})=>{
		const {confirmation,data}=await deleteResponse(
			responseId,
			reticans[currentSelectedIndex]._id,
			_id,
			updatedAccessToken==null?accessToken:updatedAccessToken);
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
			reticanResponsesErrorMessage(statusCode,triggerDeleteResponse);
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
					fetchResponses({});
				},
				deleteResponse:(responseId)=>{
					triggerDeleteResponse({responseId});
				},
				isLoadingNextPosts,
				endOfPostIndicator
			}}
		>
			<Container id="reticanDetails">
				<Navigation
					pageType={"reticanDetails"}
					parentDiv={"reticanDetails"}
				/>
				<div style={{display:"flex",flexDirection:"column",width:"100%",height:"100%",padding:"5%",paddingTop:"7%"}}>
					{isLoading==true?
						<LoadingAnimation 
							loadingText={"Retrieving retican responses..."}
						/>:
						<React.Fragment>
							<p id="reticanDetailsHeaderTitle" style={{fontSize:"18px"}}>
								<b>Retican Details</b>
							</p>
							<div id="responsesContainer" 
								style={{position:"relative",display:"flex",flexDirection:"row",height:"100%",width:"100%",marginTop:"5%"}}>
								{reticans.length==0?
									<p>No retican responses</p>:
									<React.Fragment>
										<Video
											triggerUpdatedSelectedIndex={updateIndex}
											currentSelectedIndex={currentSelectedIndex}
											totalReticans={reticans}
											currentSelectedReticanVideo={reticans[currentSelectedIndex].videoUrl}
										/>
										<div id="verticalLine" style={VerticalLineCSS}/>
										<hr id="mobileHorizontalLine" style={MobileHorizontalLineCSS}/>
										<Comments
											responses={reticanSpecificResponses}
											responseType={reticans[currentSelectedIndex].reticanOptionType}
										/>
									</React.Fragment>
								}
							</div>
						</React.Fragment>
					}
				</div>
			</Container>
		</DetailsProvider>
	)
}


export default ReticanDetails;
import React,{useState,useRef,useEffect,useContext} from "react";
import styled,{keyframes} from "styled-components";
import TestImahge from "../../../../../../Assets/LandingPageSpecific/scrollingWindowBlock_1.png";
import TimelineIcon from '@material-ui/icons/Timeline';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import CodeIcon from '@material-ui/icons/Code';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import COLOR_CONSTANTS from "../../../../../../Utils/ColorConstants.js";
import DeleteRetican from "../../../../../UniversalComponents/Skeletons/CallToActionSkeleton.js";
import {deleteReticanOverview} from "../../../../../../Actions/Requests/ReticanRequests/Adapter/DeleteRetican.js";
import ErrorAlertSystem from "../../../../../UniversalComponents/Skeletons/Alerts.js";
import {useSelector,useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {tokensRegeneration} from "../../../../../../Actions/Tasks/UpdateTokens.js";
import {ReticanContext} from "../../../DashboardSet/ReticanContext.js";
import VideoLoadingPrompt from "../../../../../UniversalComponents/Loading/VideoLoadingPrompt.js";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

const ReticanContainer=styled.div`
	position:absolute;
	width:95%;
	background-color:white;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#E8E8E8;
	display:flex;
	flex-direction:row;
	padding:5%;

	@media screen and (max-width:1370px){
		#reticanOption{
			width:40px !important;
			height:35px !important;
		}
	}

	@media screen and (max-width:650px){
		border-style:none;
		#reticanOptions{
			flex-direction:column !important;
			width:100% !important;
		}
		#deleteButton{
			width:100% !important;
			margin-left:0% !important;
			height:50px !important;
		}

		#verticalLineCSS{
			margin-left:5% !important;
			mragin-right:5% !important;
		}

		#specificReticanOptions{
			justify-content:space-between !important;
			margin-bottom:2% !important;
		}

		#retican{
			justify-content:start !important;
			align-items:start !important;
		}

		#videoElement{
			width:100% !important;
		}

		#activeStatus{
			display:none !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){

		#videoElement{
			width:100% !important;
			height:100% !important;
		}
    }
`;

const ActiveStatusCSS={
	width:"28px",
	height:"28px",
	borderRadius:"50%",
	backgroundColor:"#00FF00"
}


const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
}

const DeleteButtonCSS={
	display:"flex",
	justifyContent:"center",
	alignItems:"center",
	color:"white",
	backgroundColor:COLOR_CONSTANTS.CALL_TO_ACTION_COLOR,
	width:"30%",
	borderRadius:"5px",
	cursor:"pointer",
	marginLeft:"40%"
}


const ReticanOptionButtonCSS={
	width:"50px",
	height:"50px",
	padding:"20px",
	display:"flex",
	justifyContent:"center",
	alignItems:"center",
	borderRadius:"5px",
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:COLOR_CONSTANTS.GREY,
	cursor:"pointer"
}

const VerticalLineCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"50px",
 	marginRight:"15%",
 	marginLeft:"15%"
}

const ReticanCSS={
	position:"relative",
	display:"flex",
	flexDirection:"column",
	justifyContent:"center",
	width:"100%",
	height:"100%",
	alignItems:"center"
}



const ReticanDisplay=(props)=>{
	const {
		reticanInformation,
		currentIndex,
		removeTargetedIndexRetican,
		deleteRetican
	}=props;

	const urlHeader=process.env.NODE_ENV=='production'?
					"https://v1.atlesium.com/retrieveInitialReticanFile":
					"http://localhost:4002";

	const miscroserviceDispatchConnection=`${urlHeader}/retrieveInitialReticanFile?reticanOverviewId=${reticanInformation._id}&targetDivId=landingPage`;
	const script=`<script>
		const app=document.getElementById("landingPage");
	   	if(app!=null){
	        let xhr = new XMLHttpRequest();
	        xhr.open('get', '${miscroserviceDispatchConnection}');
	        xhr.send();

	        xhr.onload = function() {
	            const prospective=document.createElement('div');

	            prospective.innerHTML=xhr.response;
	            prospective.id="atlesium_div";
	            app.after(prospective);

	            var s = document.createElement('script');
	            s.innerHTML =document.getElementById("atlesium_script").innerHTML;
	            document.getElementById("atlesium_script").parentNode.appendChild(s);
	            document.getElementById("atlesium_script").parentNode.removeChild(document.getElementById("atlesium_script"));
	        };
	    }
	</script>`;

	const [displayDeleteReticanModal,changeDeleteReticanModal]=useState(false);
	const [displayErrorAlertModal,changeErrorAlertModal]=useState(false);
	const [displayScriptTag,changeDisplayScriptTag]=useState(false);
	const [errorMessage,changeErrorMessage]=useState();
	const {
		_id,
		accessToken,
		refreshToken
	}=useSelector(state=>state.personalInformation);
	const [isMobile,changeIsMobileStatus]=useState(false);
	const dispatch=useDispatch();
	const reticanConsumer=useContext(ReticanContext);

	const reticanRef=useRef();
	let dynamicStyles;

	const uuid=()=>{
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	const triggerUIChange=()=>{
		if(window.innerWidth<1370){
			changeIsMobileStatus(true)
		}else{
			changeIsMobileStatus(false);
		}
	}

	useEffect(()=>{
		triggerUIChange();
		window.addEventListener('resize', triggerUIChange)
	},[window.innerWidth]);

	useEffect(()=>{
		const {animationIndicator}=reticanInformation;
		const uniqueId=uuid();
		if(animationIndicator==true){
			setTimeout(()=>{
				poppedFromStackAnimation(uniqueId);
				reticanRef.current.style.animation= `${'poppedOffStackAnimation'+uniqueId} 1s ease-in-out 0s forwards`;
			},1000);
		}else{
			if(currentIndex==0){
				reticanRef.current.style.display="block";
				reticanRef.current.style.marginLeft=isMobile?"0px":"-20px";
				reticanRef.current.style.marginTop="-20px";
				reticanRef.current.style.zIndex=10+(0-currentIndex);

			}else if(currentIndex==1){
				reticanRef.current.style.display=isMobile?"none":"block";
				reticanRef.current.style.zIndex=10+(0-currentIndex);
			}
			reticanRef.current.style.animation='none';
		}
	})



	const poppedFromStackAnimation=(uniqueId)=>{
		const animationKeyFrame=
		`@keyframes ${'poppedOffStackAnimation'+uniqueId} {
		    0% {
		    	left:0%;
		    	top:0%;
		    }
		    95%{
		    	opacity:1%;
		    }
		    100%{
		    	opacity:0%;
		    	transform: rotate(45deg);
		    	left:-60%;
		    	top:-60%;
		    }
		}`;
		if(!dynamicStyles){
			dynamicStyles = document.createElement('style');
			dynamicStyles.type = 'text/css';
			document.head.appendChild(dynamicStyles);
		}
	  
	  dynamicStyles.sheet.insertRule(animationKeyFrame, dynamicStyles.length);
	}

	const initiateDeleteReticanOverview=async({updatedAccessToken})=>{
		const {confirmation,data}=await deleteReticanOverview(
											reticanInformation._id,
											_id,
											updatedAccessToken==null?accessToken:updatedAccessToken);
		if(confirmation=="Success"){
			deleteRetican(currentIndex);
			closeModal();
		}else{
			const {statusCode}=data;
			let deleteReticanErrorMessage;

			if(statusCode==401){
				tokensRegeneration({
					currentRefreshToken:refreshToken,
					userId:_id,
					parentApiTrigger:initiateDeleteReticanOverview,
					dispatch,
					parameters:{}
				})
			}else{
				if(statusCode==500){
					deleteReticanErrorMessage={
						header:"Internal Server Error",
						description:"Unfortunately there has been an error on our part. Please try again later"
					}
				}else{
					deleteReticanErrorMessage={
						header:"Retican Deletion Error",
	            		description:"Unfortunately, there has been an error when deleting this retican. Please try again."
					}
				}
				changeErrorMessage(deleteReticanErrorMessage);
				changeErrorAlertModal(true);
			}
		}
	}

	const closeErrorAlertScreen=()=>{
		changeErrorAlertModal(false);
	}

	const errorAlertModal=()=>{
		return(
			<React.Fragment>
				{displayErrorAlertModal==true &&(
					<ErrorAlertSystem
						closeModal={closeErrorAlertScreen}
						targetDomId={"dashboard"}
						alertMessage={errorMessage}
					/>
				)}
			</React.Fragment>
		)
	}

	const deleteReticanOptions=()=>{
		return(
			<React.Fragment>
				<div style={{width:"100%",display:"flex",justifyContent:"center"}}>
					<p>
						<b>Are you sure you want to delete this retican?</b>
					</p>
				</div>
				<hr style={HorizontalLineCSS}/>
				<div style={{...DeleteButtonCSS,width:"100%",marginLeft:"0%",padding:"5%"}} 
					onClick={()=>initiateDeleteReticanOverview({})}>
					Delete
				</div>
			</React.Fragment>
		)	
	}

	const closeModal=()=>{
		changeDeleteReticanModal(false);
	}

	const deleteReticanModal=()=>{
		return(
			<React.Fragment>
				{displayDeleteReticanModal==true &&(
					<DeleteRetican
						component={deleteReticanOptions()}
						closeModal={closeModal}
						targetDom={"dashboard"}
					/>
				)}
			</React.Fragment>
		)
	}

	/*
		<Link to={{pathname:`/reticanDetails/${data.primaryReticanCard._id}`}}>
		<Link to={{pathname:`/creation/${reticanInformation.primaryReticanCard._id}`}}>
	*/


	return(
		<React.Fragment>
			{deleteReticanModal()}
			{errorAlertModal()}
			<ReticanContainer ref={reticanRef}
				onAnimationEnd={() => removeTargetedIndexRetican(currentIndex)}>
				{displayScriptTag==true?
					<div>
						<ArrowBackIosRoundedIcon 
							onClick={()=>changeDisplayScriptTag(false)}
							style={{fontSize:24,cursor:"pointer"}}
						/>
						<hr/>
						<p>{script}</p>
					</div>:
					<div id="retican" style={ReticanCSS}>

						<VideoLoadingPrompt
							videoElement={
								<video id={"videoElement"+reticanInformation.primaryReticanCard._id}
									key={uuid()}
									style={{borderRadius:"5px",backgroundColor:"#151515"}}
									width="75%" height="40%" borderRadius="50%"
									autoPlay loop autoBuffer playsInline muted>
									<source src={reticanInformation.primaryReticanCard.videoUrl}
										type="video/mp4"/>
								</video>
							}
							videoId={"videoElement"+reticanInformation.primaryReticanCard._id}
						/>

						<div style={{marginTop:"5%",display:"flex",flexDirection:"row",width:"75%",justifyContent:"space-between"}}>
							<div style={{display:"flex",flexDirection:"column"}}>
								<p style={{fontSize:"24px"}}>
									<b>{reticanInformation.title}</b>
								</p>
								<p style={{fontSize:"18px"}}>{reticanInformation.description}</p>
							</div>
							<div style={{display:"flex",flexDirection:"column"}}>
								<div id="activeStatus" style={ActiveStatusCSS}/>
								<hr style={HorizontalLineCSS}/>
								<CodeIcon
									onClick={()=>changeDisplayScriptTag(true)}
									style={{fontSize:"24",cursor:"pointer"}}
								/>
							</div>
						</div>

						<hr style={HorizontalLineCSS}/>
						<div id="reticanOptions"
							style={{display:"flex",flexDirection:"row",width:"80%",justifyContent:"space-between",marginTop:"10%"}}>
							<div id="specificReticanOptions" style={{display:"flex",flexDirection:"row"}}>
								<div id="reticanOption" style={ReticanOptionButtonCSS}>
									<TimelineIcon
										style={{fontSize:"24"}}
									/>
								</div>

								<div id="verticalLineCSS" style={VerticalLineCSS}/>

								<div id="reticanOption" style={ReticanOptionButtonCSS}
									onClick={()=>reticanConsumer.history.push(`/reticanDetails/${reticanInformation._id}`)}>
									<ChatBubbleOutlineIcon
										style={{fontSize:"24"}}
									/>
								</div>

								<div id="verticalLineCSS" style={VerticalLineCSS}/>

								<div id="reticanOption" style={ReticanOptionButtonCSS} 
									onClick={()=>reticanConsumer.history.push(`/creation/${reticanInformation._id}`)}>
									<BorderColorIcon
										style={{fontSize:"24"}}
									/>
								</div>
							</div>

							<div id="deleteButton" style={DeleteButtonCSS} onClick={()=>changeDeleteReticanModal(true)}>
								Delete
							</div>
						</div>
					</div>
				}

			</ReticanContainer>
		</React.Fragment>
	)
}

export default ReticanDisplay;
import React,{useState,useRef,useEffect} from "react";
import styled,{keyframes} from "styled-components";
import TestImahge from "../../../../../../Assets/LandingPageSpecific/scrollingWindowBlock_1.png";
import TimelineIcon from '@material-ui/icons/Timeline';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import COLOR_CONSTANTS from "../../../../../../Utils/ColorConstants.js";
import DeleteRetican from "../../../../../UniversalComponents/Skeletons/CallToActionSkeleton.js";
import {deleteReticanOverview} from "../../../../../../Actions/Requests/ReticanRequests/Adapter/DeleteRetican.js";
import ErrorAlertSystem from "../../../../../UniversalComponents/Skeletons/Alerts.js";
import {useSelector} from "react-redux";


const Campaign=styled.div`
	position:absolute;
	width:95%;
	height:100%;
	background-color:white;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#E8E8E8;
	display:flex;
	flex-direction:row;
	padding:5%;
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
	cursor:"pointer"
}


const ReticanOptionButtonCSS={
	padding:"20%",
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



const CampaignDisplay=(props)=>{
	const {
		campaignInformation,
		currentIndex,
		removeTargetedIndexCampaign,
		deleteCampaign
	}=props;

	const [displayDeleteReticanModal,changeDeleteReticanModal]=useState(false);
	const [displayErrorAlertModal,changeErrorAlertModal]=useState(false);
	const [errorMessage,changeErrorMessage]=useState();
	const userId=useSelector(state=>state.personalInformation._id);

	const campaignRef=useRef();
	let dynamicStyles;

	const uuid=()=>{
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	useEffect(()=>{
		const {animationIndicator}=campaignInformation;
		const uniqueId=uuid();
		debugger;
		if(animationIndicator==true){
			setTimeout(()=>{
				poppedFromStackAnimation(uniqueId);
				campaignRef.current.style.animation= `${'poppedOffStackAnimation'+uniqueId} 1s ease-in-out 0s forwards`;
			},1000);
		}else{
			if(currentIndex==0){
				campaignRef.current.style.display="block";
				campaignRef.current.style.marginLeft="-20px";
				campaignRef.current.style.marginTop="-20px";
				campaignRef.current.style.zIndex=10+(0-currentIndex);

			}else if(currentIndex==1){
				campaignRef.current.style.display="block";
				campaignRef.current.style.zIndex=10+(0-currentIndex);
			}
			campaignRef.current.style.animation='none';
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

	const initiateDeleteReticanOverview=async()=>{
		debugger;
		const {confirmation,data}=await deleteReticanOverview(campaignInformation._id,userId);
		if(confirmation=="Success"){
			deleteCampaign(currentIndex);
		}else{
			const {statusCode}=data;
			let deleteReticanErrorMessage;
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
				<div style={{...DeleteButtonCSS,padding:"5%"}} onClick={()=>initiateDeleteReticanOverview()}>
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
	*/


	return(
		<React.Fragment>
			{deleteReticanModal()}
			{errorAlertModal()}
			<Campaign ref={campaignRef}
				onAnimationEnd={() => removeTargetedIndexCampaign(currentIndex)}>
				<div style={{display:"flex",flexDirection:"column",justifyContent:"center",width:"100%",height:"100%",alignItems:"center"}}>

					<video id="videoElement"
						key={uuid()}
						style={{borderRadius:"5px",backgroundColor:"#151515"}}
						width="75%" height="40%" borderRadius="50%"
						autoPlay loop autoBuffer playsInline muted>
						<source src={campaignInformation.primaryReticanCard.videoUrl}
							type="video/mp4"/>
					</video>

					<div style={{marginTop:"5%",display:"flex",flexDirection:"row",width:"75%",justifyContent:"space-between"}}>
						<div style={{display:"flex",flexDirection:"column"}}>
							<p style={{fontSize:"24px"}}>
								<b>{campaignInformation.title}</b>
							</p>
							<p style={{fontSize:"18px"}}>{campaignInformation.description}</p>
						</div>
						<div style={ActiveStatusCSS}/>
					</div>

					<hr style={HorizontalLineCSS}/>
					<div style={{display:"flex",flexDirection:"row",width:"80%",justifyContent:"space-between",marginTop:"10%"}}>
						<div style={{display:"flex",flexDirection:"row"}}>
							<div style={ReticanOptionButtonCSS}>
								<TimelineIcon
									style={{fontSize:"24"}}
								/>
							</div>

							<div style={VerticalLineCSS}/>

							<div style={ReticanOptionButtonCSS}>
								<ChatBubbleOutlineIcon
									style={{fontSize:"24"}}
								/>
							</div>

							<div style={VerticalLineCSS}/>

							<div style={ReticanOptionButtonCSS}>
								<BorderColorIcon
									style={{fontSize:"24"}}
								/>
							</div>
						</div>

						<div style={DeleteButtonCSS} onClick={()=>changeDeleteReticanModal(true)}>
							Delete
						</div>
					</div>
				</div>

			</Campaign>
		</React.Fragment>
	)
}

export default CampaignDisplay;
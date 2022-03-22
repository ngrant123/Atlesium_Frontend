import React,{useState} from "react";
import styled from "styled-components";
import OnboardingSkeleton from "../Skeletons/OnboardingSkeleton.js";
import COLOR_CONSTANTS from "../../../Utils/ColorConstants.js";
import CameraFrontIcon from '@material-ui/icons/CameraFront';
import IntroductoryDemoReticanOnboarding from "../../../Assets/Onboarding/IntroductoryReticanOnboarding.png";
import GeneralDemoReticanOnboarding from "../../../Assets/Onboarding/GeneralReticanOnboarding.png";
import VideoDemoReticanOnboarding from "../../../Assets/Onboarding/VideoReticanOnboarding.png";
import TextDemoReticanOnboarding from "../../../Assets/Onboarding/TextReticanOnboarding.png";
import {
	updateReticanOnboardingViewedStatus
} from "../../../Actions/Requests/ProfileRequests/Adapter/OnboardingStatusEdit.js";

const Container=styled.div`
	@media screen and (max-width:1370px){
		#reticanDemoImage{
			width:60% !important;
			height:30% !important;
		}
	}


	@media screen and (max-width:650px){
		#reticanDemoImage{
			width:250px !important;
			height:230px !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		#reticanDemoImage{
			width:40% !important;
			height:40% !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		#reticanDemoImage{
			width:40% !important;
			height:60% !important;
		}
    }

`;

const OnboardingHeader=styled.div`
	display:flex;
	flex-direction:row;
	justify-contentspace-between;
	margin-top:2%;

	@media screen and (max-width:650px){
		flex-direction:column-reverse;

		#reticanExampleButton{
			margin-bottom:5% !important;
		}
	}
`;

const OnboardingButtonCSS={
	padding:"3%",
	borderRadius:"5px",
	borderStyle:"solid",
	marginTop:"2%",
	borderWidth:"1px",
	borderColor:COLOR_CONSTANTS.PRIMARY_COLOR,
	display:"flex",
	justifyContent:"center",
	alignItems:"center",
	color:COLOR_CONSTANTS.PRIMARY_COLOR,
	cursor:"pointer"
}

const ViewReticanExampleButtonCSS={
	padding:"2%",
	borderRadius:"5px",
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:COLOR_CONSTANTS.GREY,
	display:"flex",
	justifyContent:"center",
	alignItems:"center",
	flexDirection:"row",
	cursor:"pointer",
	color:COLOR_CONSTANTS.BLACK
}

const ReticanOnboarding=({closeModal,targetDom,profileId})=>{
	const [currentComponent,changeCurrentComponent]=useState("Initial");
	const [displayReticanDemoDisplay,changeDisplayReticanDemoDisplay]=useState(false);

	const triggerCloseOnboardingModal=()=>{
		updateReticanOnboardingViewedStatus(profileId,true);
		closeModal();
	}


	const reticanDisplayExample=()=>{
		let reticanDemoImage;
		switch(currentComponent){
			case "Introductory Retican":{
				reticanDemoImage=IntroductoryDemoReticanOnboarding;
				break;
			}

			case "Text Response Retican":{
				reticanDemoImage=TextDemoReticanOnboarding;
				break;
			}

			case "Video Response Retican":{
				reticanDemoImage=VideoDemoReticanOnboarding;
				break;
			}

			case "General Retican":{
				reticanDemoImage=GeneralDemoReticanOnboarding;
				break;
			}
		}

		return(
			<React.Fragment>
				<div style={{...OnboardingButtonCSS,marginBottom:"2%",width:"30%"}} 
					onClick={()=>changeDisplayReticanDemoDisplay(false)}>
					Back
				</div>
				<img id="reticanDemoImage" src={reticanDemoImage} style={{borderRadius:"5px",width:"60%",height:"65%"}}/>
			</React.Fragment>
		)
	}

	const onboardingHeader=()=>{
		return(
			<React.Fragment>
				<OnboardingHeader>
					<p style={{fontSize:"24px"}}>
						<b>{currentComponent}</b>
					</p>

					<div id="reticanExampleButton" style={ViewReticanExampleButtonCSS} 
						onClick={()=>changeDisplayReticanDemoDisplay(true)}>
						<CameraFrontIcon
							style={{fontSize:"24"}}
						/>
						<p style={{marginTop:"3%"}}>View Retican Example</p>
					</div>
				</OnboardingHeader>
				<hr/>
			</React.Fragment>
		)
	}

	const GeneralRetican=()=>{
		return(
			<React.Fragment>
				{onboardingHeader()}
				<p>
					Last but not least is the general retican. The general retican gives you the oppurtunity 
					to express yourself freely. Unlike the previous reticans, the general retican can be 
					used for a variety of things but more often than not an announcement video. 
				</p>

				<br/>

				<p>
					For example, you can have a general retican personally introducing yourself or just 
					have one making an announcement about your website.
				</p>

				<div style={{display:"flex",flexDirection:"row",marginTop:"2%"}}>
					<div style={OnboardingButtonCSS} onClick={()=>changeCurrentComponent("Text Response Retican")}>
						Previous
					</div>
					<div style={{...OnboardingButtonCSS,marginLeft:"2%"}}
						onClick={()=>triggerCloseOnboardingModal()}>
						Close
					</div>

				</div>
			</React.Fragment>
		)
	}

	const TextReticanOnboarding=()=>{
		return(
			<React.Fragment>
				{onboardingHeader()}
				<p>
					The video response retican gives your viewers the oppurtunity to express themselves to you. 
					Here people will have the chance to upload video response to your video retican.
				</p>

				<div style={{display:"flex",flexDirection:"row",marginTop:"2%"}}>
					<div style={OnboardingButtonCSS} onClick={()=>changeCurrentComponent("Video Response Retican")}>
						Previous
					</div>
					<div style={{...OnboardingButtonCSS,marginLeft:"2%"}}
						onClick={()=>changeCurrentComponent("General Retican")}>
						Next
					</div>

				</div>
			</React.Fragment>
		)
	}

	const VideoReticanOnboarding=()=>{
		return(
			<React.Fragment>
				{onboardingHeader()}
				<p>
					The video response retican gives your viewers the oppurtunity to express themselves to you. 
					Here people will have the chance to upload video response to your video retican.
				</p>

				<br/>

				<p>
					For example, lets say you have a video response retican asking people to send you a reaction 
					of your website. People will be to send you their reactions and you can view their responses here.
				</p>

				<div style={{display:"flex",flexDirection:"row",marginTop:"2%"}}>
					<div style={OnboardingButtonCSS} onClick={()=>changeCurrentComponent("Introductory Retican")}>
						Previous
					</div>
					<div style={{...OnboardingButtonCSS,marginLeft:"2%"}}
						onClick={()=>changeCurrentComponent("Text Response Retican")}>
						Next
					</div>

				</div>
			</React.Fragment>
		)
	}
	
	const IntroductoryReticanOnboarding=()=>{
		return(
			<React.Fragment>
				{onboardingHeader()}
				<p>
					The main goal for the introductory retican is for it to be something gives you the 
					oppurtunity to introduce yourself to your visitor. This is why it is front and certain 
					in your website.
				</p>

				<br/>

				<p>
					Based on its design, the introductory retican is required to be the first retican in your 
					list. For example, you can not have a video response retican followed by an introductory retican. 
					The introductory retican has to be first always.
				</p>

				<div style={{display:"flex",flexDirection:"row",marginTop:"2%"}}>
					<div style={OnboardingButtonCSS} onClick={()=>changeCurrentComponent("Initial")}>
						Previous
					</div>
					<div style={{...OnboardingButtonCSS,marginLeft:"2%"}}
						onClick={()=>changeCurrentComponent("Video Response Retican")}>
						Next
					</div>

				</div>
			</React.Fragment>
		)
	}

	const InitialReticanOnboarding=()=>{
		return(
			<React.Fragment>
				<p style={{fontSize:"24px"}}>
					<b>Reticans</b>
				</p>

				<div style={{fontSize:"16px"}}>
					<p>
						Reticans are the building blocks for atlesium. So for there are four reticans available:
					</p>
					<hr/>
					<b>
						<ul>
							<li>
								Introductory Retican
							</li>

							<li>
								Video Response
							</li>

							<li>
								Text Response
							</li>

							<li>
								General
							</li>

						</ul>
					</b>

					<p>
						In the next onboarding screens we will describe what each of these retican do. 
					</p>

					<div style={{display:"flex",flexDirection:"row",marginTop:"2%"}}>
						<div style={OnboardingButtonCSS} onClick={()=>triggerCloseOnboardingModal()}>
							Close
						</div>
						<div style={{...OnboardingButtonCSS,marginLeft:"2%"}}
							onClick={()=>changeCurrentComponent("Introductory Retican")}>
							Next
						</div>

					</div>
				</div>
			</React.Fragment>
		)
	}

	const OnboardingDecider=({children,componentName})=>{
		return children.filter(data=>componentName==data.props.componentName);
	}

	const onboarding=()=>{
		return(
			<Container>
				{displayReticanDemoDisplay==true?
					<>{reticanDisplayExample()}</>:
					<OnboardingDecider componentName={currentComponent}>
						<InitialReticanOnboarding componentName="Initial"/>
						<IntroductoryReticanOnboarding componentName="Introductory Retican"/>
						<VideoReticanOnboarding componentName="Video Response Retican"/>
						<TextReticanOnboarding componentName="Text Response Retican"/>
						<GeneralRetican componentName="General Retican"/>
					</OnboardingDecider>
				}
			</Container>
		)
	}

	return(
		<OnboardingSkeleton
			closeModal={triggerCloseOnboardingModal}
			targetDom={targetDom}
			component={onboarding()}
		/>
	)
}

export default ReticanOnboarding;
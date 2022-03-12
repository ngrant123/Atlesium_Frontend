import React,{useState} from "react";
import styled from "styled-components";
import OnboardingSkeleton from "../Skeletons/OnboardingSkeleton.js";
import COLOR_CONSTANTS from "../../../Utils/ColorConstants.js";
import {
	updateDashboardOnboardingViewedStatus
} from "../../../Actions/Requests/ProfileRequests/Adapter/OnboardingStatusEdit.js";

const InitialWelcomeScreenCSS={
	width:"100%",
	height:"80%",
	display:"flex",
	justifyContent:"center",
	alignItems:"center",
	flexDirection:"column"
}

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


const InitialDashboardOnboarding=({closeModal,targetDom,profileId})=>{
	const [displayInitialWelcomeScreen,changeDisplayInitialWelcomeScreen]=useState(true);

	const triggerCloseOnboardingModal=async()=>{
		updateDashboardOnboardingViewedStatus(profileId,true);
		closeModal();
	}
	const onboarding=()=>{
		return(
			<React.Fragment>
				{displayInitialWelcomeScreen==true?
					<div style={InitialWelcomeScreenCSS}>
						<p style={{fontSize:"18px"}}>
							<b>Welcome To Atlesium</b>
						</p>

						<div style={OnboardingButtonCSS} onClick={()=>changeDisplayInitialWelcomeScreen(false)}>
							 Start Onboarding
						</div>
					</div>:
					<div>
						<p style={{fontSize:"24px"}}>
							<b>Dashboard</b>
						</p>
						<p style={{fontSize:"16px"}}>
							The main goal of the dashboard is to show you your reticans that you have created.
						</p>
						<hr/>
						<p style={{fontSize:"16px"}}>
							If you are on the desktop you will see a navigation bar (top left on mobile)
							that contains: 
							<b>
								Analytics, 
								Settings, 
								Dashboard, 
								and Creation.
							</b>
						</p>
						<hr/>
						<p style={{fontSize:"16px"}}>
							Each of those are self explanatory but if you want to know more about reticans 
							then click on the creation button to view the retican onboarding screen.
						</p>

						<div style={{display:"flex",flexDirection:"row",marginTop:"2%"}}>
							<div style={OnboardingButtonCSS} onClick={()=>changeDisplayInitialWelcomeScreen(true)}>
								Previous
							</div>

							<div style={{...OnboardingButtonCSS,marginLeft:"2%"}} onClick={()=>triggerCloseOnboardingModal()}>
								Close
							</div>
						</div>
					</div>
				}
			</React.Fragment>
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

export default InitialDashboardOnboarding;
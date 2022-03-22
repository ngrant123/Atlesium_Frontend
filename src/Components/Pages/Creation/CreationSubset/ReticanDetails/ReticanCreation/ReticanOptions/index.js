import React,{useState,useEffect,useContext} from "react";
import styled from "styled-components";
import VideoCreation from "../VideoCreation.js";
import GeneralRetican from "./GeneralRetican.js";
import IntroductoryRetican from "./IntroductoryRetican.js";
import TextResponseRetican from "./TextResponse.js";
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import VideoResponseRetican from "./VideoResponse.js";
import Color_Constants from "../../../../../../../Utils/ColorConstants.js";
import {ReticanCreationContext} from "../ReticanCreationContext.js";
import VideoLoadingPrompt from "../../../../../../UniversalComponents/Loading/VideoLoadingPrompt.js";

const Container=styled.div`
	@media screen and (max-width:1370px){
		#videoElement{
			height:200px !important;
			width:90% !important;
		}

		#finalStageVideoCreation{
			flex-direction:column !important;
		}
	}
`;

const VideoOptionsCSS={
	width:"35px",
	height:"35px",
	borderRadius:"50%",
	backgroundColor:"white",
	boxShadow:"1px 1px 5px #6e6e6e",
	transition:".8s",
	display:"flex",
	justifyContent:"center",
	alignItems:"center",
	cursor:"pointer"
}


const ButtonCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	padding:"10px",
	color:Color_Constants.PRIMARY_COLOR,
	height:"60px",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:Color_Constants.PRIMARY_COLOR,
	cursor:"pointer",
	display:"flex",
	flexDirection:"row",
	justifyContent:"center",	
	alignItems:"center",
	borderRadius:"5px",
	marginTop:"5%",
	marginRight:"2%",
	marginBottom:"2%"
}


const ReticanOptions=({reticanOptionType,reticanInformation,displayInitialReticanScreen})=>{
	const reticanCreationConsumer=useContext(ReticanCreationContext);
	const [displayMobileUI,changeDisplayMobileUI]=useState(false);

	const triggerUIChange=()=>{
		if(window.innerWidth<1370){
			changeDisplayMobileUI(true); 
		}else{
			changeDisplayMobileUI(false);
		}
	}

	useEffect(()=>{
		triggerUIChange();
		window.addEventListener('resize', triggerUIChange)
	},[window.innerWidth]);


	let [currentRetican,changeCurrentRetican]=useState(reticanInformation);
	const ReticanOptionsModals=({children,currentSelectedReticanType})=>{
		return children.filter(reticanUploadOption=> reticanUploadOption.props.optionType==currentSelectedReticanType);
	}

	const displaySelectedReticanOptionType=(videoUrl,videoUrlSize)=>{
		changeCurrentRetican({
			videoInformation:{
				videoUrl,
				isPhoneEnabled:displayMobileUI
			},
			reticanOptionType,
			videoUrlSize
		});
	}	

	const displayVideoCreationModal=()=>{
		changeCurrentRetican(null);
	}

	const triggerCreateRetican=(secondaryInformation)=>{
		currentRetican={
			...currentRetican,
			...secondaryInformation
		}
		reticanCreationOrEdit(currentRetican);
	}

	const reticanCreationOrEdit=(currentRetican)=>{
		if(reticanInformation==null){
			reticanCreationConsumer.createRetican(currentRetican);
		}else{
			reticanCreationConsumer.editRetican(currentRetican);
		}
	}

	const closeModalIcon=()=>{
		return(
			<svg xmlns="http://www.w3.org/2000/svg" onClick={()=>displayInitialReticanScreen()}
				style={{cursor:"pointer"}}
				class="icon icon-tabler icon-tabler-circle-x"
				 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
				 stroke-linecap="round" stroke-linejoin="round">
				  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				  <circle cx="12" cy="12" r="9" />
				  <path d="M10 10l4 4m0 -4l-4 4" />
			</svg>
		)
	}

	return(
		<Container>
			{closeModalIcon()}
			{currentRetican==null?
				<VideoCreation 
					displaySelectedReticanOptionType={displaySelectedReticanOptionType}
				/>:
				<React.Fragment>
					<div id="finalStageVideoCreation" style={{display:"flex",flexDirection:"row"}}>
						<VideoLoadingPrompt
							videoElement={
								<video id="videoElement" style={{backgroundColor:"#151515",borderRadius:"5px"}}
									width="200px" height="100px" borderRadius="50%"
									autoPlay loop autoBuffer playsInline muted controls>
									<source src={currentRetican.videoInformation.videoUrl} type="video/mp4"/>
								</video>
							}
							videoId="videoElement"
						/>
						<div style={VideoOptionsCSS} onClick={()=>displayVideoCreationModal()}>
							<ReplayRoundedIcon/>
						</div>
					</div>

					<ReticanOptionsModals currentSelectedReticanType={reticanOptionType}>
						<GeneralRetican optionType={"General"}/>
						<IntroductoryRetican 
							optionType={"Introductory"}
							displayReticanInitialOptionCreation={displayInitialReticanScreen}
							triggerCreateRetican={triggerCreateRetican}
							reticanInformation={reticanInformation}
						/>
						<TextResponseRetican 
							optionType={"Text Response Retican"}
							displayReticanInitialOptionCreation={displayInitialReticanScreen}
							triggerCreateRetican={triggerCreateRetican}
							reticanInformation={reticanInformation}
						/>
						<VideoResponseRetican optionType={"Video Response Retican"}/>
					</ReticanOptionsModals>
					{(reticanOptionType=="General" || reticanOptionType=="Video Response Retican")==true &&(
						<div style={{display:"flex",flexDirection:"row"}}>
							<div style={ButtonCSS} onClick={()=>displayInitialReticanScreen()}>
								Close
							</div>
							<div style={ButtonCSS} onClick={()=>reticanCreationOrEdit(currentRetican)}>
								{reticanInformation==null?<>Create</>:<>Edit</>} Retican
							</div>
						</div>
					)} 
				</React.Fragment>
			}

		</Container>
	)
}

export default ReticanOptions;
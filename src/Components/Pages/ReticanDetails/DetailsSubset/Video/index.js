import React from "react";
import styled from "styled-components";
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import test4 from "../../../../../Assets/LandingPageSpecific/scrollingWindowBlock_4.png";
import VideoNavigation from "../../../../UniversalComponents/Navigation/CardNavigationCircle/index.js";

const Container=styled.div`
	position:relative;
	display:flex;
	flex-direction:column;

	@media screen and (max-width:650px){
		#videoElement{
			width:100% !important;
			height:150px !important; 
		}
		#videoNavigation{
			width:100% !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		#videoElement{
			width:100% !important;
			height:70% !important; 
		}
    }
`;

const Video=({triggerUpdatedSelectedIndex,currentSelectedIndex,videos})=>{
	return(
		<Container>
			<img id="videoElement" src={test4} style={{width:"400px",height:"250px",borderRadius:"5px"}}/>
			{/*
				<video id="videoElement"
					width="400px" height="250px" borderRadius="50%"
					autoPlay loop autoBuffer playsInline muted>
					<source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
						type="video/mp4"/>
				</video>
			*/}
			<div style={{display:"flex",flexDirection:"row",width:"100%",marginTop:"15%"}}>
				<GetAppRoundedIcon
					style={{fontSize:"30",cursor:"pointer"}}
				/>
				<div id="videoNavigation" style={{width:"30%",marginLeft:"10%"}}>
					<VideoNavigation 
						totalCards={videos}
						currentSelectedIndex={currentSelectedIndex}
						specifiedFlexDirection={"row"}
						triggerUpdatedSelectedIndex={triggerUpdatedSelectedIndex}
					/>
				</div>
			</div>
		</Container>
	)
}

export default Video;
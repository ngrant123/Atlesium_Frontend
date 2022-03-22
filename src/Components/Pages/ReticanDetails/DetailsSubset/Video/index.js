import React from "react";
import styled from "styled-components";
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import test4 from "../../../../../Assets/LandingPageSpecific/scrollingWindowBlock_4.png";
import VideoNavigation from "../../../../UniversalComponents/Navigation/CardNavigationCircle/index.js";
import VideoLoadingPrompt from "../../../../UniversalComponents/Loading/VideoLoadingPrompt.js";

const Container=styled.div`
	position:relative;
	display:flex;
	flex-direction:column;

	@media screen and (max-width:1370px){
		#videoElement{
			width:100% !important;
		}
	}

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

const Video=({triggerUpdatedSelectedIndex,currentSelectedIndex,totalReticans,currentSelectedReticanVideo})=>{
	const uuid=()=>{
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	return(
		<Container>
			<VideoLoadingPrompt
				videoElement={
					<video id="videoElement"
						key={uuid()}
						style={{borderRadius:"5px",backgroundColor:"#151515"}}
						width="400px" height="250px" borderRadius="50%"
						autoPlay loop autoBuffer playsInline muted controls>
						<source src={currentSelectedReticanVideo}
							type="video/mp4"/>
					</video>
				}
				videoId="videoElement"
			/>

			<div style={{display:"flex",flexDirection:"row",width:"100%",marginTop:"15%",alignItems:"center",justifyContent:"center"}}>
				<div id="videoNavigation" style={{display:"flex",justifyContent:"space-between",width:"30%"}}>
					<VideoNavigation 
						totalCards={totalReticans}
						currentSelectedIndex={currentSelectedIndex}
						specifiedDirection={"inline-block"}
						triggerUpdatedSelectedIndex={triggerUpdatedSelectedIndex}
					/>
				</div>

				{/*
					<GetAppRoundedIcon
						style={{fontSize:"30",cursor:"pointer"}}
					/>
				*/}
			</div>
		</Container>
	)
}

export default Video;
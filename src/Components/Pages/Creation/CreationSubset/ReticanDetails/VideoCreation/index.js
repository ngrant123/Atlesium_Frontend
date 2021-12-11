import React,{useState} from "react";
import styled from "styled-components";
import test4 from "../../../../../../Assets/LandingPageSpecific/scrollingWindowBlock_4.png";
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import PauseIcon from '@material-ui/icons/Pause';
import CropIcon from '@material-ui/icons/Crop';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import CropBar from "./CropBar/index.js";

const Container=styled.div`
	height:70%;
	display:flex;
	flex-direction:column;
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
const VideoCreation=()=>{
	const [isVideoElementPaused,changeVideoElementPauseStatus]=useState(false);
	const [displayCropFunctionality,changeCropFunctionality]=useState(false);

	const pause=()=>{
		document.getElementById("videoElement").pause();
		changeVideoElementPauseStatus(true);
	}

	const play=()=>{
		document.getElementById("videoElement").play();
		changeVideoElementPauseStatus(false);
	}

	const closeCropModal=()=>{
		changeCropFunctionality(false);
	}
	return(
		<Container>
			<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
				<input type="checkbox" style={{marginTop:"-15px"}}/>
				<p style={{fontSize:"18px",marginLeft:"5%"}}> Allow responses</p>
			</div>
			
			<div style={{display:"flex",flexDirection:"row"}}>
				<div style={{display:"flex",flexDirection:"column"}}>
					<video id="videoElement"
						width="400px" height="250px" borderRadius="50%"
						autoPlay loop autoBuffer playsInline muted controls>
						<source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
							type="video/mp4"/>
					</video>
					<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:"5%"}}>
						{displayCropFunctionality==false?
							<React.Fragment>
								<div style={VideoOptionsCSS}>
									<ReplayRoundedIcon/>
								</div>
								{/*
									{isVideoElementPaused==false?
										<div style={VideoOptionsCSS} onClick={()=>pause()}>
											<PauseIcon/>
										</div>:
										<div style={VideoOptionsCSS} onClick={()=>play()}>
											<PlayArrowRoundedIcon/>
										</div>
									}

									<div style={VideoOptionsCSS} onClick={()=>changeCropFunctionality(true)}>
										<CropIcon/>
									</div>
								*/}
							</React.Fragment>:
							<CropBar
								closeCropModal={closeCropModal}
							/>
						}
					</div>
				</div>
				<div style={{display:"flex",flexDirection:"column",marginLeft:"5%"}}>
					<div style={VideoOptionsCSS}>
						<CancelOutlinedIcon/>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default VideoCreation;
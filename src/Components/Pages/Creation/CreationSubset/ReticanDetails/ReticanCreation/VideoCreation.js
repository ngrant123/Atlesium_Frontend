import React,{useState} from "react";
import styled from "styled-components";
import AddIcon from '@material-ui/icons/Add';
import Color_Constants from "../../../../../../Utils/ColorConstants.js";
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import KeyboardTabIcon from '@material-ui/icons/KeyboardTab';
import ErrorAlertSystem from "../../../../../UniversalComponents/Skeletons/Alerts.js";

const Container=styled.div`
	position:relative;
	width:100%;

	${({videoUrl})=>
		videoUrl!=null?
		`background-color:white;`:
		`background-color:${Color_Constants.GREY};`
	}
	height:100%;
	display:flex;
	justify-content:center;
	flex-direction:column;
	align-items:center;
	border-radius:5px;
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


const VideoCreation=({displaySelectedReticanOptionType})=>{
	const [videoUrl,changeVideoUrl]=useState();
	const [videoUrlSize,changeVideoUrlSize]=useState();
	const [displayVideoCreationErrorMessage,changeDisplayVideoCreationErrorMessage]=useState(false);
	const [errorMessage,changeErrorMessage]=useState(false);

	const clickUploadVideoButton=()=>{
 		document.getElementById("uploadedVideoDescription").click();
 	}

	const handleUploadVideo=()=>{
		let reader= new FileReader();
		const videoDescription=document.getElementById("uploadedVideoDescription").files[0];

		const maxSize=11*1024*1024;
		if(videoDescription.size>maxSize){
			let videoCreatoinErrorMessage={
				header:"Video File Size Max Exceeded",
				description:"Your file is too large. We only accept video descriptions that have a size of 11MB. You can go to quicktime (Mac) and lower the resolution there."
			}
			changeDisplayVideoCreationErrorMessage(true);
			changeErrorMessage(videoCreatoinErrorMessage);
		}else{
			reader.onloadend=()=>{
				changeVideoUrl(reader.result);
				changeVideoUrlSize(videoDescription.size);
			}

			if(videoDescription!=null){
				reader.readAsDataURL(videoDescription);
			}
			else{
				let videoCreatoinErrorMessage={
					header:"File Format Not Supported",
					description:"Sorry but this type of video is not currently allowed. Change it to either mov,mp4 to continue"
				}
				changeDisplayVideoCreationErrorMessage(true);
				changeErrorMessage(videoCreatoinErrorMessage);;
			}
		}
	}
	const closeErrorAlertScreen=()=>{
		changeDisplayVideoCreationErrorMessage(false);
	}

	const videoCreationErrorAlertModal=()=>{
	    return(
	      <React.Fragment>
	        {displayVideoCreationErrorMessage==true &&(
	          <ErrorAlertSystem
	            closeModal={closeErrorAlertScreen}
	            targetDomId={"reticanCreation"}
	            alertMessage={errorMessage}
	          />
	        )}
	      </React.Fragment>
	    )
  	}

  	const initiateRedo=()=>{
  		changeVideoUrl(null);
  	}

	return(
		<Container videoUrl={videoUrl}>
			{videoCreationErrorAlertModal()}
			{videoUrl!=null?
				<React.Fragment>
					<video id="videoElement"
						width="400px" height="250px" borderRadius="50%"
						autoPlay loop autoBuffer playsInline muted controls>
						<source src={videoUrl} type="video/mp4"/>
					</video>
					<div style={{display:"flex",flexDirection:"row",marginTop:"5%",width:"100%",justifyContent:"center"}}>
						<div style={VideoOptionsCSS} onClick={()=>initiateRedo()}>
							<ReplayRoundedIcon/>
						</div>

						<div style={{...VideoOptionsCSS,marginLeft:"15%"}}
							onClick={()=>displaySelectedReticanOptionType(videoUrl,videoUrlSize)}>
							<KeyboardTabIcon/>
						</div>
					</div>
				</React.Fragment>
				:<React.Fragment>
					<p>
						<b>Create a video for your retican</b>
					</p>
					<AddIcon
						onClick={()=>clickUploadVideoButton()}
						style={{fontSize:48,color:"white",cursor:"pointer"}}
					/>
					<input type="file" accept="video/*" 
						id="uploadedVideoDescription" 
						style={{opacity:0,zIndex:0,position:"relative",cursor:"pointer",position:"absolute"}} 
						onChange={()=>handleUploadVideo()}>
					</input>
				</React.Fragment>
			}
		</Container>
	)
}

export default VideoCreation;
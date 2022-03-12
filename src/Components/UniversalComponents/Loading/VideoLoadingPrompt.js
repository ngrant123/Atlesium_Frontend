import React,{useState,useEffect} from "react";
import styled from "styled-components";

const LoadingPromptCSS={
	borderRadius:"5px",
	backgroundColor:"#151515",
	color:"white",
	padding:"20px"
}


/*
	In the future should converting the reference to the video element as a ref instead of an id?
	Food for thot
*/
const VideoLoadingPrompt=({videoElement,videoId})=>{
	console.log(videoElement);
	const [displayVideoElement,changeDisplayVideoElement]=useState(true);
	const [parentVideoElementHeight,changeParentVideoElementHeight]=useState(0);
	const [parentVideoElementWidth,changeParentVideoElementWidth]=useState(0);

	useEffect(()=>{
		debugger;
		const videoElement=document.getElementById(videoId);
		changeParentVideoElementHeight(window.getComputedStyle(videoElement).height);
		changeParentVideoElementWidth(window.getComputedStyle(videoElement).width);

		videoElement.onloadeddata = function() {
			changeDisplayVideoElement(true);
		}

		changeDisplayVideoElement(false);
		
	},[]);

	useEffect(()=>{
		if(displayVideoElement==false){
			const loadingPrompt=document.getElementById("loadingPrompt");

			loadingPrompt.style.width=parentVideoElementWidth;
			loadingPrompt.style.height=parentVideoElementHeight;
		}
	},[displayVideoElement]);

	return(
		<React.Fragment>
			{displayVideoElement==true?
				<>{videoElement}</>:
				<div id="loadingPrompt" style={LoadingPromptCSS}>
					<p>Loading...</p>
				</div>
			}
		</React.Fragment>
	)
}

export default VideoLoadingPrompt;

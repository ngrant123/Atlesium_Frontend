import React,{useEffect,useState} from "react";
import styled from "styled-components";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import test4 from "../../../../Assets/LandingPageSpecific/scrollingWindowBlock_4.png";
import COLOR_CONSTANTS from "../../../../Utils/ColorConstants.js";

const Container=styled.div`
	width:100%;
`;

const ProgressNodesCSS={
	width:"35px",
	height:"35px",
	borderRadius:"50%",
	backgroundColor:COLOR_CONSTANTS.PRIMARY_SECONDARY_COLOR,
	transition:".8s",
	display:"flex",
	justifyContent:"center",
	alignItems:"center",
	padding:"10%"
}

const CreationProgressBar=({currentScreen})=>{
	let [currentPercentage,changeCurrentPercentage]=useState(0);
	const [previousSelectedScreen,changePreviousSelectedScreen]=useState("webInformation");

	const retrievePercentage=(screen)=>{
		let percentage;
		switch(screen){
			case "webInformation":{
				percentage=5;
				break;
			}

			case "reticanDetails":{
				percentage=50;
				break;
			}

			case "review":{
				percentage=100;
				break;
			}
		}
		return percentage;
	}
	useEffect(()=>{
		setTimeout(()=>{
			debugger;
			let maxThreshold=retrievePercentage(currentScreen);
			let startPoint=retrievePercentage(previousSelectedScreen);
			if(startPoint>=maxThreshold)
				startPoint=maxThreshold;
	        while(startPoint<=maxThreshold){
	        	changeCurrentPercentage(startPoint);
	          	startPoint++;
        	}
        	changePreviousSelectedScreen(currentScreen);
      	},1000);
	},[currentScreen]);	

	const constructNodeElements=()=>{
	    const ProgressBarSteps=[];
	    for(var i=0;i<3;i++){
	    	let nodeDescription;
	    	switch(i){
	    		case 0:{
	    			nodeDescription="Website";
	    			break;
	    		}
	    		case 1:{
	    			nodeDescription="Details";
	    			break;
	    		}

	    		case 2:{
	    			nodeDescription="Review";
	    			break;
	    		}
	    	}
			const StepElement=<Step transition="scale"
	                    index={0}>
	                {({ accomplished,index }) => (
	                	<div style={{display:"flex",flexDirection:"column",marginTop:"50%"}}>
	                		<div style={ProgressNodesCSS}>
	                			<div style={{width:"100%",height:"100%",borderRadius:"50%",backgroundColor:"white"}}/>
	                		</div>
	                		<p style={{marginTop:"20%",color:COLOR_CONSTANTS.GREY_SECONDARY}}>
	                			{nodeDescription}
	                		</p>
	                	</div>
	                )}
	            </Step>;
			ProgressBarSteps.push(StepElement);    	
	    }
	    return ProgressBarSteps;
	}

	return(
		<Container>	
			<ProgressBar
			    percent={currentPercentage}
			    height={20}
				filledBackground={""+COLOR_CONSTANTS.PRIMARY_COLOR+""}
			>
				{constructNodeElements()}
			</ProgressBar>
		</Container>
	)
}

export default CreationProgressBar;
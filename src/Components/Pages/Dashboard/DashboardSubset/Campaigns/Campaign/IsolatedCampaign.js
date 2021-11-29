import React,{useRef,useEffect} from "react";
import styled,{keyframes} from "styled-components";
import TestImahge from "../../../../../../Assets/LandingPageSpecific/scrollingWindowBlock_1.png";

const Campaign=styled.div`
	position:absolute;
	width:85%;
	height:100%;
	background-color:white;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#E8E8E8;
	display:flex;
	flex-direction:row;
	cursor:pointer;
`;

const ActiveStatusCSS={
	width:"28px",
	height:"28px",
	borderRadius:"50%",
	backgroundColor:"#00FF00"
}

const CampaignDisplay=({campaignInformation,currentIndex,removeTargetedIndexCampaign})=>{
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
		if (!dynamicStyles) {
	    dynamicStyles = document.createElement('style');
	    dynamicStyles.type = 'text/css';
	    document.head.appendChild(dynamicStyles);
	  }
	  
	  dynamicStyles.sheet.insertRule(animationKeyFrame, dynamicStyles.length);
	}


	return(
		<Campaign ref={campaignRef}
			onAnimationEnd={() => removeTargetedIndexCampaign(currentIndex)}>
			<div style={{display:"flex",flexDirection:"column",justifyContent:"center",width:"100%",height:"100%",alignItems:"center",marginTop:"-10%"}}>
				<img src={TestImahge} style={{width:"75%",height:"35%"}}/>
				<div style={{marginTop:"5%",marginLeft:"-20%",display:"flex",flexDirection:"column"}}>
					<div>
						<p style={{fontSize:"24px"}}>
							<b>{campaignInformation.title}</b>
						</p>
						<p style={{fontSize:"18px"}}>{campaignInformation.description}</p>
					</div>
					<div style={ActiveStatusCSS}/>
				</div>
			</div>

		</Campaign>
	)
}

export default CampaignDisplay;
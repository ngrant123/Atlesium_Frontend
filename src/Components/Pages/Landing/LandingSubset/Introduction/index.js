import React,{useState,useEffect,useRef} from "react";
import styled from "styled-components";
import Header from "./Header/index.js";
import ArrowCircleDownOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import Color_Constants from "../../../../../Utils/ColorConstants.js";

import ProcessBreakDownSkeleton from "./ProcessBreakDowns/ProcessBreakDownSkeleton.js";
import PrimaryBreakDownImage from "../../../../../Assets/LandingPageSpecific/Explanation_1.png";
import SecondaryBreakDownImage from "../../../../../Assets/LandingPageSpecific/Explanation_2.png";
import TertiaryBreakDownImage from "../../../../../Assets/LandingPageSpecific/Explanation_3.png";

const Container=styled.div`
	background-color:white;
	height:100%;
	width:90%;
	display:flex;
	flex-direction:column;
	align-items:center;
	justify-content:center;
	padding:70px;
`;

const CircleContainer=styled.div`
	width:28px;
	height:28px;
	border-radius:50%;
	background-color:white;
	box-shadow:1px 1px 5px #6e6e6e;
	transition:.8s;
	&:hover{
		box-shadow:1px 1px 20px #6e6e6e;
   	}
`;

const PageIconsCSS={
	display:"flex",
	flexDirection:"row",
	width:"30%",
	justifyContent:"space-between",
	cursor:"pointer",
	alignItems:"center"
}

const breakDownInformation={
	primary:{
		stepNumber:1,
		headerText:<b>Record an introduction to your <span style={{color:Color_Constants.PRIMARY_COLOR}}> customers </span> </b>,
		image:PrimaryBreakDownImage,
		explanationText:"Create a video introduction on our platform of whatever you want and give customers/visitors an authentic view of what you represent"
	},
	secondary:{
		stepNumber:2,
		headerText:<b>
						Attach <span style={{color:Color_Constants.PRIMARY_COLOR}}> script </span> 
						to page you want modal to show
					</b>,
		image:SecondaryBreakDownImage,
		explanationText:"After you create your video description, we will give you a code snippet that you can then attach to pages you want this video to come up. "
	},
	tertiary:{
		stepNumber:3,
		headerText:<b>
						Experience a newfound  <span style={{color:Color_Constants.PRIMARY_COLOR}}> connection </span> 
						with your visitors
					</b>,
		image:TertiaryBreakDownImage,
		explanationText:"Text simply doesn’t cut it anymore. People resonate with a face, so why hold your business back"
	}
}

const IntroductionCoordinator=()=>{

	const [pageCounter,changePageCounter]=useState(0);
	const [refsToButtonIcons,changeRefsToButtonIcons]=useState({});
	const [pageCounterIcons,changePageCounterIcons]=useState();
	const [component,changeComponent]=useState();
	useEffect(()=>{

		switch(pageCounter){
			case 0:{

				return changeComponent(<Header incrementPageCounter={incrementPageCounter}/>);
			}
			case 1:{
				initPageIcons();
				selectButton();
				const primaryInformation=breakDownInformation['primary'];
				return changeComponent(
					<ProcessBreakDownSkeleton {...primaryInformation}/>
				);
			}
			case 2:{
				selectButton();
				const secondaryInformation=breakDownInformation['secondary'];
				return changeComponent(<ProcessBreakDownSkeleton {...secondaryInformation}/>);
			}

			case 3:{
				selectButton();
				const tertiaryInformation=breakDownInformation['tertiary'];
				return changeComponent(<ProcessBreakDownSkeleton {...tertiaryInformation}/>);
			}
		}
	},[pageCounter]);
	const selectButton=()=>{
		for(const key in refsToButtonIcons){
			refsToButtonIcons[key].style.backgroundColor="white";
		}
		const pageIncrementRef=refsToButtonIcons[pageCounter];
		pageIncrementRef.style.backgroundColor=Color_Constants.PRIMARY_COLOR;
	}
	const initPageIcons=()=>{
		const pageIcons=[];
		for(var i=1;i<4;i++){
			pageIcons.push(<ButtonRefCreation index={i}/>);
		}

		return(
			<div style={PageIconsCSS}>
				<ArrowCircleDownOutlinedIcon
					style={{fontSize:"24"}}
					onClick={()=>changePageCounter(0)}
				/>
				{pageIcons.map(data=>
					<>{data}</>
				)}
			</div>
		)
	}



	const decrementPageCounter=(decrementPageCounter)=>{
		changePageCounter(decrementPageCounter);
	}
	const incrementPageCounter=(incrementCounter,isDirectAccess)=>{
		if(isDirectAccess==true){
			const icons=initPageIcons();
			changePageCounterIcons(icons);
		}
		changePageCounter(incrementCounter);
	}

	const alterPageCounter=(prospecitvePageNumber)=>{
		debugger;
		if(prospecitvePageNumber>pageCounter){
			incrementPageCounter(prospecitvePageNumber);
		}else{
			decrementPageCounter(prospecitvePageNumber);
		}
	}





	const ButtonRefCreation=({index})=>{
		const iconRef=useRef();
		return(
			<CircleContainer ref={ref=>{
				const currentRefs=refsToButtonIcons;
				currentRefs[index]=ref;
				changeRefsToButtonIcons(currentRefs);
			}} onClick={()=>alterPageCounter(index)}/>
		)
	}

	return(
		<Container>
			<div style={{marginBottom:"10%"}}>{component}</div>
			{pageCounter!=0 &&(
				<>{pageCounterIcons}</>
			)}
		</Container>
	)
}

export default IntroductionCoordinator;
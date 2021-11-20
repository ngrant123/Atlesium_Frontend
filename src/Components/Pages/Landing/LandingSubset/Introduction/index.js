import React,{useState,useEffect,useRef} from "react";
import styled from "styled-components";
import Header from "./Header/index.js";
import PrimaryIntroduction from "./ProcessBreakDowns/Primary/index.js";
import SecondaryIntroduction from "./ProcessBreakDowns/Secondary/index.js";
import TertiaryIntroduction from "./ProcessBreakDowns/Tertiary/index.js";
import ArrowCircleDownOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import Color_Constants from "../../../../../Utils/ColorConstants.js";


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
`;

const CircleCSS={
	width:"28px",
	height:"28px",
	borderRadius:"50%",
	backgroundColor:"white",
	boxShadow:"1px 1px 5px #6e6e6e"
}

const PageIconsCSS={
	display:"flex",
	flexDirection:"row",
	width:"30%",
	justifyContent:"space-between",
	cursor:"pointer",
	alignItems:"center"
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
				return changeComponent(<PrimaryIntroduction/>);
			}
			case 2:{
				selectButton();
				return changeComponent(<SecondaryIntroduction/>);
			}

			case 3:{
				selectButton();
				return changeComponent(<TertiaryIntroduction/>);
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
import React,{useState} from "react";
import styled from "styled-components";
import COLOR_CONSTANTS from "../../../../../../Utils/ColorConstants.js";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const RankingInputContainer=styled.textarea`
	position:relative;
	height:40px;
	border-style:solid;
	border-width:1px;
	border-color:${COLOR_CONSTANTS.GREY};
	resize:none;
	padding:10px;
	border-radius:5px;

	@media screen and (max-width:650px){
		width:90px;
	}
`;

const ArrowIconCSS={
	cursor:"pointer",
	fontSize:"30px"
}

const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px",
	display:"none"
}

const CancelReorderOptionCSS={
	width:"40px",
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


const ReorderModal=(props)=>{
	const {
		displayIntroductoryReticanPreventionReorderMessage,
		analyzeInput,
		alterReticanEditButtonsDisplayStatus,
		currentReticanCounter,
		firstReticanType,
		currentReticanType
	}=props;
	console.log(currentReticanCounter);
	debugger;
	const [displayExtendedReorderModal,changeDisplayExtendedReorderModal]=useState(false);

	// useEffect(()=>{
	// 	debugger;
	// 	document.getElementById("rankingContainer").value=currentReticanCounter+1;
	// },[currentReticanCounter]);



	const editReticanOrderingStatus=(incrementIndicator)=>{
		debugger;
		if(displayExtendedReorderModal==false){
			document.getElementById("reorderContainer").style.marginLeft="0%";
			alterReticanEditButtonsDisplayStatus(false);
			changeDisplayExtendedReorderModal(true);
		}

		let updatedReticanCounter=currentReticanCounter;
		if(incrementIndicator){
			updatedReticanCounter++;
		}else{
			updatedReticanCounter--;
		}

		if((updatedReticanCounter==0 && firstReticanType=="Introductory")==true || currentReticanType=="Introductory"){
			displayIntroductoryReticanPreventionReorderMessage();
		}else{
			analyzeInput(updatedReticanCounter);
		}

	}

	const closeReordering=()=>{
		document.getElementById("reorderContainer").style.marginLeft="10%";
		alterReticanEditButtonsDisplayStatus(true);
		changeDisplayExtendedReorderModal(false);
	}

	return(
		<div id="reorderContainer" style={{marginLeft:"10%",display:"flex",flexDirection:"row",alignItems:"center"}}>
			<p style={{marginLeft:"10%",marginRight:"2%"}}>
				<b>Retican Order:</b>
			</p>
			<RankingInputContainer type="number" disabled id="rankingContainer"/>
			<div style={{display:"flex",flexDirection:"column"}}>
				<ArrowDropUpIcon style={ArrowIconCSS} onClick={()=>editReticanOrderingStatus(true)}/>
				<ArrowDropDownIcon style={ArrowIconCSS} onClick={()=>editReticanOrderingStatus(false)}/>
			</div>

			<hr style={HorizontalLineCSS}/>
			{displayExtendedReorderModal==true &&(
				<div style={CancelReorderOptionCSS} onClick={()=>closeReordering()}>
					<CancelOutlinedIcon/>
				</div>
			)}
		</div> 
	)
}

export default ReorderModal;
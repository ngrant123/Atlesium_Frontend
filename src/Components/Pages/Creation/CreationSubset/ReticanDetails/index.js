import React,{useState} from "react";
import styled from "styled-components";
import Details from "./Details/index.js";
import ReticanCreation from "./ReticanCreation/index.js";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import {Link} from "react-router-dom";
import ReticanHeaderColorOptions from "../../CreationSet/Modals-Portals/ReticanHeaderColorOptions.js";
import {ReticanOverviewProvider} from "./ReticanOverviewCreationContext.js";

const Container=styled.div`
	width:100%;
`;

const ColorWheelCSS={
	background:"linear-gradient(90deg, rgba(255, 255, 0, 1) 0%, rgba(0, 188, 212, 1) 50%, rgba(238, 130, 238, 1) 100%)",
	padding:"15px",
	borderRadius:"50%",
	marginLeft:"5px",
	cursor:"pointer",
	borderStyle:"solid",
	borderWidth:"3px",
	borderColor:"black"
}

const ColorHeaderCSS={
	width:"10%",
	height:"30px",
	borderRadius:"5px",
	marginBottom:"2%",
	cursor:"pointer"
}

const ReticanDetailsInit=({progressScreen,reticanAssembly})=>{
	console.log(reticanAssembly);

	const [displayReticanHeaderColorOptions,changeReticanHeaderColorOptionsDisplay]=useState(false);
	const [selectedColorHeader,changeSelectedColorHeader]=useState();
	let [currentReticanDetails,changeReticanDetails]=useState(reticanAssembly==null?{}:reticanAssembly);
	console.log(currentReticanDetails);


	const closeModal=()=>{
		changeReticanHeaderColorOptionsDisplay(false);
	}
	const triggerUpdateReticanDetailsInformation=(selectedColor)=>{
		changeSelectedColorHeader(selectedColor);
		triggerUpdateReticanParentInformation({headerColor:selectedColor});
		closeModal();
	}

	const triggerUpdateReticanParentInformation=(additionalReticanInformation)=>{
		currentReticanDetails={
			...currentReticanDetails,
			...additionalReticanInformation
		}
		changeReticanDetails({...currentReticanDetails});
	}

	const headerColorOptionsModal=()=>{
		return(
			<React.Fragment>
				{displayReticanHeaderColorOptions==true &&(
					<ReticanHeaderColorOptions
						closeModal={closeModal}
						updateReticanDetailInformationInformation={triggerUpdateReticanDetailsInformation}
					/>
				)}
			</React.Fragment>
		)
	}

	const triggerUpdateReticanAssembler=(destinationScreen,title,description)=>{
		currentReticanDetails={
			...currentReticanDetails,
			title,
			description
		}
		console.log(currentReticanDetails);
		progressScreen(destinationScreen,currentReticanDetails);
	}

	const closeModalIcon=()=>{
		return(
			<svg xmlns="http://www.w3.org/2000/svg" onClick={()=>changeSelectedColorHeader(null)}
				style={{cursor:"pointer"}}
				class="icon icon-tabler icon-tabler-circle-x"
				 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
				 stroke-linecap="round" stroke-linejoin="round">
				  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				  <circle cx="12" cy="12" r="9" />
				  <path d="M10 10l4 4m0 -4l-4 4" />
			</svg>
		)
	}
	return(
		<ReticanOverviewProvider
			value={{
				reticanAssembly
			}}
		>
			<Container>
				{headerColorOptionsModal()}
				<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
					<ArrowBackIosRoundedIcon
						onClick={()=>progressScreen("webInformation")}
						style={{fontSize:"18",marginTop:"-10px",cursor:"pointer"}}
					/>
					<p style={{fontSize:"18px",marginLeft:"4%"}}>
						<b>Retican Details</b>
					</p>
					<div style={ColorWheelCSS}
						onClick={()=>changeReticanHeaderColorOptionsDisplay(true)}
					/>
				</div>

				{selectedColorHeader!=null &&(
					<div style={{display:"flex",flexDirection:"row"}}>
						<div style={{...ColorHeaderCSS,background:selectedColorHeader}}/>
						{closeModalIcon()}
					</div>
				)}

				<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
					<Details
						triggerProgressScreen={triggerUpdateReticanAssembler}
						totalReticans={currentReticanDetails.reticans==null?[]:currentReticanDetails.reticans}
					/>
					<ReticanCreation
						triggerUpdateReticanParentInformation={triggerUpdateReticanParentInformation}
					/>
				</div>
			</Container>
		</ReticanOverviewProvider>
	)
}

export default ReticanDetailsInit;
import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Details from "./Details/index.js";
import ReticanCreation from "./ReticanCreation/index.js";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import {Link} from "react-router-dom";
import ReticanHeaderColorOptions from "../../CreationSet/Modals-Portals/ReticanHeaderColorOptions.js";
import {ReticanOverviewProvider} from "./ReticanOverviewCreationContext.js";
import ReticanProcessingInformationalModal from "../../CreationSet/Modals-Portals/ReticanProcessingConfirmationModal.js";

const Container=styled.div`
	width:100%;

	@media screen and (max-width:1370px){
		#horizontalLineDivider{
			display:block !important;
		}
	}

	@media screen and (max-width:650px){
		#headerColor{
			width:80% !important;
		}
		#overviewDetailsHeaderText{
			font-size:14px !important;
		}
		#colorWheel{
			padding:10px !important;
		}
	}
`;

const ReticanDetails=styled.div`
	display:flex;
	flex-direction:row;
	justify-content:space-between;

	@media screen and (max-width:1370px){
		flex-direction:column-reverse;
	}
`;

const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px",
	display:"none"
}

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

const ReticanDetailsInit=(props)=>{
	const {
		reticanHeaderColor,
		progressScreen,
		reticanAssembly,
		isEditReticanDesired,
		history,
		updateReticanAssemblerInformation
	}=props;

	const [displayReticanHeaderColorOptions,changeReticanHeaderColorOptionsDisplay]=useState(false);
	const [displayReticanProcessingInformation,changeDisplayReticanProcessingInformation]=useState(false);
	const [selectedColorHeader,changeSelectedColorHeader]=useState(reticanAssembly==null?null:reticanAssembly.headerColor);
	let [currentReticanDetails,changeReticanDetails]=useState(reticanAssembly==null?{}:reticanAssembly);


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
		updateReticanAssemblerInformation(additionalReticanInformation);
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

	const triggerPreviousScreen=()=>{
		const quickSavedTitleAndDescription={
			title:document.getElementById("title").value,
			description:document.getElementById("description").value
		}
		updateReticanAssemblerInformation({...quickSavedTitleAndDescription});
		progressScreen("webInformation");
	}

	const closeReticanProcessingInformational=()=>{
		changeDisplayReticanProcessingInformation(false);
	}

	const reticanProcessingInformational=()=>{
		return(
			<React.Fragment>
				{displayReticanProcessingInformation==true &&(
					<ReticanProcessingInformationalModal
						closeModal={closeReticanProcessingInformational}
						history={history}
						isEditingProcessing={isEditReticanDesired}
					/>
				)}
			</React.Fragment>
		)
	}

	const triggerDisplayReticanProcessingModal=()=>{
		changeDisplayReticanProcessingInformation(true);
	}

	return(
		<ReticanOverviewProvider
			value={{
				reticanAssembly
			}}
		>
			<Container>
				{reticanProcessingInformational()}
				{headerColorOptionsModal()}
				<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
					<ArrowBackIosRoundedIcon
						onClick={()=>triggerPreviousScreen()}
						style={{fontSize:"18",marginTop:"-10px",cursor:"pointer"}}
					/>
					<p id="overviewDetailsHeaderText" style={{fontSize:"18px",marginLeft:"4%"}}>
						<b>Retican Overview Details</b>
					</p>
					<div id="colorWheel" style={ColorWheelCSS}
						onClick={()=>changeReticanHeaderColorOptionsDisplay(true)}
					/>
				</div>

				{selectedColorHeader!=null &&(
					<div style={{display:"flex",flexDirection:"row"}}>
						<div id="headerColor" style={{
							...ColorHeaderCSS,
							background:selectedColorHeader.color,
							backgroundColor:selectedColorHeader.color
						}}/>
						{closeModalIcon()}
					</div>
				)}
				<hr style={HorizontalLineCSS} id="horizontalLineDivider"/>
				<ReticanDetails>
					<Details
						triggerProgressScreen={triggerUpdateReticanAssembler}
						totalReticans={currentReticanDetails.reticans==null?[]:currentReticanDetails.reticans}
						isEditReticanDesired={isEditReticanDesired}
						selectedColorHeader={selectedColorHeader}
						originalHeaderColor={reticanHeaderColor}
						triggerUpdateReticanParentInformation={triggerUpdateReticanParentInformation}
						triggerDisplayReticanProcessingModal={triggerDisplayReticanProcessingModal}
					/>
					<hr style={HorizontalLineCSS} id="horizontalLineDivider"/>

					<ReticanCreation
						triggerUpdateReticanParentInformation={triggerUpdateReticanParentInformation}
						isEditReticanDesired={isEditReticanDesired}
					/>
				</ReticanDetails>
			</Container>
		</ReticanOverviewProvider>
	)
}

export default ReticanDetailsInit;
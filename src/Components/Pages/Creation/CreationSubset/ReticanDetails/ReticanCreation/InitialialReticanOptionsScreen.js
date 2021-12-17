import React,{useState} from "react";
import styled from "styled-components";
import Color_Constants from "../../../../../../Utils/ColorConstants.js";
import ReticanOptions from "./ReticanOptions/index.js";

const ReticanOptionCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	padding:"10px",
	color:Color_Constants.PRIMARY_COLOR,
	height:"60px",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:Color_Constants.PRIMARY_COLOR,
	cursor:"pointer",
	display:"flex",
	flexDirection:"row",
	justifyContent:"center",	
	alignItems:"center",
	borderRadius:"5px",
	marginTop:"5%",
	marginRight:"2%",
	marginBottom:"2%"
}

const InitialScreen=({reticansLength,displayDefaultReticans})=>{
	const [displayReticanOptionCreation,changeReticanOptionCreation]=useState(false);
	const [selectedReticanOption,changeSelectedReticanOption]=useState();

	const triggerDisplayReticanOptionCreation=(reticanOption)=>{
		changeSelectedReticanOption(reticanOption);
		changeReticanOptionCreation(true);
	}

	const triggerDisplayReticanInitialScreen=()=>{
		changeReticanOptionCreation(false);
	}

	const closeOptionsScreenIcon=()=>{
		return(
			<svg xmlns="http://www.w3.org/2000/svg"
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
		<React.Fragment>
			{displayReticanOptionCreation==true?
				<ReticanOptions
					reticanOption={selectedReticanOption}
					displayInitialReticanScreen={triggerDisplayReticanInitialScreen}
				/>:
				<React.Fragment>
					<div style={{display:"flex",width:"100%",justifyContent:"space-between"}}>
						<p>
							<b>Choose retican-type:</b>
						</p>
						{reticansLength!=0 &&(
							<div onClick={()=>displayDefaultReticans()}>
								{closeOptionsScreenIcon()}
							</div>
						)}
					</div>
					<div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
						<div style={ReticanOptionCSS}
							onClick={()=>triggerDisplayReticanOptionCreation("VideoResponseRetican")}>
							Video Responses
						</div>

						<div style={ReticanOptionCSS}
							onClick={()=>triggerDisplayReticanOptionCreation("TextResponseRetican")}>
							Text Responses
						</div>

						<div style={ReticanOptionCSS}
							onClick={()=>triggerDisplayReticanOptionCreation("General")}>
							General Retican
						</div>

						<div style={ReticanOptionCSS}
							onClick={()=>triggerDisplayReticanOptionCreation("Introductory")}>
							Introductory Retican
						</div>
					</div>
				</React.Fragment>
			}
		</React.Fragment>
	)
}

export default InitialScreen;
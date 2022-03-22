import React,{useState,useEffect} from "react";
import styled from "styled-components";
import COLOR_CONSTANTS from "../../../Utils/ColorConstants.js";

const ToolTipTextCSS={
	visibility:"visible",
	width:"180px",
	backgroundColor:COLOR_CONSTANTS.CALL_TO_ACTION_COLOR,
	color:"#fff",
	textAlign:"center",
	borderRadius:"6px",
	padding:"15px",
	position:"relative",
	zIndex: 1
	//transform:"rotate(90deg)"
}

const ToolTipTextArrowCSS={
	content:"",
	position:"absolute",
	bottom:"100%",
	left:"50%",
	marginLeft: "-5px",
	borderWidth: "5px",
	borderStyle: "solid",
	borderColor:`transparent transparent ${COLOR_CONSTANTS.CALL_TO_ACTION_COLOR} transparent`
}

const RequiredFieldNotification=({InputComponent,id,erroredInputIds,notificationText})=>{
	const [displayRequiredFieldMissingError,changeDispalyRequiredFieldError]=useState(false);
	const [isMounted,changeIsMountedStatus]=useState(false); 
	useEffect(()=>{
		if(isMounted==false){
			changeIsMountedStatus(true);
		}else{
			const inputDiv=document.getElementById(id);
			if(inputDiv!=null){
				let inputAlteredStatus=false;
				for(var i=0;i<erroredInputIds.length;i++){
					if(erroredInputIds[i]==id){
						inputAlteredStatus=true;
						break;
					}
				}

				if(inputAlteredStatus==true){
					changeDispalyRequiredFieldError(true);
					inputDiv.style.borderColor=COLOR_CONSTANTS.CALL_TO_ACTION_COLOR;

				}else{
					if(displayRequiredFieldMissingError!=false){
						changeDispalyRequiredFieldError(false);
						inputDiv.style.borderColor=COLOR_CONSTANTS.GREY;
					}
				}
			}
		}
	});

	const input=()=>{
		return(
			<>{InputComponent}</>
		)
	}


	return(
		<React.Fragment>
			{input()}
			{displayRequiredFieldMissingError==true &&(
				<div id="errorExplanationToolTip" style={ToolTipTextCSS}>
					<div style={ToolTipTextArrowCSS}/>
					{notificationText==null?
						<p>Required Field</p>:
						<p>{notificationText}</p>
					}
				</div>
			)}
		</React.Fragment>
	)
}


export default RequiredFieldNotification;
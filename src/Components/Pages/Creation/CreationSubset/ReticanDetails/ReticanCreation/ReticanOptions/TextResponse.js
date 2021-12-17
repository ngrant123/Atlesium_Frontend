import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Color_Constants from "../../../../../../../Utils/ColorConstants.js";

const InputContainer=styled.textarea`
	position:relative;
	width:100%;
	height:60px;
	border-style:solid;
	border-width:1px;
	border-color:${Color_Constants.GREY};
	resize:none;
	padding:10px;
	border-radius:5px;
`;

const ButtonCSS={
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

const TextResponseRetican=({displayReticanInitialOptionCreation,triggerCreateRetican,reticanInformation})=>{
	const [placeHolderText,changePlaceHolderText]=useState();

	useEffect(()=>{
		if(reticanInformation!=null){
			const {placeholder}=reticanInformation;
			document.getElementById("textPlaceHolder").value=placeholder;
		}
	},[]);

	return(
		<React.Fragment>
			{placeHolderText==null?
				<React.Fragment>
					<p style={{marginBottom:"2%",marginTop:"2%"}}>
						What do you want your input placeholder to be?
					</p> 
					<InputContainer id="textPlaceHolder" placeholder="Enter a placeholder here"/>
					<div style={{display:"flex",flexDirection:"row"}}>
						<div style={ButtonCSS} onClick={()=>displayReticanInitialOptionCreation()}>
							Close
						</div>
						<div style={ButtonCSS} 
							onClick={()=>changePlaceHolderText(document.getElementById("textPlaceHolder").value)}>
							Next
						</div>
					</div>
				</React.Fragment>:
				<React.Fragment>
					<p>Does this look all good to you?</p>
					<p>Placeholder:<b>{placeHolderText}</b></p>
					<div style={{display:"flex",flexDirection:"row"}}>
						<div style={ButtonCSS} onClick={()=>displayReticanInitialOptionCreation()}>
							Close
						</div>
						<div style={ButtonCSS} onClick={()=>triggerCreateRetican({placeholder:placeHolderText})}>
							Create Retican
						</div>
					</div>

				</React.Fragment>
			}
		</React.Fragment>
	)
}

export default TextResponseRetican;
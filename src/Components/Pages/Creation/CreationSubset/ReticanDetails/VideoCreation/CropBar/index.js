import React,{useEffect} from "react";
import styled from "styled-components";
import Color_Constants from "../../../../../../../Utils/ColorConstants.js";
import DragFunctionality from "./DragFunctionality.js";

const Container=styled.div`
	width:100%;
`;

const CropBarContainer=styled.div`
	width:100%;
	height:25%;
	box-shadow:1px 1px 5px ${Color_Constants.GREY};
	border-radius:5px;
	display:flex;
	flex-direction:row;
	overflow:hidden;
`;
const CropOptionsButtonCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	color:Color_Constants.PRIMARY_COLOR,
	padding:"5px",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:Color_Constants.PRIMARY_COLOR,
	cursor:"pointer",
	width:"20%",
	display:"flex",
	flexDirection:"row",
	justifyContent:"center",	
	alignItems:"center",
	borderRadius:"5px",
	marginTop:"5%",
	marginRight:"5%"
}

 const CropBarToggleButtonCSS={
 	position:"relative",
	width:"20px",
	height:"20px",
	borderRadius:"50%",
	backgroundColor:Color_Constants.GREY_SECONDARY,
	boxShadow:"1px 1px 5px #6e6e6e",
	transition:".8s",
	display:"flex",
	justifyContent:"center",
	alignItems:"center",
	cursor:"move",
	left:'0px'
}

const CropBar=({closeCropModal})=>{
	useEffect(()=>{
		debugger;
		const primaryCropToggleButtonDrag=new DragFunctionality();
		const secondaryCropToggleButtonDrag=new DragFunctionality();

		const offsetX=document.getElementById("cropBarDiv").getBoundingClientRect().x;
		primaryCropToggleButtonDrag.initializeDrag(
			document.getElementById("primaryToggleButton"),
			document.getElementById("cropBarDiv"));
		//secondaryCropToggleButtonDrag.initializeDrag(document.getElementById("secondaryToggleButton",offsetX));
	},[]);

	return(
		<Container>
			<CropBarContainer id="cropBarDiv">
				<div id="primaryToggleButton" style={CropBarToggleButtonCSS}/>
				{/*
					<div id="secondaryToggleButton" style={CropBarToggleButtonCSS}/>
				*/}
			</CropBarContainer>

			<div style={{display:"flex",flexDirection:"row"}}>
				<div style={CropOptionsButtonCSS}
					onClick={()=>closeCropModal()}>
					Close
				</div>
				<div style={CropOptionsButtonCSS}>
					Edit
				</div>
			</div>
		</Container>
	)
}

export default CropBar;




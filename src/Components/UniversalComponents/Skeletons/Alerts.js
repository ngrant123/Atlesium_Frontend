import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";

const ShadowContainer = styled.div`
  position:fixed;
  width:200%;
  height:100vh;
  left:-10%;
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  display:block;
  top:0%;
  z-index:20;
`;

const Container=styled.div`
	position:fixed;
	height:40%;
	background-color:white;
	z-index:21;
	top:20%;
	border-radius:5px;
	width:50%;
	left:25%;
	padding:40px;
	display:flex;
	overflow:hidden;
	flex-direction:column;

	@media screen and (max-width:650px){
		top:0%;
		width:100%;
		left:0%;
		height:100%;
	}
`;

const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
}

const AlertSkeleton=({closeModal,targetDomId,alertMessage})=>{
	const {header,description}=alertMessage;

	const closeModalIcon=()=>{
		return(
			<svg xmlns="http://www.w3.org/2000/svg" onClick={()=>closeModal()}
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
	return createPortal(
		<React.Fragment>
			<ShadowContainer onClick={()=>closeModal()}/>
			<Container>
				<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
					<p style={{fontSize:"28px"}}>
						<b>{header}</b>
					</p>
					{closeModalIcon()}
				</div>
				<hr style={HorizontalLineCSS}/>
				<p style={{fontSize:"18px"}}>{description}</p>
			</Container>
		</React.Fragment>
	,document.getElementById(targetDomId))
}


export default AlertSkeleton;
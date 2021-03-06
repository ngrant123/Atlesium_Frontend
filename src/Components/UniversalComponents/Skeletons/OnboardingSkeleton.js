import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";

const ShadowContainer = styled.div`
  position:fixed;
  width:200%;
  height:100vh;
  left:-10%;
  top:0%;
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  display:block;
  z-index:20;
`;

const Container=styled.div`
	position:fixed;
	height:60%;
	background-color:white;
	z-index:20;
	top:20%;
	border-radius:5px;
	width:45%;
	left:30%;
	padding:40px;
	overflow-y:auto;

	@media screen and (max-width:1370px){
		left:20%;
		width:60%;
	}

	@media screen and (max-width:650px){
		top:0%;
		width:100%;
		left:0%;
		height:100%;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		top:0%;
		width:100%;
		left:0%;
		height:100%;
    }
`;


const OnboardingSkeleton=({closeModal,targetDom,component})=>{
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
				<div style={{position:"relative",display:"flex",width:"100%",justifyContent:"flex-end"}}>
					{closeModalIcon()}
				</div>
				<div style={{position:"relative"}}>
					{component}
				</div>
			</Container>
		</React.Fragment>
	,document.getElementById(targetDom))
}

export default OnboardingSkeleton;
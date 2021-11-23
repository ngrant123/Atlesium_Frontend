import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import CallToActionSkeleton from "../../../../UniversalComponents/Skeletons/CallToActionSkeleton.js";
import Color_Constants from "../../../../../Utils/ColorConstants.js";

const Submit=styled.div`
   width:95%;
   height:50px;
   border-color: #C8B0F4;
   border-style:solid;
   background-color:#C8B0F4;
   color:white;
   text-decoration:none;

  display: flex;
  align-items: center;
  justify-content: center;
  transition:.8s;
  border-radius:5px;
  padding:20px;
  margin-bottom:5%;
  cursor:pointer;

   z-index:2;
   &:hover{
      background-color:white;
      color:#C8B0F4;
      border-style:solid;
      border-color: #C8B0F4;
      text-decoration:none;

   }

    @media screen and (max-width:650px){
        width:100% !important;
        margin-top:10% !important;
    }
`;


const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
}
const DeleteButtonIcon={
	borderRadius:"5px",
	color:"white",
	display:"flex",
	justifyContent:"center",
	alignItems:"center",
	padding:"5%",
	backgroundColor:Color_Constants.CALL_TO_ACTION_COLOR,
	cursor:"pointer"
}
const DeleteProfile=({closeModal})=>{
	const deleteProfileModal=()=>{
		return(
			<React.Fragment>
				<div style={{width:"100%",display:"flex",justifyContent:"center"}}>
					<p>
						<b>Are you sure you want to delete you profile?</b>
					</p>
				</div>
				<hr style={HorizontalLineCSS}/>
				<div style={DeleteButtonIcon}>
					Delete
				</div>
			</React.Fragment>
		)
	}
	return(
		<CallToActionSkeleton
			component={deleteProfileModal()}
			closeModal={closeModal}
			targetDom={"settings"}
		/>
	)
}

export default DeleteProfile; 

















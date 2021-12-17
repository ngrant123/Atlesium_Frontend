import React from "react";
import styled from "styled-components";
import CallToActionSkeleton from "../../../../UniversalComponents/Skeletons/CallToActionSkeleton.js";
import Color_Constants from "../../../../../Utils/ColorConstants.js";

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

const DeleteRetican=({closeModal,deleteRetican})=>{
	const deleteReticanOptions=()=>{
		return(
			<React.Fragment>
				<div style={{width:"100%",display:"flex",justifyContent:"center"}}>
					<p>
						<b>Are you sure you want to delete this retican?</b>
					</p>
				</div>
				<hr style={HorizontalLineCSS}/>
				<div style={DeleteButtonIcon} onClick={()=>deleteRetican()}>
					Delete
				</div>
			</React.Fragment>
		)
	}

	return(
		<CallToActionSkeleton
			component={deleteReticanOptions()}
			closeModal={closeModal}
			targetDom={"reticanCreation"}
		/>
	)
}

export default DeleteRetican;
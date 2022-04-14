import React,{useEffect} from "react";
import styled from "styled-components";
import CallToActionSkeleton from "../../../../UniversalComponents/Skeletons/CallToActionSkeleton.js";
import AtlesiumLogo from "../../../../../Assets/Logos/AtlesiumLogo.svg";
import LoadingAnimation from "../../../../UniversalComponents/Loading/index.js";
import COLOR_CONSTANTS from "../../../../../Utils/ColorConstants.js";


const ReticanTypeCSS={
	padding:"2%",
	borderRadius:"5px",
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:COLOR_CONSTANTS.PRIMARY_COLOR,
	color:COLOR_CONSTANTS.PRIMARY_COLOR,
	display:"flex",
	justifyContent:"center",
	marginBottom:"5%",
	cursor:"pointer"
}


const ReticanProcessingInformationalModal=({closeModal,history,isEditingProcessing})=>{
	console.log(isEditingProcessing);
	const defaultText="We'll let you kow via email when this is done.";

	const secondaryText=isEditingProcessing==true?defaultText:defaultText+"This page will redirect you shortly or you can click the close button."

	
	const reticanProcessingModal=()=>{
		return(
			<React.Fragment>
				<LoadingAnimation
					loadingText={"Processing reticans..."}
					secondaryText={secondaryText}
				/>
				<div style={ReticanTypeCSS} onClick={()=>history.props.push('/dashboard')}>
					Close
				</div>
			</React.Fragment>
		)
	}

	return(
		<CallToActionSkeleton
			component={reticanProcessingModal()}
			closeModal={closeModal}
			targetDom={"reticanCreation"}
		/>
	)
}

export default ReticanProcessingInformationalModal;
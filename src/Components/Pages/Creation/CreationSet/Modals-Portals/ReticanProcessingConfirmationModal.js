import React,{useEffect} from "react";
import styled from "styled-components";
import CallToActionSkeleton from "../../../../UniversalComponents/Skeletons/CallToActionSkeleton.js";
import AtlesiumLogo from "../../../../../Assets/Logos/AtlesiumLogo.svg";
import LoadingAnimation from "../../../../UniversalComponents/Loading/index.js";

const ReticanProcessingInformationalModal=({closeModal,history})=>{

	useEffect(()=>{
		setTimeout(()=>{
			history.push('/dashboard');
		},10000);
	},[]);
	
	const reticanProcessingModal=()=>{
		return(
			<LoadingAnimation
				loadingText={"Processing reticans..."}
				secondaryText={"This process can take some time so if you want to you can head over to your dashboard and we'll let you kow via email when this is done. This page will redirect you shortly"}
			/>
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
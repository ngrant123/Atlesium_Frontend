import React,{useState} from "react";
import styled from "styled-components";
import EmailConfirmationModal from "../PasswordResetSubset/EmailConfirmationModal.js";
import PasswordResetModal from "../PasswordResetSubset/PasswordResetModal.js";


const Container=styled.div`
	position:absolute;
	background-color:white;
	width:100%;
	height:100%;
	display:flex;
	justify-content:center;

	@media screen and (max-width:650px){
		justify-content:flex-start !important;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		justify-content:flex-start !important;
    }
`;

const PasswordReset=(props)=>{
	const [displayEmailConfirmationModal,changeDisplayEmailConfirmationModal]=useState(true);
	const [displayResetPasswordModal,changeDisplayResetPasswordModal]=useState(false);
	const [selectedEmail,changeSelectedEmail]=useState()
	const {history}=props;
	const triggerResetModal=(email)=>{
		changeSelectedEmail(email);
		changeDisplayResetPasswordModal(true);
		changeDisplayEmailConfirmationModal(false);
	}

	const triggerEmailConfirmationModal=()=>{
		changeDisplayResetPasswordModal(false);
		changeDisplayEmailConfirmationModal(true);	
	}

	return(
		<Container id="passwordResetContainerId">	
			{displayEmailConfirmationModal==true ?
				<EmailConfirmationModal
					triggerResetModal={triggerResetModal}
					parentContainerId={"passwordResetContainerId"}
				/>:
				<PasswordResetModal
					triggerEmailConfirmationModal={triggerEmailConfirmationModal}
					email={selectedEmail}
					history={history}
					parentContainerId={"passwordResetContainerId"}
				/>
			}
		</Container>
	)
}



export default PasswordReset;
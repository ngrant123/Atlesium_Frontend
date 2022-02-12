import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';

import COLOR_CONSTANTS from "../../../../Utils/ColorConstants.js"
import {
	createProfilePicture
} from "../../../../Actions/Requests/ProfileRequests/Adapter/ProfileCreation.js";
import {
	deleteProfilePicture
} from "../../../../Actions/Requests/ProfileRequests/Adapter/ProfileDeletion.js";
import {useSelector} from "react-redux";
import AlertSystem from "../../../UniversalComponents/Skeletons/Alerts.js";

const Container=styled.div`
	position:fixed;
	height:60%;
	background-color:white;
	z-index:20;
	top:20%;
	border-radius:5px;
	width:30%;
	left:35%;
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

const NoProfilePictureBlockCSS={
	height:"50%",
	width:"100%",
	position:"relative",
	backgroundColor:COLOR_CONSTANTS.GREY,
	borderRadius:"5px",
	display:"flex",
	justifyContent:"center",
	alignItems:"center",
	marginTop:"5%",
	cursor:"pointer"
}

const ButtonCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	padding:"2%",
	width:"100%",
	display:"flex",
	borderRadius:"5px",
	justifyContent:"center",
	alignItems:"center",
	cursor:"pointer",
	borderColor:COLOR_CONSTANTS.PRIMARY_COLOR,
	color:COLOR_CONSTANTS.PRIMARY_COLOR
}

const DeleteButtonCSS={
	...ButtonCSS,
	borderColor:COLOR_CONSTANTS.CALL_TO_ACTION_COLOR,
	backgroundColor:COLOR_CONSTANTS.CALL_TO_ACTION_COLOR,
	color:"white",
	marginRight:"5%"
}


const VerticalLineCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"30px",
 	marginRight:"5%",
 	marginLeft:"5%"
}

const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
}

const ProfilePicture=({targetDom,closeProfilePictureCreationModal,updateNavigationProfilePicture})=>{
	console.log(targetDom);
	const [profilePicture,changeProfilePicture]=useState();
	const [displayDeleteOptions,changeDeleteOptions]=useState(false);
	const [errorMessage,changeErrorMessage]=useState();
	const [displayProfilePictureErrorAlertMessage,changeDisplayProfilePictureCreationErrorMessage]=useState(false);
	const [submittingStatus,changeSubmittingStatus]=useState(false)

	const profileId=useSelector(state=>state.personalInformation._id);

	const closeModalIcon=()=>{
		return(
			<svg xmlns="http://www.w3.org/2000/svg" onClick={()=>closeProfilePictureCreationModal()}
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

	const handleUploadPicture=()=>{
		let reader= new FileReader();
		const picture=document.getElementById("uploadPictureFile").files[0];

		reader.onloadend=()=>{
			const picUrl=reader.result;
			const maxFileSize=7000*1024;
			if(picture.size>maxFileSize){
				alert('Your file is too large. We only accept images that have a max size of 7MB. You can go to preview (Mac) and lower the resolution there.');
			}else{
				const picUrl=reader.result;
				changeProfilePicture(picUrl);
			}
		}

		if(picture!=null){
			reader.readAsDataURL(picture);
		}
		else{
			alert("Sorry but this type of image is not currently allowed. Change it to either jpeg,png to continue");
		}
	}

	const clickUploadPhotoButton=()=>{
		document.getElementById("uploadPictureFile").click();
	}

	const creationDisplay=()=>{
		return(
			<React.Fragment>
				<div style={{display:"flex",width:"100%",justifyContent:"flex-end"}}>
					{closeModalIcon()}
				</div>
				<hr/>
				<p>Click on the add icon below to create your own profile picture</p>

				<div style={NoProfilePictureBlockCSS} onClick={()=>clickUploadPhotoButton()}>
					<AddIcon
						style={{fontSize:"40",color:"white"}}
					/>
				</div>
			</React.Fragment>
		)
	}

	const triggerCreateProfile=async()=>{
		updateNavigationProfilePicture(profilePicture);
		changeSubmittingStatus(true);

		const {confirmation,data}=await createProfilePicture(profilePicture,profileId);
		if(confirmation=="Success"){

		}else{
			const {statusCode}=data;
			let errorAlertMessage;
			if(statusCode==500){
				errorAlertMessage={
					header:"Internal Server Error",
					description:"Unfortunately there has been an error on our part. Please try again later"
				}
			}else{
				errorAlertMessage={
					header:"Profile Creation Error",
					description:"Unfortunately, an error has occured when creating your profile picture. Please try again."
				}
			}

			changeErrorMessage(errorAlertMessage);
			changeDisplayProfilePictureCreationErrorMessage(true);
		}
		changeSubmittingStatus(false);
	}

	const triggerDeleteProfilePicture=async()=>{
		const {confirmation,data}=await deleteProfilePicture();
		if(confirmation=="Success"){
			changeProfilePicture(null);
		}else{
			const {statusCode}=data;
			let errorAlertMessage;
			if(statusCode==500){
				errorAlertMessage={
					header:"Internal Server Error",
					description:"Unfortunately there has been an error on our part. Please try again later"
				}
			}else{
				errorAlertMessage={
					header:"Profile Deletion Error",
					description:"Unfortunately, an error has occured when deleting your profile picture. Please try again."
				}
			}

			changeErrorMessage(errorAlertMessage);
			changeDisplayProfilePictureCreationErrorMessage(true);
		}
	}

	const options=()=>{
		return(
			<React.Fragment>
				{displayDeleteOptions==false?
					<React.Fragment>
						{submittingStatus==true?
							<p>Please wait...</p>:
							<React.Fragment>
								<div style={ButtonCSS} onClick={()=>triggerCreateProfile()}>
									Submit
								</div>
								<hr/>
								<div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
									<RefreshIcon
										onClick={()=>clickUploadPhotoButton()}
										style={{fontSize:"25",cursor:"pointer"}}
									/>
									<div style={VerticalLineCSS}/>
									<DeleteIcon
										onClick={()=>changeDeleteOptions(true)}
										style={{fontSize:"25",cursor:"pointer"}}
									/>
								</div>
							</React.Fragment>
						}
					</React.Fragment>:
					<React.Fragment>
						<p>Are you sure you want to delete your profile picture?</p>
						<hr style={HorizontalLineCSS}/>
						<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
							<div style={DeleteButtonCSS} onClick={()=>triggerDeleteProfilePicture()}>
								Delete
							</div>
							<div style={ButtonCSS} onClick={()=>changeDeleteOptions(false)}>
								Back
							</div>
						</div>
					</React.Fragment>
				}
			</React.Fragment>
		)
	}

	const profilePictureEditOrUpload=()=>{
		return(
			<div style={{display:"flex",flexDirection:"row"}}>
				<img src={profilePicture} style={{height:"120px",width:"120px",borderRadius:"5px"}}/>
				<div style={{display:"flex",flexDirection:"column",marginLeft:"5%",width:"50%"}}>
					{options()}	
				</div>
			</div>
		)
	}

	const closeErrorAlertScreen=()=>{
		changeDisplayProfilePictureCreationErrorMessage(false);
	}

	const reticanRetrievalOverviewErrorModal=()=>{
		return(
			<React.Fragment>
				{displayProfilePictureErrorAlertMessage==true &&(
			        <AlertSystem
						closeModal={closeErrorAlertScreen}
						targetDomId={targetDom}
						alertMessage={errorMessage}
			        />
				)}
			</React.Fragment>
		)
	}

	return createPortal(
		<React.Fragment>
			{reticanRetrievalOverviewErrorModal()}
			<ShadowContainer 
				onClick={()=>closeProfilePictureCreationModal()}
			/>
			<Container>
				{profilePicture==null?
					<>{creationDisplay()}</>:
					<>{profilePictureEditOrUpload()}</>
				}

				<input type="file" name="img" id="uploadPictureFile" style={{opacity:"0"}}  
					onChange={()=>handleUploadPicture()} 
			        accept="image/jpeg" 
			        name="attachments">
			    </input>
			</Container>
		</React.Fragment>
	,document.getElementById(targetDom))
}


export default ProfilePicture;
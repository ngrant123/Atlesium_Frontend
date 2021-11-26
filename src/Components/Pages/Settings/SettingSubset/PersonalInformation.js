import React,{useState} from "react";
import styled from "styled-components";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Color_Constants from "../../../../Utils/ColorConstants.js";
import DeleteProfileModal from "../SettingSet/Modals-Portals/DeleteProfilePortal.js";
import PauseProfileModal from "../SettingSet/Modals-Portals/PauseProfilePortal.js";

const TextArea=styled.textarea`
  position:relative;
  border-radius:5px;
  width:90%;
  border-style:solid;
  border-width:1px;
  border-color:#D8D8D8;
  resize:none;
  padding:5px;
  margin-bottom:2%;
  margin-right:2%;
  height:70px;
  @media screen and (max-width:700px){
    width:95% !important;
  }
`;

const UnSelectCSS={
	borderStyle:"none",
	backgroundColor:"white"
}


const VerticalLineCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"50px",
 	marginRight:"2%"
}

const EditButtonCSS={
	borderRadius:"50%",
	boxShadow:"1px 1px 5px #6e6e6e",
	padding:"1%",
	cursor:"pointer",
	marginTop:"-20px"
}
const PersonalInformationSettings=({passwordResetHandle})=>{
	const [displayDeleteProfileModal,changeDisplayDeleteProfileModal]=useState(false);
	const [displayPauseProfileModal,changeDisplayPauseProfileModal]=useState(false);

	const closeDeleteModal=()=>{
		changeDisplayDeleteProfileModal(false);
	}
	const deleteProfileModal=()=>{
		return(
			<React.Fragment>
				{displayDeleteProfileModal==true &&(
					<DeleteProfileModal
						closeModal={closeDeleteModal}
					/>
				)}
			</React.Fragment>
		)
	}

	const closePauseModal=()=>{
		changeDisplayPauseProfileModal(false);
	}	
	const pauseProfileModal=()=>{
		return(
			<React.Fragment>
				{displayPauseProfileModal==true &&(
					<PauseProfileModal
						closeModal={closePauseModal}
					/>
				)}
			</React.Fragment>
		)
	}

	return(
		<React.Fragment>
			{pauseProfileModal()}
			{deleteProfileModal()}
			<div style={{display:"flex",flexDirection:"row",marginBottom:"5%"}}>
				<AccountBoxIcon
					style={{fontSize:"36",color:Color_Constants.PRIMARY_COLOR}}
				/>
				<p style={{fontSize:"24px",marginLeft:"2%"}}>
					<b>Personal Information</b>
				</p>
				<div class="btn-group">
					<button class="btn btn-primary dropdown-toggle" type="button" 
						data-toggle="dropdown" style={UnSelectCSS}>
						<ArrowDropDownCircleOutlinedIcon
							style={{fontSize:"24",color:"black"}}
						/>
					</button>
					<ul class="dropdown-menu" style={{padding:"10px",marginLeft:"-120px"}}>
						<li style={{cursor:"pointer"}} onClick={()=>changeDisplayDeleteProfileModal(true)}>
							Delete Profile
						</li>
						<hr/>
						<li style={{cursor:"pointer"}} onClick={()=>changeDisplayPauseProfileModal(true)}>
							Pause Profile
						</li>
					</ul>
				</div>
			</div>

			<div>
				<p>
					<b>First Name</b>
				</p>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
					<TextArea placeholder="First Name"/>
					<div style={VerticalLineCSS}/>
					<div style={EditButtonCSS}>
						<BorderColorIcon
							style={{color:Color_Constants.PRIMARY_COLOR,}}
						/>
					</div>
				</div>
			</div>

			<div>
				<p>
					<b>Email</b>
				</p>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
					<TextArea placeholder="Email"/>
					<div style={VerticalLineCSS}/>
					<div style={EditButtonCSS}>
						<BorderColorIcon
							style={{color:Color_Constants.PRIMARY_COLOR}}
						/>
					</div>
				</div>
				<div style={{display:"flex",flexDirection:"row"}}>
					<input type="checkbox" style={{cursor:"pointer"}}
						onClick={()=>passwordResetHandle()}
					/>
					<p style={{marginLeft:"2%",color:Color_Constants.PRIMARY_COLOR}}>Update Password</p>
				</div>
			</div>
		</React.Fragment>
	)
}

export default PersonalInformationSettings;
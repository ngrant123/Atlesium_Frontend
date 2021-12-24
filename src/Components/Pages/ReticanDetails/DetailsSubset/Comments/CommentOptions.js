import React,{useState,useContext} from "react";
import styled from "styled-components";
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import Color_Constants from "../../../../../Utils/ColorConstants.js";
import {
	createEmailCorrespondence
} from "../../../../../Actions/Requests/ResponsesRequests/Adapter/EmailCorrespondenceCreation.js";
import {
	retrieveEmailResponseStatus
} from "../../../../../Actions/Requests/ResponsesRequests/Retrieval/EmailCorrespondenceNotification.js";
import {useSelector} from "react-redux";
import {DetailsContext} from "../../DetailsSet/DetailsContext.js";

const InputContainer=styled.textarea`
	position:relative;
	width:100%;
	height:100px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:10px;
	border-radius:5px;
	margin-top:7%;

	@media screen and (max-width:1370px){
		width:90%;
	}

	@media screen and (max-width:650px){
		width:100%;
		height:200px;
	}
`;

const VerticalLineCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"20px",
 	marginRight:"2%",
 	marginLeft:"2%"
}


const ButtonCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	color:Color_Constants.PRIMARY_COLOR,
	padding:"10px",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:Color_Constants.PRIMARY_COLOR,
	cursor:"pointer",
	width:"40%",
	display:"flex",
	flexDirection:"row",
	justifyContent:"center",	
	alignItems:"center",
	borderRadius:"5px",
	marginTop:"5%",
	marginRight:"2%",
	textDecoration:"none"
}


const DeletionButtonCSS={
	...ButtonCSS,
	color:"white",
	backgroundColor:Color_Constants.CALL_TO_ACTION_COLOR,
	borderColor:Color_Constants.CALL_TO_ACTION_COLOR
}

const CommentOptions=({commentData})=>{
	const [commentOptionType,changeCommentOptionType]=useState("general");
	const [displayEmailCorrespondencePresentWarningText,changeEmailCorrespondenceWarningText]=useState(false);
	const ownerId=useSelector(state=>state.personalInformation._id);
	const detailsConsumer=useContext(DetailsContext);


	const CommentOptions=({children})=>{
		return children.filter(child=>child.props.name==commentOptionType)
	}

	const triggerDeletion=()=>{
		changeCommentOptionType("general");
		detailsConsumer.deleteResponse(commentData._id);
	}


	const Deletion=()=>{
		return(
			<div style={{display:"flex",flexDirection:"row"}}>
				{closeButton()}
				<div id="button" style={DeletionButtonCSS} 
					onClick={()=>triggerDeletion()}>
					Delete
				</div>
			</div>
		)
	}

	const closeButton=()=>{
		return(
			<div id="button" style={ButtonCSS} onClick={()=>changeCommentOptionType("general")}>
				Close
			</div>
		)
	}

	const triggerCreateEmailCorrespondence=async()=>{
		const {confirmation,data}=await createEmailCorrespondence(
										commentData._id,
										ownerId);

		if(confirmation=="Success"){
			//Do nothing  (?)
		}
	}

	const Respond=()=>{
		return(
			<div style={{display:"flex",flexDirection:"column",width:"100%"}}>
				{displayEmailCorrespondencePresentWarningText==true &&(
					<p style={{color:Color_Constants.CALL_TO_ACTION_COLOR}}>
						<b>Based on our records it seems you have already contacted this person.</b>
					</p>
				)}

				<p>Responding here will set up an email correspondence between you and this person</p>
				{/*
					<InputContainer placeholder="Create a response here"/>
				*/}
				<div style={{display:"flex",flexDirection:"row"}}>
					{closeButton()}
					<div id="button" style={ButtonCSS} onClick={()=>triggerCreateEmailCorrespondence()}>
						<a href = {`mailto:${commentData.responseOwnerEmail}?subject = Feedback&body = Testing`}>
							Create Email
						</a>
					</div>
				</div>
			</div>
		)
	}

	const triggerCheckEmailCorrespondence=async()=>{
		changeCommentOptionType("respond");
		const {confirmation,data}=await retrieveEmailResponseStatus(
		ownerId,
		commentData._id);

		if(confirmation=="Success"){
			const {message}=data;
			if(message){
				changeEmailCorrespondenceWarningText(true);
			}
		}
	}

	const General=()=>{
		return(
			<div id="generalComments" 
				style={{display:"flex",flexDirection:"row",alignItems:"center",width:"20%",justifyContent:"space-between"}}>
				<ChatBubbleRoundedIcon
					onClick={()=>triggerCheckEmailCorrespondence()}
					style={{fontSize:"24",cursor:"pointer"}}
				/>
				<div id="commentOptionVerticalLine" style={VerticalLineCSS}/>
				<DeleteRoundedIcon
					onClick={()=>changeCommentOptionType("deletion")}
					style={{fontSize:"24",cursor:"pointer"}}
				/>
			</div>
		)
	}
	return(
		<React.Fragment>
			<CommentOptions>
				<General name={"general"}/>
				<Respond name={"respond"}/>
				<Deletion name={"deletion"}/>
			</CommentOptions>
		</React.Fragment>
	)
}

export default CommentOptions;
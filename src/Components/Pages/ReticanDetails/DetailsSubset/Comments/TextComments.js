import React from "react";
import styled from "styled-components";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import CommentOptions from "./CommentOptions.js";

const Container=styled.div`
	width:100%;
	height:100%;

	@media screen and (max-width:1370px){
		#textComment{
			flex-direction:column !important;
			margin-bottom:20% !important;
		}
	}
	
	@media screen and (max-width:650px){
		#userHolderImage{
			display:none !important;
		}
	}
`;

const Text=({comments})=>{
	const comment=(data)=>{
		return (
			<div id="textComment" style={{display:"flex",flexDirection:"row",marginBottom:"10%"}}>
				<AccountCircleIcon
					id="userHolderImage"
					style={{fontSize:"48"}}
				/>
				<div style={{display:"flex",flexDirection:"column",marginLeft:"5%",width:"100%"}}>	
					<p style={{fontSize:"18px"}}>
						<b>{data.comment}</b>
					</p>
					<CommentOptions/>
				</div>
			</div>
		)
	}
	return(
		<Container>
			{comments.map(data=>
				<>{comment(data)}</>
			)}
		</Container>
	)
}

export default Text;
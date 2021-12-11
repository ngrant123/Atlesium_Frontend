import React from "react";
import styled from "styled-components";
import test4 from "../../../../../Assets/LandingPageSpecific/scrollingWindowBlock_4.png";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CommentOptions from "./CommentOptions.js";

const Container=styled.div`
	width:100%;
	height:100%;

	@media screen and (max-width:1370px){
		#replyVideoElements{
			width:100% !important;
			height:150px !important; 
		}
		#videoComment{
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

const VideoComment=({comments})=>{
	const videoComment=()=>{
		return (
			<div id="videoComment" style={{display:"flex",flexDirection:"row",marginBottom:"10%"}}>
				<AccountCircleIcon
					id="userHolderImage"
					style={{fontSize:"48"}}
				/>
				<div style={{display:"flex",flexDirection:"column",marginLeft:"5%",width:"100%"}}>	
					<img id="replyVideoElements" 
						src={test4} style={{width:"400px",height:"200px",borderRadius:"5px",marginBottom:"5%"}}
					/>
					<CommentOptions/>
				</div>
			</div>
		)
	}
	return(
		<Container>
			{comments.map(data=>
				<>{videoComment()}</>
			)}
		</Container>
	)
}

export default VideoComment;
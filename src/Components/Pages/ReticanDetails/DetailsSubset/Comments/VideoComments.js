import React from "react";
import styled from "styled-components";
import test4 from "../../../../../Assets/LandingPageSpecific/scrollingWindowBlock_4.png";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CommentOptions from "./CommentOptions.js";
import NextButton from "./NextButton.js";

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
	const uuid=()=>{
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	const videoComment=(data)=>{
		return (
			<div id="videoComment" style={{display:"flex",flexDirection:"row",marginBottom:"10%"}}>
				<AccountCircleIcon
					id="userHolderImage"
					style={{fontSize:"48"}}
				/>
				<div style={{display:"flex",flexDirection:"column",marginLeft:"5%",width:"100%"}}>	
					<video id="replyVideoElements"
						key={uuid()}
						style={{borderRadius:"5px",backgroundColor:"#151515"}}
						width="400px" height="200px" borderRadius="50%"
						autoPlay loop autoBuffer playsInline muted controls>
						<source src={data.response}
							type="video/mp4"/>
					</video>
					<CommentOptions
						commentData={data}
					/>
				</div>
			</div>
		)
	}
	return(
		<Container>
			{comments.map(data=>
				<>{videoComment(data)}</>
			)}
			<NextButton/>
		</Container>
	)
}

export default VideoComment;
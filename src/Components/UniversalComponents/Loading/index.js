import React from "react";
import styled,{keyframes} from "styled-components";
import AtlesiumLogo from "../../../Assets/Logos/AtlesiumLogo.svg";
import {Link} from "react-router-dom";
import Color_Constants from "../../../Utils/ColorConstants.js";

const Container=styled.div`
	position:relative;
	display:flex;
	height:100%;
	flex-direction:column;
	margin-top:20%;
	align-items:center;
	text-align: center;

	@media screen and (max-width:650px){
		#secondaryText{
			width:100% !important;
		}
	}
`;

const keyFrame=keyframes`
	  0%{
	  }
	  100%{
	    transform:rotate(360deg);
	  }

`;

const Logo=styled.div`
	height:200px;
	width:200px;
	border-radius:5px;
	position:relative;
`;

const ButtonCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	padding:"10px",
	color:Color_Constants.PRIMARY_COLOR,
	height:"60px",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:Color_Constants.PRIMARY_COLOR,
	cursor:"pointer",
	display:"flex",
	flexDirection:"row",
	justifyContent:"center",	
	alignItems:"center",
	borderRadius:"5px",
	marginTop:"5%",
	fontSize:"18px"
}

//animation:${keyFrame} 3s ease-in-out 0s infinite;

const LoadingAnimation=({loadingText,secondaryText,referralLinkPresent})=>{
	return(
		<Container id="loadingAnimationText">
			<Logo>
				<img src={AtlesiumLogo} style={{borderRadius:"50%",width:"100%",height:"100%",marginRight:"2%"}}/>
			</Logo>
			<p style={{marginTop:"2%"}}>
				<b>{loadingText}</b>
			</p>
			<p id="secondaryText" style={{marginTop:"2%",width:"40%"}}>
				<b>{secondaryText}</b>
			</p>
			{referralLinkPresent!=null &&(
				<Link to={{pathname:"/dashboard"}} style={{textDecoration:"none"}}>
					<div style={ButtonCSS}>
						Dashboard
					</div>
				</Link>
			)}

		</Container>
	)
}

export default LoadingAnimation;
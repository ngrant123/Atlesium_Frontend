import React from "react";
import styled from "styled-components";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import Color_Constants from "../../../../../../Utils/ColorConstants.js";

const Container=styled.div`
	width:40%;
	display:flex;
	flex-direction:column;
	justify-content:space-between;
	margin-right:2%;
`;

const InputContainer=styled.textarea`
	position:relative;
	width:100%;
	height:60px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:10px;
	border-radius:5px;
	margin-top:7%;
`;

const CompressFileCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:Color_Constants.PRIMARY_COLOR,
	padding:"10px",
	color:"white",
	height:"60px",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	cursor:"pointer",
	width:"100%",
	display:"flex",
	flexDirection:"row",
	justifyContent:"space-between",	
	borderRadius:"5px"
}

const ReticanDetails=({triggerProgressScreen})=>{
	return(
		<Container>
			<div>
				<InputContainer placeholder="Title"/>
				<InputContainer style={{height:"200px"}} placeholder="Description"/>
			</div>
			<div>
				<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",fontSize:"18px",marginTop:"15%"}}>
					<p>
						<b>Total Estimated Size:</b>
					</p>
					<p>
						<b>63.25 MB</b>
					</p>
				</div>

				<div style={CompressFileCSS} onClick={()=>triggerProgressScreen("review")}>
					<p>Compress File</p>
					<ArrowForwardRoundedIcon
						style={{fontSize:"18"}}
					/>
				</div>
			</div>
		</Container>
	)
}

export default ReticanDetails;
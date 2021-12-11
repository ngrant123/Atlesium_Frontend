import React from "react";
import styled from "styled-components";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import Color_Constants from "../../../../../Utils/ColorConstants.js";
import {Link} from "react-router-dom";

const Container=styled.div`
	width:100%;
`;

const InputContainer=styled.textarea`
	position:relative;
	width:100%;
	height:80px;
	border-style:solid;
	border-width:1px;
	border-color:${Color_Constants.GREY};
	resize:none;
	padding:10px;
	border-radius:5px;
	margin-top:4%;
`;

const ReticanDetailsCreationCSS={
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
	width:"30%",
	display:"flex",
	flexDirection:"row",
	justifyContent:"space-between",	
	alignItems:"center",
	borderRadius:"5px",
	marginTop:"5%",
	fontSize:"18px"
}


const InitialWebInformation=({progressScreen})=>{
	return(
		<Container>
			<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
				<Link to={{pathname:"/dashboard"}}>
					<ArrowBackIosRoundedIcon
						style={{fontSize:"18",marginTop:"-10px",color:"black"}}
					/>
				</Link>
				<p style={{fontSize:"18px",marginLeft:"4%"}}>
					<b>Website Information</b>
				</p>
			</div>
			<InputContainer placeholder="Website Name"/>
			<div style={ReticanDetailsCreationCSS} onClick={()=>progressScreen("reticanDetails")}>
				<p>Create Retican Details</p>
				<ArrowForwardRoundedIcon
					style={{fontSize:"24"}}
				/>
			</div>
		</Container>
	)
}


export default InitialWebInformation;
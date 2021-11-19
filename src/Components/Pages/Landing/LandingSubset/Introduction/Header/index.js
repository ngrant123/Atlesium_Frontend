import React from "react";
import styled from "styled-components";
import Color_Constants from "../../../../../../Utils/ColorConstants.js";
import SympociaLogo from "../../../../../../Assets/Logos/StampIcon.png";
import ArrowForwardIosIcon from '@material-ui/icons/KeyboardArrowDown';

const Container=styled.div`
	display:flex;
	flex-direction:column;
	justify-content:space-between;
	height:100%;
`;

const InputContainer=styled.textarea`
	position:relative;
	width:100%;
	height:60px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	border-top-left-radius: 5px 5px;
	border-bottom-left-radius: 5px 5px;
`;

const PrimaryGetStartButtonCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"#3898ec",
	padding:"10px",
	color:"white",
	height:"60px",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	cursor:"pointer",
	width:"40%",
	display:"flex",
	alignItems:"center",
	justifyContent:"center",	
	borderTopRightRadius:"5px 5px",
	borderBottomRightRadius:"5px 5px"
}

const SecondaryButtonCSS={
	borderRadius:"5px",
	backgroundColor:"#1E1E1E",
	display:"flex",
	flexDirection:"row",
	padding:"4px",
	width:"35%",
	justifyContent:"space-between",
	cursor:"pointer"
}

const Header=({incrementPageCounter})=>{
	return(
		<Container>
			<div style={{marginTop:"25%",marginBottom:"15%"}}>
				<div style={{width:"100%",display:"flex",textAlign:"center",marginBottom:"5%"}}>
					<p style={{fontSize:"36px"}}>
						<b>A new way to 
							<span style={{color:Color_Constants.PRIMARY_COLOR}}> connect </span> 
							to your customers
						</b>
					</p>
				</div>

				<p style={{fontSize:"24px"}}>
					Onboard and interact with your customers on a more personal level than ever before. 
					Engagment on a whole new level
				</p>
				<div style={{width:"100%",display:"flex",flexDirection:"row",alignItems:"center",marginBottom:"5%"}}>	
					<InputContainer placeholder="Enter your email"/>
					<div style={PrimaryGetStartButtonCSS}>
						Get Started
					</div>
				</div>
				<div style={{width:"100%",display:"flex",justifyContent:"space-between",marginBottom:"10%"}}>
					<div style={SecondaryButtonCSS} onClick={()=>incrementPageCounter(1,true)}>
						<div style={{backgroundColor:"white",padding:"10px"}}>
							How it works
						</div>
						<div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"30%"}}>
							<ArrowForwardIosIcon
								style={{color:"white",fontSize:"24"}}
							/>
						</div>
					</div>
					<div style={SecondaryButtonCSS}>
						<div style={{backgroundColor:"white",padding:"10px",width:"50%"}}>
							Sign In
						</div>
						<div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"30%"}}>
							<ArrowForwardIosIcon
								style={{color:"white",fontSize:"24"}}
							/>
						</div>
					</div>
				</div>
			</div>

			<a href="https://sympocia.com/" style={{textDecoration:"none"}}>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"100%"}}>
					<img src={SympociaLogo} style={{width:"50px",height:"45px",borderRadius:"50%"}}/>
					<p style={{marginLeft:"2%",color:Color_Constants.SYMPOCIA_LINK_TEXT}}>Made by Sympocia</p>
				</div>
			</a>
		</Container>
	)
}

export default Header;
import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";

const Container=styled.div`
  position:fixed;
  height:60%;
  background-color:white;
  z-index:12;
  top:20%;
  border-radius:5px;
  width:30%;
  left:35%;
  padding:40px;
  display:flex;
  overflow:hidden;
  flex-direction:column;

  @media screen and (max-width:1370px){
    width:90% !important;
    left:5% !important;
  }
    @media screen and (max-width:600px){
        #loginBoxLI{
            display:none !important;
        }
    }
    @media screen and (max-width:1370px) and (max-height:900px) and (orientation: landscape) {
        height:70%;
    }
`;

const LoginBox=styled.textarea`
  position:relative;
  border-radius:5px;
  width:95%;
  border-style:solid;
  border-width:1px;
  border-color:#D8D8D8;
  resize:none;
  padding:5px;
  margin-bottom:2%;
  margin-right:2%;
  height:50px;
  @media screen and (max-width:700px){
    width:95% !important;
  }
`;

const Submit=styled.div`
   width:95%;
   height:50px;
   border-color: #C8B0F4;
   border-style:solid;
   background-color:#C8B0F4;
   color:white;
   text-decoration:none;

  display: flex;
  align-items: center;
  justify-content: center;
  transition:.8s;
  border-radius:5px;
  padding:20px;
  margin-bottom:5%;
  cursor:pointer;

   z-index:2;
   &:hover{
      background-color:white;
      color:#C8B0F4;
      border-style:solid;
      border-color: #C8B0F4;
      text-decoration:none;

   }

    @media screen and (max-width:650px){
        width:100% !important;
        margin-top:10% !important;
    }
`;

const ShadowContainer = styled.div`
  position:fixed;
  width:200%;
  height:100vh;
  left:-10%;
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  display:block;
  z-index:8;
`;

const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
}

const SignIn=({closeModal})=>{
	return createPortal(
		<React.Fragment>
			<Container>
				<p style={{fontSize:"24px"}}>
					<b>Login</b>
				</p>
				<hr style={HorizontalLineCSS}/>
				<LoginBox placeholder="Email"/>
				<LoginBox placeholder="Password"/>
				<Submit>
					Submit
				</Submit>
			</Container>
			<ShadowContainer onClick={()=>closeModal()}/>
		</React.Fragment>
	,document.getElementById("landingPage"))
}

export default SignIn;



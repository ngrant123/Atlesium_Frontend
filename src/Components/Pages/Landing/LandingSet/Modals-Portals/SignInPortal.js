import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {loginProfile} from "../../../../../Actions/Requests/ProfileRequests/Retrieval/LoginRequest.js";
import ErrorAlertSystem from "../../../../UniversalComponents/Skeletons/Alerts.js";
import RequiredFieldNotification from "../../../../UniversalComponents/Notifications/RequiredFieldNotification.js";
import {useDispatch} from "react-redux";
import {initializeProfile} from "../../../../../Actions/Redux/Actions/PersonalInformationActions.js";
import Color_Constants from "../../../../../Utils/ColorConstants.js";

const Container=styled.div`
  position:fixed;
  height:60%;
  background-color:white;
  z-index:3;
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
  z-index:2;
`;

const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
}

const SignIn=({closeModal,history,parentContainerId})=>{
  const [erroredInputIds,changeErroredInputIds]=useState([]);
  const [displayEmailErrorAlert,changeDisplayEmailErrorAlert]=useState(false);
  const [errorMessage,changeErrorMessage]=useState();
  const [displayLoginErrorAlert,changeLoginErrorAlertDisplay]=useState(false);
  const [logginInStatus,changeLoggingInStatus]=useState(false);
  const dispatcher=useDispatch();

  const triggerLoginRequest=async()=>{
    debugger;
    const userSubmittedEmail=document.getElementById("loginEmail").value;
    const userSubmittedPassword=document.getElementById("password").value;


    if(userSubmittedEmail=="" || userSubmittedPassword==""){
      let tempErrorInputIds=[];
      if(userSubmittedEmail==""){
        tempErrorInputIds.push("loginEmail");
      }

      if(userSubmittedPassword==""){
        tempErrorInputIds.push("password"); 
      }
      changeErroredInputIds(tempErrorInputIds);

    }else{
      changeLoggingInStatus(true);

      const {confirmation,data}=await loginProfile(
        userSubmittedEmail,
        userSubmittedPassword);

      if(confirmation=="Success"){
        const {
          message:{
            profile,
            tokens
          }
        }=data;
        const reduxInforamtion={
          ...tokens,
          ...profile
        }
        dispatcher(initializeProfile(reduxInforamtion));
        history.push('/dashboard');

      }else{
        const {
          message,
          statusCode
        }=data;
        let loginErrorMessage;
        debugger;
        if(statusCode==400){
          loginErrorMessage={
            header:"Login error",
            description:"Please check if you have the correct format for your login information and please try again"
          }
        }else if(statusCode==401){
          loginErrorMessage={
            header:"Login error",
            description:"The password you have submitted does not match the password in our system. Please try again"
          }
        }else{
          loginErrorMessage={
            header:"Internal Server Error",
            description:"Unfortunately there has been an error on our part. Please try again later"
          }
        }
        changeErrorMessage(loginErrorMessage);
        changeLoginErrorAlertDisplay(true);
      }
      changeLoggingInStatus(false);
    }
  }

  const clearInputField=(id)=>{
    debugger;
    let isInputErroredOut=false;
    for(var i=0;i<erroredInputIds.length;i++){
      if(erroredInputIds[i]==id){
        isInputErroredOut=true;
        erroredInputIds.splice(i,1);
        break;
      }
    }
    if(isInputErroredOut){
      changeErroredInputIds([...erroredInputIds]);
    }
  }

  const closeErrorAlertScreen=()=>{
    changeLoginErrorAlertDisplay(false);
  }

  const loginErrorAlertModal=()=>{
    return(
      <React.Fragment>
        {displayLoginErrorAlert==true &&(
          <ErrorAlertSystem
            closeModal={closeErrorAlertScreen}
            targetDomId={parentContainerId}
            alertMessage={errorMessage}
          />
        )}
      </React.Fragment>
    )
  }


	return createPortal(
		<React.Fragment>
      {loginErrorAlertModal()}
			<Container>
				<p style={{fontSize:"24px"}}>
					<b>Login</b>
				</p>
				<hr style={HorizontalLineCSS}/>

        <RequiredFieldNotification
          id={"loginEmail"}
          InputComponent={
            <LoginBox 
              id="loginEmail" 
              placeholder="Email"
              onClick={()=>clearInputField("loginEmail")}
            />
          }
          erroredInputIds={erroredInputIds}
        />

        <RequiredFieldNotification
          id={"password"}
          InputComponent={
            <LoginBox id="password" placeholder="Password"
              style={{webkitTextSecurity:"circle"}}
              onClick={()=>clearInputField("password")}
            />
          }
          erroredInputIds={erroredInputIds}
        />
        {logginInStatus==true?
          <p>Please wait...</p>:
          <React.Fragment>
    				<Submit onClick={()=>triggerLoginRequest()}>
    					Submit
    				</Submit>
            <div style={{display:"flex",flexDirection:"row"}}>
              <input type="checkbox" style={{cursor:"pointer"}}
                onClick={()=>history.push(`/passwordReset`)}
              />
              <p style={{marginLeft:"2%",color:Color_Constants.PRIMARY_COLOR}}>Update Password</p>
            </div>
          </React.Fragment>
        }


			</Container>
			<ShadowContainer onClick={()=>closeModal()}/>
		</React.Fragment>
	,document.getElementById("landingPage"))
}

export default SignIn;



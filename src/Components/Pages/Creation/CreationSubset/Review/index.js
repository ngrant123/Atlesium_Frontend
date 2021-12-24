import React,{useState,useEffect} from "react";
import styled from "styled-components";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import AtlesiumLogo from "../../../../../Assets/Logos/AtlesiumLogo.svg";
import Color_Constants from "../../../../../Utils/ColorConstants.js";
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import LoadingAnimation from "../../../../UniversalComponents/Loading/index.js";
import {createReticanOverview} from "../../../../../Actions/Requests/ReticanRequests/Adapter/ReticanCreation.js";
import AlertSystem from "../../../../UniversalComponents/Skeletons/Alerts.js";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Container=styled.div`
	width:100%;
	height:100%;
`;


const ScriptContainer=styled.div`
	width:100%;
	border-radius:5px;
	height:50px;
	background-color:#F6F6F6;
	display:flex;
	align-items:center;
	padding:5px;
	overflow-x:auto;
`;

const ScriptParams=styled.div`
	width:100%;
	border-radius:5px;
	height:300px;
	border-style:solid;
	border-width:1px;
	border-color:${Color_Constants.GREY};
	padding:5%;
	font-size:18px;
`;

const CloseButtonCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	padding:"10px",
	color:"white",
	height:"60px",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:Color_Constants.PRIMARY_COLOR,
	cursor:"pointer",
	width:"20%",
	display:"flex",
	flexDirection:"row",
	justifyContent:"center",	
	alignItems:"center",
	borderRadius:"5px",
	marginTop:"5%",
	fontSize:"18px"
}

const Review=({progressScreen,reticanAssembly})=>{
	console.log(reticanAssembly);
	const [displayLoadingAnimation,changeDisplayLoadingAnimation]=useState(true);
	const [displayReticanOverviewCreationErrorAlert,changeReticanOverviewCreationErrorDisplay]=useState(false);
	const [alertMessage,changeAlertMessage]=useState();
	const [reticanOverviewId,changeReticanOverviewId]=useState();
	const [displayCopySuccessAlert,changeCopySuccessDisplay]=useState(false);

	const profileId=useSelector(state=>state.personalInformation._id);


	const script="<script defer data-domain=(1) src=(2)></script>"

	useEffect(()=>{
		const processReticanOverviewCreation=async()=>{
			const {confirmation,data}=await createReticanOverview({
				profileId,
				reticanInformation:reticanAssembly
			});
			changeDisplayLoadingAnimation(false);
			if(confirmation=="Success"){
				const {message}=data;
				console.log(message);
				changeReticanOverviewId(message);
			}else{
				const {statusCode}=data;
				let reticanOverviewCreationErrorMessage;
				if(statusCode==400){
					reticanOverviewCreationErrorMessage={
	            		header:"Retican Overview Creation Error",
	            		description:"Unfortunately there has been an error when creating your retican overview. Please try again"
					}
				}else{
					reticanOverviewCreationErrorMessage={
	            		header:"Internal Server Error",
	            		description:"Unfortunately there has been an error on our part. Please try again later"
					}
				}
				changeAlertMessage(reticanOverviewCreationErrorMessage);
				changeReticanOverviewCreationErrorDisplay(true);
			}
		}

		processReticanOverviewCreation();
	},[]);

	const closeErrorAlertScreen=()=>{
		changeReticanOverviewCreationErrorDisplay(false);
	}

	const reticanCreationErrorAlertModal=()=>{
	    return(
	      <React.Fragment>
	        {displayReticanOverviewCreationErrorAlert==true &&(
	          <AlertSystem
	            closeModal={closeErrorAlertScreen}
	            targetDomId={"reticanReview"}
	            alertMessage={alertMessage}
	          />
	        )}
	      </React.Fragment>
	    )
  	}

  	const copyToClipboard=()=>{
  		const clipboardText=`<script defer data-domain=${reticanAssembly.websiteName} src=${reticanOverviewId}></script>`
  		navigator.clipboard.writeText(clipboardText);
  		let copySuccessAlertMessage={
    		header:"Copy Successful"
		}
		changeAlertMessage(copySuccessAlertMessage);
		changeCopySuccessDisplay(true);
  	}

  	const closeCopySuccessAlert=()=>{
  		changeCopySuccessDisplay(false);
  	}

  	const copySuccessAlert=()=>{
  		return(
  			<React.Fragment>
  				{displayCopySuccessAlert==true &&(
 					<AlertSystem
			            closeModal={closeCopySuccessAlert}
			            targetDomId={"reticanReview"}
			            alertMessage={alertMessage}
			          />
  				)}
  			</React.Fragment>
  		)
  	}	

	return(
		<Container id="reticanReview">
			{copySuccessAlert()}
			{reticanCreationErrorAlertModal()}
			{displayLoadingAnimation==true?
				<div style={{position:"relative",width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
					<LoadingAnimation
						loadingText={"Processing reticans..."}
						secondaryText={"This process can take some time so if you want to you can head over to your dashboard and we'll let you kow via email when this is done."}
					/>
				</div>:
				<React.Fragment>
					<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
						<ArrowBackIosRoundedIcon
							onClick={()=>progressScreen("reticanDetails")}
							style={{fontSize:"18",marginTop:"-10px",cursor:"pointer"}}
						/>
						<p style={{fontSize:"18px",marginLeft:"4%"}}>
							<b>Review</b>
						</p>
					</div>

					<div style={{display:"flex",flexDirection:"row",width:"90%"}}>
						<div>
							<img src={AtlesiumLogo} 
								style={{width:"300px",height:"230px",borderRadius:"50%"}}
							/>
							<div style={{width:"100%",display:"flex",justifyContent:"center"}}>
								<p style={{width:"60%"}}>Copy the script tag and add it to your websites header file</p>
							</div>
						</div>
						<div style={{display:"flex",flexDirection:"column",width:"90%",marginLeft:"5%"}}>
							<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
								<ScriptContainer>
									<p style={{fontSize:"18px"}}>
										<b>{script}</b>
									</p>
								</ScriptContainer>
								<SaveRoundedIcon
									onClick={()=>copyToClipboard()}
									style={{fontSize:"24",marginLeft:"5%",cursor:"pointer"}}
								/>
							</div>

							<ScriptParams style={{marginTop:"5%"}}>
								<p>
									<b>(1)= " {reticanAssembly.websiteName} "</b>
								</p>
								<p>
									<b>(2)= " {reticanOverviewId} "</b>
								</p>
							</ScriptParams>

							<Link to={{pathname:`/dashboard`}} style={{textDecoration:"none"}}>
								<div style={CloseButtonCSS}>
									<p style={{color:Color_Constants.PRIMARY_COLOR}}>Close</p>
								</div>
							</Link>
						</div>
					</div>
				</React.Fragment>
			}
		</Container>
	)
}


export default Review;
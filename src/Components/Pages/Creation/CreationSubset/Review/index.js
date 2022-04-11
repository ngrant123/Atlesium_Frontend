import React,{useState,useEffect} from "react";
import styled from "styled-components";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import AtlesiumLogo from "../../../../../Assets/Logos/AtlesiumLogo.svg";
import Color_Constants from "../../../../../Utils/ColorConstants.js";
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import LoadingAnimation from "../../../../UniversalComponents/Loading/index.js";
import {createReticanOverview} from "../../../../../Actions/Requests/ReticanRequests/Adapter/ReticanCreation.js";
import AlertSystem from "../../../../UniversalComponents/Skeletons/Alerts.js";
import {useSelector,useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {tokensRegeneration} from "../../../../../Actions/Tasks/UpdateTokens.js";

const Container=styled.div`
	width:100%;
	height:100%;

	@media screen and (max-width:1370px){
		#reviewResults{
			flex-direction:column !important;
		}
		#atlesiumLogo{
			display:none !important;
		}
		#copyScriptDescription{
			width:100% !important;
		}

		#scriptParentDiv{
			margin-left:0% !important;
		}

		#scriptContents{
			margin-left:0% !important;
			margin-top:5% !important;
		}

		#closeButton{
			width:100% !important;
			height:40px !important;
		}
	}
`;


const ScriptContainer=styled.div`
	width:100%;
	border-radius:5px;
	height:50px;
	background-color:#F6F6F6;
	padding:5px;
	overflow-y:auto;


	@media screen and (max-width:650px){
		height:80px;
		#script{
			font-size:14px !important;
		}
	}
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
	overflow-y:auto;
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

/*
	Now that there is an alert message modal on the creation set index.js file, alert modal
	should be  refactored
*/

const Review=({progressScreen,reticanAssembly})=>{
	const [displayLoadingAnimation,changeDisplayLoadingAnimation]=useState(true);
	const [displayReticanOverviewCreationErrorAlert,changeReticanOverviewCreationErrorDisplay]=useState(false);
	const [alertMessage,changeAlertMessage]=useState();
	const [reticanOverviewId,changeReticanOverviewId]=useState();
	const [displayCopySuccessAlert,changeCopySuccessDisplay]=useState(false);

	const {
		_id,
		accessToken,
		refreshToken
	}=useSelector(state=>state.personalInformation);
	const dispatch=useDispatch();

	const urlHeader=process.env.NODE_ENV=='production'?
					"https://v1.atlesium.com":
					"http://localhost:4002";

	const miscroserviceDispatchConnection=`${urlHeader}/retrieveInitialReticanFile?reticanOverviewId=${reticanOverviewId}&targetDivId=landingPage`;
	const script=`<script>
		const app=document.getElementById("landingPage");
	   	if(app!=null){
	        let xhr = new XMLHttpRequest();
	        xhr.open('get', '${miscroserviceDispatchConnection}');
	        xhr.send();

	        xhr.onload = function() {
	            const prospective=document.createElement('div');

	            prospective.innerHTML=xhr.response;
	            prospective.id="atlesium_div";
	            app.after(prospective);

	            var s = document.createElement('script');
	            s.innerHTML =document.getElementById("atlesium_script").innerHTML;
	            document.getElementById("atlesium_script").parentNode.appendChild(s);
	            document.getElementById("atlesium_script").parentNode.removeChild(document.getElementById("atlesium_script"));
	        };
	    }
	</script>`;

		const presentationScription=`<script>
			const app=document.getElementById((2));
		   	if(app!=null){
		        let xhr = new XMLHttpRequest();
		        xhr.open('get',(1));
		        xhr.send();

		        xhr.onload = function() {
		            const prospective=document.createElement('div');

		            prospective.innerHTML=xhr.response;
		            prospective.id="atlesium_div";
		            app.after(prospective);

		            var s = document.createElement('script');
		            s.innerHTML =document.getElementById("atlesium_script").innerHTML;
		            document.getElementById("atlesium_script").parentNode.appendChild(s);
		            document.getElementById("atlesium_script").parentNode.removeChild(document.getElementById("atlesium_script"));
		        };
		    }
		</script>`

	const removeIdsFromReticanInformation=()=>{
		const {
			_id,
			...reticanAssemblySansId
		}=reticanAssembly;
		for(var i=0;i<reticanAssemblySansId.reticans.length;i++){
			const {
				_id,
				...reticanSansId
			}=reticanAssembly.reticans[i];
			reticanAssembly.reticans[i]=reticanSansId;
		}

		return reticanAssemblySansId;
	}

	useEffect(()=>{
		const processReticanOverviewCreation=async({updatedAccessToken})=>{
			if(reticanAssembly._id!=null){
				reticanAssembly=removeIdsFromReticanInformation();
			}
			const {confirmation,data}=await createReticanOverview({
				profileId:_id,
				reticanInformation:reticanAssembly,
				accessToken:updatedAccessToken==null?accessToken:updatedAccessToken
			});
			if(confirmation=="Success"){
				changeDisplayLoadingAnimation(false);
				const {message}=data;
				changeReticanOverviewId(message);
			}else{
				const {statusCode}=data;
				let reticanOverviewCreationErrorMessage;

				if(statusCode==401){
					tokensRegeneration({
						currentRefreshToken:refreshToken,
						userId:_id,
						parentApiTrigger:processReticanOverviewCreation,
						dispatch,
						parameters:{}
					})
				}else{
					changeDisplayLoadingAnimation(false);
					if(statusCode==400){
						reticanOverviewCreationErrorMessage={
		            		header:"Retican Overview Creation Error",
		            		description:"Unfortunately there has been an error when creating your retican overview. Please try again"
						}
					}else if(statusCode==404){
						reticanOverviewCreationErrorMessage={
		            		header:"Payment Processing Error",
		            		description:"Unfortunately there has been an error when processing your payment information. Please try again later"
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
		}

		processReticanOverviewCreation({});
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
  		navigator.clipboard.writeText(script);
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

					<div id="reviewResults" style={{display:"flex",flexDirection:"row",width:"90%"}}>
						<div>
							<img src={AtlesiumLogo} id="atlesiumLogo"
								style={{width:"300px",height:"230px",borderRadius:"50%"}}
							/>
							<div style={{width:"100%",display:"flex",justifyContent:"center"}}>
								<p id="copyScriptDescription" style={{width:"60%"}}>
									Copy the script tag and add it to your websites header file
								</p>
							</div>
						</div>
						<div id="scriptContents" style={{display:"flex",flexDirection:"column",width:"90%",marginLeft:"5%"}}>
							<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
								<ScriptContainer>
									<p id="script" style={{fontSize:"18px"}}>
										<b>{presentationScription}</b>
									</p>
								</ScriptContainer>
								<SaveRoundedIcon
									onClick={()=>copyToClipboard()}
									style={{fontSize:"24",marginLeft:"5%",cursor:"pointer"}}
								/>
							</div>

							<ScriptParams style={{marginTop:"5%"}}>
								<p>Parameters</p>
								<hr/>
								<p style={{color:Color_Constants.PRIMARY_COLOR}}>
									Link to altesium
								</p>
								<p>
									<b>(1)= "{miscroserviceDispatchConnection}"</b>
								</p>
								<hr/>
								<p style={{color:Color_Constants.PRIMARY_COLOR}}>
									Target div id. Works best with main page div
								</p>
								<p>
									<b>(2)="landingPage"</b>
								</p>
							</ScriptParams>

							<Link to={{pathname:`/dashboard`}} style={{textDecoration:"none"}}>
								<div id="closeButton" style={CloseButtonCSS}>
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
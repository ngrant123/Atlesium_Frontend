import React,{useState,useEffect,useContext} from "react";
import styled from "styled-components";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import Color_Constants from "../../../../../Utils/ColorConstants.js";
import {Link} from "react-router-dom";
import RequiredFieldNotification from "../../../../UniversalComponents/Notifications/RequiredFieldNotification.js";
import {clearInputField} from "../../../../../Actions/Tasks/ClearInputFields.js";
import {
	editReticanOverview
} from "../../../../../Actions/Requests/ReticanRequests/Adapter/EditRetican.js";
import {useSelector,useDispatch} from "react-redux";
import {CreationContext} from "../../CreationSet/CreationContext.js";
import {tokensRegeneration} from "../../../../../Actions/Tasks/UpdateTokens.js";

const Container=styled.div`
	width:100%;

	@media screen and (max-width:1370px){
		#reticanWebsiteInformation{
			width:60% !important;
		}
	}

	@media screen and (max-width:650px){
		#inputParentDivContainer{
			flex-direction:column !important;
		}

		#reticanWebsiteInformation{
			width:100% !important;
			font-size:14px !important;
		}
	}
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

const InitialWebInformation=(props)=>{
	const {
		progressScreen,
		reticanAssembly,
		isEditReticanDesired,
		isLoadingEditedReticanInformation
	}=props;
	console.log(reticanAssembly);
	const [erroredInputIds,changeErroredInputIds]=useState([]);
	const [isEditingReticanOverviewStatus,changeIsEditingReticanOverviewStatus]=useState(false);
	const reticanCreationConsumer=useContext(CreationContext);
	const {
		_id,
		accessToken,
		refreshToken
	}=useSelector(state=>state.personalInformation);
	const dispatch=useDispatch();

	useEffect(()=>{
		const previousInsertedWebsiteName=reticanAssembly.websiteName;
		if(previousInsertedWebsiteName!=null && isLoadingEditedReticanInformation!=true){
			document.getElementById("websiteName").value=previousInsertedWebsiteName;
		}
	},[]);

	const displayInputRequiredPrompt=()=>{
		let tempErrorInputIds=[];
		tempErrorInputIds.push("websiteName");
		changeErroredInputIds(tempErrorInputIds);
	}

	const triggerNextScreen=()=>{
		debugger;
		const websiteName=document.getElementById("websiteName").value;
		if(websiteName==""){
			displayInputRequiredPrompt();
		}else{
			progressScreen("reticanDetails",{websiteName});
		}
	}

	const validateEditReticanOverview=()=>{
		const currentWebsiteName=document.getElementById("websiteName").value;
		if(currentWebsiteName==reticanAssembly.websiteName){
			displayInputRequiredPrompt();
		}else{
			let updatedReticanOverviewInformation={
				websiteName:currentWebsiteName
			}

			triggerReticanOverviewEdit({updatedReticanOverviewInformation});
		}
	}

	const triggerReticanOverviewEdit=async({updatedReticanOverviewInformation,updatedAccessToken})=>{
		changeIsEditingReticanOverviewStatus(true);
		const {confirmation,data}=await editReticanOverview(
			reticanAssembly._id,
            updatedReticanOverviewInformation,
            _id,
            updatedAccessToken==null?accessToken:updatedAccessToken);


		let editedReticanOverviewAlertMessage;
		if(confirmation=="Success"){
			editedReticanOverviewAlertMessage={
        		header:"Retican Overview Details Edited",
        		description:""
			}
			reticanCreationConsumer.displayAlertScreen(editedReticanOverviewAlertMessage);
			changeIsEditingReticanOverviewStatus(false);
		}else{
			const {statusCode}=data;

			if(statusCode==401){
				tokensRegeneration({
					currentRefreshToken:refreshToken,
					userId:_id,
					parentApiTrigger:triggerReticanOverviewEdit,
					dispatch,
					parameters:{updatedReticanOverviewInformation}
				})
			}else{
				if(statusCode==400){
					editedReticanOverviewAlertMessage={
		        		header:"Edit Retican Overview Details Error",
		        		description:"Unfortunately there has been an error when editing your retican overview. Please try again"
					}
				}else{
					editedReticanOverviewAlertMessage={
		        		header:"Internal Server Error",
		        		description:"Unfortunately there has been an error on our part. Please try again later"
					}
				}
				reticanCreationConsumer.displayAlertScreen(editedReticanOverviewAlertMessage);
				changeIsEditingReticanOverviewStatus(false);
			}

		}

	}



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

			{isLoadingEditedReticanInformation==true?
				<p>Loading...</p>:
				<React.Fragment>
					<RequiredFieldNotification
			          id={"websiteName"}
			          InputComponent={
			          	<InputContainer 
			          		id="websiteName" 
			          		placeholder="Website Name"
			          		onClick={()=>clearInputField(changeErroredInputIds,erroredInputIds,"websiteName")}

			          	/>
			          }
			          erroredInputIds={erroredInputIds}
			        />

			        {isEditingReticanOverviewStatus==true?
			        	<p>Editing...</p>:
				        <div id="inputParentDivContainer" style={{width:"100%",display:"flex",flexDirection:"row"}}>
				        	{isEditReticanDesired==true &&(
				        		<div id="reticanWebsiteInformation" style={{...ReticanDetailsCreationCSS,marginRight:"5%"}} 
				        			onClick={()=>validateEditReticanOverview()}>
									<p>
										Edit Website Information
									</p>
									<ArrowForwardRoundedIcon
										style={{fontSize:"24"}}
									/>
								</div>
				        	)}
							<div id="reticanWebsiteInformation" 
								style={ReticanDetailsCreationCSS} onClick={()=>triggerNextScreen()}>
								<p>
									{isEditReticanDesired==true?<>Edit</>:<>Create</>} Retican Details
								</p>
								<ArrowForwardRoundedIcon
									style={{fontSize:"24"}}
								/>
							</div>
				        </div>
			        }
				</React.Fragment>
			}
		</Container>
	)
}


export default InitialWebInformation;
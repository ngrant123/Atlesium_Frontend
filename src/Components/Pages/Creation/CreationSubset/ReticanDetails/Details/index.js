import React,{useState,useEffect,useContext} from "react";
import styled from "styled-components";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import Color_Constants from "../../../../../../Utils/ColorConstants.js";
import RequiredFieldNotification from "../../../../../UniversalComponents/Notifications/RequiredFieldNotification.js";
import {clearInputField} from "../../../../../../Actions/Tasks/ClearInputFields.js";
import {ReticanOverviewConsumer} from "../ReticanOverviewCreationContext.js";

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

const ReticanDetails=({triggerProgressScreen,totalReticans})=>{
	const [erroredInputIds,changeErroredInputIds]=useState([]);
	let [currentReticansFileSize,changeCurrentReticansFileSize]=useState(0);
	const reticanOverviewConsumer=useContext(ReticanOverviewConsumer);

	useEffect(()=>{
		let compressFileReticanButtonErroredOut=false;
		for(var i=0;i<erroredInputIds.length;i++){
			if(erroredInputIds[i]=="compressFile"){
				compressFileReticanButtonErroredOut=true;
				break;
			}
		}

		if(compressFileReticanButtonErroredOut){
			clearInputField(changeErroredInputIds,erroredInputIds,"compressFile")
		}
		calculateTotalFileSize();
	},[totalReticans]);


	useEffect(()=>{
		const {reticanAssembly}=reticanOverviewConsumer;
		const previousTitle=reticanAssembly.title;
		const previousDescription=reticanAssembly.description;

		if(previousTitle!=null){
			document.getElementById("title").value=previousTitle;
		}

		if(previousDescription!=null){
			document.getElementById("description").value=previousDescription;
		}
	},[]);


	const calculateTotalFileSize=()=>{
		let totalFileSize=0;
		for(var i=0;i<totalReticans.length;i++){
			const {videoUrlSize}=totalReticans[i];
			totalFileSize+=Math.floor((videoUrlSize/(1024*1024)));
		}
		changeCurrentReticansFileSize(totalFileSize);
	}

	const validateInputs=()=>{
		debugger;
		const userSubmittedTitle=document.getElementById("title").value;
		const userSubmittedDescription=document.getElementById("description").value;

		if(userSubmittedTitle=="" || userSubmittedDescription=="" || totalReticans.length==0){
			let tempErrorIds=[];
			if(userSubmittedTitle==""){
				tempErrorIds.push("title");
			}
			if(userSubmittedDescription==""){
				tempErrorIds.push("description");
			}
			if(totalReticans.length==0){
				tempErrorIds.push("compressFile");
			}

			changeErroredInputIds([...tempErrorIds]);
		}else{
			triggerProgressScreen(
				"review",
				userSubmittedTitle,
				userSubmittedDescription)
		}	
	}

	return(
		<Container>
			<div>
				<RequiredFieldNotification
					id={"title"}
		          	InputComponent={
		          		<InputContainer
							id="title" 
							placeholder="Title"
							onClick={()=>clearInputField(changeErroredInputIds,erroredInputIds,"title")}
						/>
		         	}
		          	erroredInputIds={erroredInputIds}
				/>

				<RequiredFieldNotification
					id={"description"}
		          	InputComponent={
		          		<InputContainer 
							id="description" 
							style={{height:"200px"}} 
							placeholder="Description"
							onClick={()=>clearInputField(changeErroredInputIds,erroredInputIds,"description")}
						/>
		         	}
		          	erroredInputIds={erroredInputIds}
				/>
			</div>
			<div>
				<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",fontSize:"18px",marginTop:"15%"}}>
					<p>
						<b>Total Estimated Size:</b>
					</p>
					<p>
						<b>{currentReticansFileSize} MB</b>
					</p>
				</div>

				<RequiredFieldNotification
					id={"compressFile"}
					notificationText={"Reticans required"}
		          	InputComponent={
		          		<div id="compressFile" style={CompressFileCSS} onClick={()=>validateInputs()}>
							<p>Compress File</p>
							<ArrowForwardRoundedIcon
								style={{fontSize:"18"}}
							/>
						</div>
		         	}
		          	erroredInputIds={erroredInputIds}
				/>
			</div>
		</Container>
	)
}

export default ReticanDetails;
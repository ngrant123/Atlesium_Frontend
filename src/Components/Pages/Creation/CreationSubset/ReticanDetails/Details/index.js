import React,{useState,useEffect,useContext} from "react";
import styled from "styled-components";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import Color_Constants from "../../../../../../Utils/ColorConstants.js";
import RequiredFieldNotification from "../../../../../UniversalComponents/Notifications/RequiredFieldNotification.js";
import {clearInputField} from "../../../../../../Actions/Tasks/ClearInputFields.js";
import {
	editReticans,
	editReticanOverview
} from "../../../../../../Actions/Requests/ReticanRequests/Adapter/EditRetican.js";
import {ReticanOverviewConsumer} from "../ReticanOverviewCreationContext.js";
import {CreationContext} from "../../../CreationSet/CreationContext.js";
import {useSelector,useDispatch} from "react-redux";
import {tokensRegeneration} from "../../../../../../Actions/Tasks/UpdateTokens.js";
import {createReticanOverview} from "../../../../../../Actions/Requests/ReticanRequests/Adapter/ReticanCreation.js";

const Container=styled.div`
	width:40%;
	display:flex;
	flex-direction:column;
	justify-content:space-between;
	margin-right:2%;

	@media screen and (max-width:1370px){
		width:100%;
	}

	@media screen and (max-width:650px){
		#reticanEditOptions{
			flex-direction:column !important;
		}
		#editRetican{
			margin-left:0% !important;
			margin-top:5% !important;
		}
	}
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

const ReticanDetails=(props)=>{
	const {
		triggerProgressScreen,
		totalReticans,
		isEditReticanDesired,
		originalHeaderColor,
		selectedColorHeader,
		triggerUpdateReticanParentInformation,
		triggerDisplayReticanProcessingModal
	}=props;

	const [erroredInputIds,changeErroredInputIds]=useState([]);
	let [currentReticansFileSize,changeCurrentReticansFileSize]=useState(0);
	const [isEditing,changeIsEditingStatus]=useState(false);
	const [originalReticanPointerMapping,changeOriginalReticanPointerMapping]=useState();

	const reticanOverviewConsumer=useContext(ReticanOverviewConsumer);
	const reticanCreationConsumer=useContext(CreationContext);
	const {
		_id,
		accessToken,
		refreshToken
	}=useSelector(state=>state.personalInformation);
	const dispatch=useDispatch();

	useEffect(()=>{
		if(selectedColorHeader!=originalHeaderColor){
			clearInputField(changeErroredInputIds,erroredInputIds,"editReticanOverview");
		}

	},[selectedColorHeader]);

	useEffect(()=>{
		let compressFileReticanButtonErroredOut=false;
		for(var i=0;i<erroredInputIds.length;i++){
			if(erroredInputIds[i]=="compressFile"){
				compressFileReticanButtonErroredOut=true;
				break;
			}
		}

		if(compressFileReticanButtonErroredOut){
			triggerClearInputField("compressFile");
		}
		calculateTotalFileSize();
		clearInputField(changeErroredInputIds,erroredInputIds,"editRetican");
		// if(originalReticanPointerMapping!=null){

		// 	const {reticanPointerAlterationStatus}=isReticanPointersAltered();
		// 	if(reticanPointerAlterationStatus){
		// 		clearInputField(changeErroredInputIds,erroredInputIds,"editRetican");
		// 	}
		// }
	},[totalReticans]);

	useEffect(()=>{
		clearInputField(changeErroredInputIds,erroredInputIds,"editRetican");
	},[reticanCreationConsumer.editedReticans]);


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
		if(totalReticans.length!=0){
			constructReticanPointerMapping();
		}
	},[]);

	const constructReticanPointerMapping=()=>{
		const reticanPointers=new Map();
		for(var i=0;i<totalReticans.length;i++){
			const {
				previousCardPointer,
				nextCardPointer,
				_id
			}=totalReticans[i];

			reticanPointers.set(_id,{
				previousCardPointer,
				nextCardPointer
			});
		}

		changeOriginalReticanPointerMapping(reticanPointers);
	}


	const calculateTotalFileSize=()=>{
		let totalFileSize=0;
		for(var i=0;i<totalReticans.length;i++){
			const {videoUrlSize}=totalReticans[i];
			totalFileSize+=Math.floor((videoUrlSize/(1024*1024)));
		}
		changeCurrentReticansFileSize(totalFileSize);
	}

	const validateInputs=()=>{
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
			debugger;
			let {reticanAssembly}=reticanOverviewConsumer;
			reticanAssembly={
				...reticanAssembly,
				title:userSubmittedTitle,
				description:userSubmittedDescription
			}

			processReticanOverviewCreation({updatedReticanAssemblyInformation:reticanAssembly})
		}	
	}

	const validateEditReticanOverview=()=>{
		const {reticanAssembly}=reticanOverviewConsumer;
		const previousDescription=reticanAssembly.description;
		const previousTitle=reticanAssembly.title;

		const currentDescription=document.getElementById("description").value;
		const currentTitle=document.getElementById("title").value;
		const currentHeaderColor=selectedColorHeader==null?null:selectedColorHeader.color;
		const currentoriginalHeaderColor=originalHeaderColor==null?null:originalHeaderColor.color;


		if(previousDescription==currentDescription && currentTitle==previousTitle && currentHeaderColor==currentoriginalHeaderColor){
			let tempErrorIds=[];
			tempErrorIds.push("editReticanOverview");

			changeErroredInputIds([...tempErrorIds]);
		}else{
			let updatedReticanOverviewInformation={};
			if(previousDescription!=currentDescription){
				updatedReticanOverviewInformation={
					...updatedReticanOverviewInformation,
					description:currentDescription
				}
			}
			if(previousTitle!=currentTitle){
				updatedReticanOverviewInformation={
					...updatedReticanOverviewInformation,
					title:currentTitle
				}		
			}	

			if(originalHeaderColor!=selectedColorHeader){
				updatedReticanOverviewInformation={
					...updatedReticanOverviewInformation,
					headerColor:selectedColorHeader
				}
			}
			triggerEditReticanOverview({updatedReticanOverviewInformation});
		}
	}

	const removeIdsFromReticanInformation=(reticanAssembly)=>{
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

		const processReticanOverviewCreation=async({updatedAccessToken,updatedReticanAssemblyInformation})=>{
			if(updatedReticanAssemblyInformation._id!=null){
				updatedReticanAssemblyInformation=removeIdsFromReticanInformation(
					updatedReticanAssemblyInformation);
			}
			createReticanOverview({
				profileId:_id,
				reticanInformation:updatedReticanAssemblyInformation,
				accessToken:updatedAccessToken==null?accessToken:updatedAccessToken
			});
			triggerDisplayReticanProcessingModal();
		}


	const triggerEditReticanOverview=async({updatedReticanOverviewInformation,updatedAccessToken})=>{
		changeIsEditingStatus(true);
		const {confirmation,data}=await editReticanOverview(
			reticanOverviewConsumer.reticanAssembly._id,
			updatedReticanOverviewInformation,
			_id,
            updatedAccessToken==null?accessToken:updatedAccessToken);


		let editedReticanOverviewAlertMessage;
		if(confirmation=="Success"){
			triggerUpdateReticanParentInformation({...updatedReticanOverviewInformation});
			editedReticanOverviewAlertMessage={
        		header:"Retican Overview Details Edited",
        		description:""
			}
			reticanCreationConsumer.displayAlertScreen(editedReticanOverviewAlertMessage);
			changeIsEditingStatus(false);
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				tokensRegeneration({
					currentRefreshToken:refreshToken,
					userId:_id,
					parentApiTrigger:triggerEditReticanOverview,
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
				changeIsEditingStatus(false);
			}
		}
	}

	const isReticanPointersAltered=()=>{

		let reticanPointerAlterationStatus=false;
		let editedReticanPointers={};
		let editedReticanMapping=new Map();

		for(var i=0;i<totalReticans.length;i++){
			const {
				previousCardPointer,
				nextCardPointer
			}=totalReticans[i];

			if(reticanPointerAlterationStatus==false){
				const originalSpecifiedIdReticanPreviousPointer=originalReticanPointerMapping.get(totalReticans[i]._id).previousCardPointer;
				const originalSpecifiedIdReticanNextPointer=originalReticanPointerMapping.get(totalReticans[i]._id).nextCardPointer;

				if(originalSpecifiedIdReticanPreviousPointer!=previousCardPointer || originalSpecifiedIdReticanNextPointer!=nextCardPointer){
					reticanPointerAlterationStatus=true;
				}
			}
			editedReticanMapping.set(totalReticans[i]._id,{
				previousCardPointer,
				nextCardPointer
			});


			editedReticanPointers[totalReticans[i]._id]={
				previousCardPointer,
				nextCardPointer
			}
		}
		return{
			reticanPointerAlterationStatus,
			editedReticanPointers
		};
	}

	const validateRetican=()=>{
		const {
			reticanPointerAlterationStatus,
			editedReticanPointers
		}=isReticanPointersAltered();

		if(!reticanPointerAlterationStatus && reticanCreationConsumer.editedReticans.length==0){
			let tempErrorIds=[];
			tempErrorIds.push("editRetican");

			changeErroredInputIds([...tempErrorIds]);
		}else{
			let editedReticansInformation={
				reticanOverviewId:reticanOverviewConsumer.reticanAssembly._id,
				profileId:_id
			};

			if(reticanPointerAlterationStatus){
				editedReticansInformation={
					...editedReticansInformation,
					reticanMappings:editedReticanPointers
				}
			}

			if(reticanCreationConsumer.editedReticans.length>0){
				editedReticansInformation={
					...editedReticansInformation,
					updatedReticans:reticanCreationConsumer.editedReticans
				}
			}
			triggerEditReticans({editedReticansInformation});
		}
	}

	const triggerEditReticans=async({editedReticansInformation,updatedAccessToken})=>{
		editReticans({
			...editedReticansInformation,
			reticanOverviewTitle:reticanOverviewConsumer.reticanAssembly.title,
			accessToken:updatedAccessToken==null?accessToken:updatedAccessToken
		});
		triggerDisplayReticanProcessingModal();
	}

	const triggerClearInputField=(divId)=>{
		if(isEditReticanDesired==false){
			clearInputField(changeErroredInputIds,erroredInputIds,divId);
		}else{
			clearInputField(changeErroredInputIds,erroredInputIds,"editReticanOverview");
		}
	}

	const fileSizeType=()=>{
		return(
			<React.Fragment>
				{currentReticansFileSize>0?<>MB</>:<>KB</>}
			</React.Fragment>
		)
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
							onClick={()=>triggerClearInputField("title")}
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
							onClick={()=>triggerClearInputField("description")}
						/>
		         	}
		          	erroredInputIds={erroredInputIds}
				/>
			</div>
			<div>
				<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",fontSize:"18px",marginTop:"2%"}}>
					<p>
						<b>Total Estimated Size:</b>
					</p>
					<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
						<p><b>{currentReticansFileSize}</b></p>
						<p style={{marginLeft:"2px"}}><b>{fileSizeType()}</b></p>
					</div>
				</div>

				{isEditReticanDesired==true?
					<React.Fragment>
						{isEditing==true?
							<p>Editing...</p>:
							<div id="reticanEditOptions" style={{display:"flex",flexDirection:"row",width:"100%"}}>
								<div style={{display:"flex",flexDirection:"column"}}>
									<RequiredFieldNotification
										id={"editReticanOverview"}
										notificationText={"Alter current retican overview details"}
							          	InputComponent={
							          		<div id="editReticanOverview" style={CompressFileCSS} onClick={()=>validateEditReticanOverview()}>
												<p>Edit Retican Overivew</p>
												<ArrowForwardRoundedIcon
													style={{fontSize:"18"}}
												/>
											</div>
							         	}
							    		erroredInputIds={erroredInputIds}
									/>
								</div>
								<div style={{display:"flex",flexDirection:"column"}}>
									<RequiredFieldNotification
										id={"editRetican"}
										notificationText={"Alter current reticans"}
							          	InputComponent={
							          		<div id="editRetican" style={{...CompressFileCSS,marginLeft:"2%"}} onClick={()=>validateRetican()}>
												<p>Edit Retican</p>
												<ArrowForwardRoundedIcon
													style={{fontSize:"18"}}
												/>
											</div>
							         	}
							    		erroredInputIds={erroredInputIds}
									/>
								</div>
							</div>
						}
					</React.Fragment>:
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
				}
			</div>
		</Container>
	)
}

export default ReticanDetails;
import React,{useState,useEffect} from "react";
import styled from "styled-components";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import Color_Constants from "../../../../../Utils/ColorConstants.js";
import {Link} from "react-router-dom";
import RequiredFieldNotification from "../../../../UniversalComponents/Notifications/RequiredFieldNotification.js";
import {clearInputField} from "../../../../../Actions/Tasks/ClearInputFields.js";

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

const InitialWebInformation=({progressScreen,reticanAssembly,isEditReticanDesired})=>{
	console.log(reticanAssembly);
	const [erroredInputIds,changeErroredInputIds]=useState([]);

	useEffect(()=>{
		const previousInsertedWebsiteName=reticanAssembly.websiteName;
		if(previousInsertedWebsiteName!=null){
			document.getElementById("websiteName").value=previousInsertedWebsiteName;
		}
	},[]);

	const triggerNextScreen=()=>{
		debugger;
		const websiteName=document.getElementById("websiteName").value;
		if(websiteName==""){
			let tempErrorInputIds=[];
			tempErrorInputIds.push("websiteName");
			changeErroredInputIds(tempErrorInputIds);
		}else{
			progressScreen("reticanDetails",{websiteName});
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

			<div style={ReticanDetailsCreationCSS} onClick={()=>triggerNextScreen()}>
				<p>
					{isEditReticanDesired==true?<>Edit</>:<>Create</>} Retican Details
				</p>
				<ArrowForwardRoundedIcon
					style={{fontSize:"24"}}
				/>
			</div>
		</Container>
	)
}


export default InitialWebInformation;
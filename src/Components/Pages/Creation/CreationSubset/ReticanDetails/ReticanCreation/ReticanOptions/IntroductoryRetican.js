import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Color_Constants from "../../../../../../../Utils/ColorConstants.js";
import {isSpecialCharactersSeen} from "../../../../../../../Actions/Validation/SpecialCharactersAnalysis.js";


const InputContainer=styled.textarea`
	position:relative;
	width:100%;
	height:150px;
	border-style:solid;
	border-width:1px;
	border-color:${Color_Constants.GREY};
	resize:none;
	padding:10px;
	border-radius:5px;
	margin-top:2%;
`;

const ButtonCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	padding:"10px",
	color:Color_Constants.PRIMARY_COLOR,
	height:"60px",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:Color_Constants.PRIMARY_COLOR,
	cursor:"pointer",
	display:"flex",
	flexDirection:"row",
	justifyContent:"center",	
	alignItems:"center",
	borderRadius:"5px",
	marginTop:"5%",
	marginRight:"2%",
	marginBottom:"2%"
}


const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
}


const IntroductoryRetican=({displayReticanInitialOptionCreation,triggerCreateRetican,reticanInformation})=>{
	const [pageRedirects,changePageRedirects]=useState([]);
	const [introductoryText,changeIntroductoryText]=useState();
	const [currentSelectedComponent,changeCurrentSelectedComponent]=useState("initial");
	const [errorMessage,changeErrorMessage]=useState();

	useEffect(()=>{
		if(currentSelectedComponent=="linksCreation"){
			document.getElementById("pageRedirectUrl").value="";
			document.getElementById("pageRedirectDescription").value="";
		}else if(currentSelectedComponent=="pageDescription"){
			document.getElementById("introductoryText").value=introductoryText==null?"":introductoryText;
		}
	},[currentSelectedComponent]);


	useEffect(()=>{
		if(reticanInformation!=null){
			const previousPageRedirects=reticanInformation.pageRedirects;
			const previousIntroductoryText=reticanInformation.introductoryText;

			changePageRedirects([...previousPageRedirects]);
			changeIntroductoryText(previousIntroductoryText);
		}
	},[]);

	useEffect(()=>{
		if(errorMessage!=null){
			setTimeout(()=>{
				changeErrorMessage(null);
			},5000);
		}
	},[errorMessage]);

	const triggerAddPageRedirect=()=>{
		const urlRedirect=document.getElementById("pageRedirectUrl").value;
		const pageRedirectDescription=document.getElementById("pageRedirectDescription").value;
		const urlRedirectSpecialCharacterIndicator=isSpecialCharactersSeen(urlRedirect);

		if(urlRedirect=="" || pageRedirectDescription=="" || urlRedirectSpecialCharacterIndicator){
			let errorMessage;
			if(urlRedirect=="" || pageRedirectDescription==""){
				errorMessage="Please enter a url redirect or page direct description";
			}else{
				errorMessage="No special characters allowed in url redirect link";
			}


			changeErrorMessage(errorMessage)
		}else{		
			const redirectInformation={
				urlRedirect:document.getElementById("pageRedirectUrl").value,
				pageRedirectDescription:document.getElementById("pageRedirectDescription").value
			}

			pageRedirects.push(redirectInformation);

			changePageRedirects([...pageRedirects]);
			changeCurrentSelectedComponent("initial")	
		}


	}

	const triggerDisplayPageRedirectionCreation=()=>{
		changeCurrentSelectedComponent("linksCreation");
	}

	const deletePageRedirection=(currentIndex)=>{
		pageRedirects.splice(currentIndex,1);
		changePageRedirects([...pageRedirects]);
	}

	const triggerDisplayPageIntroductionCreation=()=>{
		changeCurrentSelectedComponent("pageDescription");
	}

	const addIntroductoryText=()=>{
		const introductoryText=document.getElementById("introductoryText").value;
		if(introductoryText==""){
			changeErrorMessage("Please enter a page description");
		}else{
			changeIntroductoryText(introductoryText);
			changeCurrentSelectedComponent("initial");
		}
	}

	const deletePageRedirectIcon=(currentIndex)=>{
		return(
			<svg xmlns="http://www.w3.org/2000/svg" onClick={()=>deletePageRedirection(currentIndex)}
				style={{cursor:"pointer"}}
				class="icon icon-tabler icon-tabler-circle-x"
				 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
				 stroke-linecap="round" stroke-linejoin="round">
				  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				  <circle cx="12" cy="12" r="9" />
				  <path d="M10 10l4 4m0 -4l-4 4" />
			</svg>
		)
	}

	const ComponenetDecider=({componentName,children})=>{
		return children.filter(data=>data.props.componentName==componentName);
	}

	const Initializer=()=>{
		return(
			<React.Fragment>
				<p style={{marginTop:"2%"}}>{introductoryText}</p>

				<div style={{display:"flex",flexDirection:"column"}}>
					<div style={{display:"flex",flexDirection:"row"}}>
						<div style={ButtonCSS} onClick={()=>triggerDisplayPageIntroductionCreation()}>
							{introductoryText==null?
								<React.Fragment>
									Create Page Introduction
								</React.Fragment>:
								<React.Fragment>
									Edit Page Introduction
								</React.Fragment>
							}
						</div>

						{/*
							{pageRedirects.length<3 &&(
								<div style={ButtonCSS} onClick={()=>triggerDisplayPageRedirectionCreation()}>
									Add Page Redirect
								</div>
							)}
						*/}
					</div>
					<hr style={HorizontalLineCSS}/>
					<div style={{display:"flex",flexDirection:"row"}}>
						<div style={ButtonCSS} onClick={()=>displayReticanInitialOptionCreation()}>
							Close
						</div>

						<div style={ButtonCSS} onClick={()=>triggerCreateRetican({
							pageRedirects,
							introductoryText
						})}>
							Create Retican
						</div>
					</div>
				</div>
				<hr/>
				<div style={{display:"flex",flexDirection:"column"}}>
					{pageRedirects.map((data,index)=>
						<li>
							<div style={{display:"flex",flexDirection:"row"}}>
								{data.urlRedirect}
								{deletePageRedirectIcon(index)}
							</div>
						</li>
					)}
				</div>
			</React.Fragment>
		)
	}

	const PageDescription=()=>{
		return(
			<React.Fragment>
				<InputContainer 
					id="introductoryText" 
					placeholder="Enter a written description of your introduction here"
				/>

				{errorMessage!=null &&(
					<p style={{color:Color_Constants.CALL_TO_ACTION_COLOR}}>
						<b>{errorMessage}</b>
					</p>
				)}

				<div style={{display:"flex",flexDirection:"row"}}>	
					<div style={ButtonCSS} onClick={()=>changeCurrentSelectedComponent("initial")}>
						Close
					</div>
					<div style={ButtonCSS} onClick={()=>addIntroductoryText()}>
						Add Introductory Text
					</div>
				</div>
			</React.Fragment>
		)
	}

	const Links=()=>{
		return(
			<React.Fragment>
				<InputContainer 
					id="pageRedirectUrl" 
					placeholder="Enter a link on your website you want a button to redirect to. E.g. signup. The final link will be www.youwebsite.com/signup"
				/>
				<InputContainer 
					id="pageRedirectDescription" 
					placeholder="Enter a description of you link. For example if you had used signup above you can write Sign-Up"
				/>

				{errorMessage!=null &&(
					<p style={{color:Color_Constants.CALL_TO_ACTION_COLOR}}>
						<b>{errorMessage}</b>
					</p>
				)}
				<div style={{display:"flex",flexDirection:"row"}}>
					<div style={ButtonCSS} onClick={()=>changeCurrentSelectedComponent("initial")}>
						Back
					</div>
					<div style={ButtonCSS} onClick={()=>triggerAddPageRedirect()}>
						Add
					</div>
				</div>
			</React.Fragment>
		)
	}



	return(
		<React.Fragment>
			<ComponenetDecider componentName={currentSelectedComponent}>
				<Initializer componentName={"initial"}/>
				<PageDescription componentName={"pageDescription"}/>
				{/*
					<Links componentName={"linksCreation"}/>
				*/}
			</ComponenetDecider>

		</React.Fragment>
	)
}

export default IntroductoryRetican;
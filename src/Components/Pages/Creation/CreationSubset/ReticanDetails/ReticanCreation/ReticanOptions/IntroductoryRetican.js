import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Color_Constants from "../../../../../../../Utils/ColorConstants.js";


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

const IntroductoryRetican=({displayReticanInitialOptionCreation,triggerCreateRetican,reticanInformation})=>{
	const [pageRedirects,changePageRedirects]=useState([]);
	const [introductoryText,changeIntroductoryText]=useState();
	const [displayPageRedirectCreation,changeDisplayPageRedirectionCreation]=useState(false);

	useEffect(()=>{
		if(displayPageRedirectCreation){
			document.getElementById("pageRedirectUrl").value="";
			document.getElementById("pageRedirectDescription").value="";
		}else{
			document.getElementById("introductoryText").value=introductoryText==null?"":introductoryText;
		}
	},[displayPageRedirectCreation]);


	useEffect(()=>{
		if(reticanInformation!=null){
			const previousPageRedirects=reticanInformation.pageRedirects;
			const previousIntroductoryText=reticanInformation.introductoryText;

			changePageRedirects([...previousPageRedirects]);
			document.getElementById("introductoryText").value=previousIntroductoryText;
		}
	},[]);

	const triggerAddPageRedirect=()=>{


		const redirectInformation={
			urlRedirect:document.getElementById("pageRedirectUrl").value,
			pageRedirectDescription:document.getElementById("pageRedirectDescription").value
		}

		pageRedirects.push(redirectInformation);

		changePageRedirects([...pageRedirects]);
		changeDisplayPageRedirectionCreation(false);		

	}

	const triggerDisplayPageRedirectionCreation=()=>{
		changeIntroductoryText(document.getElementById("introductoryText").value);
		changeDisplayPageRedirectionCreation(true)
	}

	const deletePageRedirection=(currentIndex)=>{
		pageRedirects.splice(currentIndex,1);
		changePageRedirects([...pageRedirects]);
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

	return(
		<React.Fragment>
			{displayPageRedirectCreation==false?
				<React.Fragment>
					<InputContainer 
						id="introductoryText" 
						placeholder="Enter a written description of your introduction here"
					/>

					<div style={{display:"flex",flexDirection:"row"}}>
						<div style={ButtonCSS} onClick={()=>displayReticanInitialOptionCreation()}>
							Close
						</div>
						{pageRedirects.length<3 &&(
							<div style={ButtonCSS} onClick={()=>triggerDisplayPageRedirectionCreation()}>
								Add Page Redirect
							</div>
						)}
						<div style={ButtonCSS} onClick={()=>triggerCreateRetican({
							pageRedirects,
							introductoryText:document.getElementById("introductoryText").value
						})}>
							Create Retican
						</div>
					</div>
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
				</React.Fragment>:
				<React.Fragment>
					<InputContainer 
						id="pageRedirectUrl" 
						placeholder="Enter a link on your website you want a button to redirect to. E.g. signup. The final link will be www.youwebsite.com/signup"
					/>
					<InputContainer 
						id="pageRedirectDescription" 
						placeholder="Enter a description of you link. For example if you had used signup above you can write Sign-Up"
					/>
					<div style={{display:"flex",flexDirection:"row"}}>
						<div style={ButtonCSS} onClick={()=>changeDisplayPageRedirectionCreation(false)}>
							Back
						</div>
						<div style={ButtonCSS} onClick={()=>triggerAddPageRedirect()}>
							Add
						</div>
					</div>
				</React.Fragment>
			}

		</React.Fragment>
	)
}

export default IntroductoryRetican;
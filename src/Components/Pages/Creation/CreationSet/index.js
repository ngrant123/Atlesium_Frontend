 import React,{useState} from "react";
 import styled from "styled-components";
 import CreationProgressBar from "../CreationSubset/ProgressBar.js";
 import InitialWebInformation from "../CreationSubset/InitialWebInfo"
 import ReticanDetails from "../CreationSubset/ReticanDetails/index.js";
 import ReviewStage from "../CreationSubset/Review/index.js";

const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	padding:0px;
	display:flex;
	flex-direction:column;
	overflow-y:auto;
	align-items:center;
	padding:15%;
	padding-top:7%;
`;

const Creation=()=>{
	const [currentSelectedComponent,changeCurrentSelectedComponent]=useState("webInformation");

	const ComponentDecider=({children,componentSelectedName})=>{
		return children.filter(child=>child.props.name==componentSelectedName);
	}

	const displaySelectedScreen=(selectedScreen)=>{
		changeCurrentSelectedComponent(selectedScreen);
	}

	return(
		<Container>
			<CreationProgressBar
				currentScreen={currentSelectedComponent}
			/>
			<div style={{marginTop:"7%",width:"100%"}}>
				<ComponentDecider componentSelectedName={currentSelectedComponent}>
					<InitialWebInformation 
						name="webInformation"
						progressScreen={displaySelectedScreen}
					/>
					<ReticanDetails 
						name="reticanDetails"
						progressScreen={displaySelectedScreen}
					/>
					<ReviewStage name="review"
						progressScreen={displaySelectedScreen}
					/>
				</ComponentDecider>
			</div>
		</Container>
	)
}

export default Creation;
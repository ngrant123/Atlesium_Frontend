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
	const [reticanAssembly,changeReticanAssembly]=useState({});

	const ComponentDecider=({children,componentSelectedName})=>{
		return children.filter(child=>child.props.name==componentSelectedName);
	}

	const displaySelectedScreen=(selectedScreen,reticanInformation)=>{
		if(reticanInformation!=null)
			updateReticanAssemblerInformation(reticanInformation);

		changeCurrentSelectedComponent(selectedScreen);
	}

	const updateReticanAssemblerInformation=(reticanInformation)=>{
		let currentReticanAssemnlyInformation=reticanAssembly;
		currentReticanAssemnlyInformation={
			...currentReticanAssemnlyInformation,
			...reticanInformation
		}
		changeReticanAssembly(currentReticanAssemnlyInformation);
	}



	return(
		<Container id="reticanCreation">
			<CreationProgressBar
				currentScreen={currentSelectedComponent}
			/>
			<div style={{marginTop:"7%",width:"100%"}}>
				<ComponentDecider componentSelectedName={currentSelectedComponent}>
					<InitialWebInformation 
						name="webInformation"
						progressScreen={displaySelectedScreen}
						reticanAssembly={reticanAssembly}
					/>
					<ReticanDetails 
						name="reticanDetails"
						progressScreen={displaySelectedScreen}
						reticanAssembly={reticanAssembly}
					/>
					<ReviewStage name="review"
						progressScreen={displaySelectedScreen}
						reticanAssembly={reticanAssembly}
					/>
				</ComponentDecider>
			</div>
		</Container>
	)
}

export default Creation;
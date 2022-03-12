import React from "react";
import styled from "styled-components";
import CircleIcon from "./CircularIcons.js";

/*
		display:flex;
	${({specifiedFlexDirection})=>
		`flex-direction:${specifiedFlexDirection};`
	}
	justify-content:space-between;
*/

const Container=styled.div`
	position:relative;
	display:flex;
	height:100%;
	width:100%;
	justify-content:center;
	align-items:center;

	@media screen and (max-width:650px){
		padding:2%;
		#campaingNavigationContainer{
			white-space:nowrap !important;
			overflow-y:hidden;
			overflow-x:auto;
			padding-top:2% !important;
		}
	}
`;

const CircleNavigationContainer=styled.div`
	background-color:green;

`;


const CampaignNavigation=({totalCards,currentSelectedIndex,specifiedDirection,triggerUpdatedSelectedIndex})=>{
	return(
		<Container>	
			<ul id="campaingNavigationContainer" style={{padding:"0px"}}>
				{totalCards.map((data,index)=>
					<li style={{listStyle:"none",display:specifiedDirection}}>
						<CircleIcon
							iteratedIndex={index}
							currentSelectedIndex={currentSelectedIndex}
							triggerUpdatedSelectedIndex={triggerUpdatedSelectedIndex}
						/>
					</li>
				)}
			</ul>
		</Container>
	)
}

export default CampaignNavigation;
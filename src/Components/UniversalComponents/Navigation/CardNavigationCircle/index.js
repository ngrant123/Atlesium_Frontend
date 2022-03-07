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
`;

const CircleNavigationContainer=styled.div`
	background-color:green;

`;


const CampaignNavigation=({totalCards,currentSelectedIndex,specifiedDirection,triggerUpdatedSelectedIndex})=>{
	return(
		<Container>	
			<ul style={{padding:"0px"}}>
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
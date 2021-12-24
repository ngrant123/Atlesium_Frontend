import React from "react";
import styled from "styled-components";
import CircleIcon from "./CircularIcons.js";

const Container=styled.div`
	position:relative;
	display:flex;
	height:100%;
	width:100%;
	justify-content:center;
	align-items:center;
`;

const CircleNavigationContainer=styled.div`
	display:flex;
	${({specifiedFlexDirection})=>
		`flex-direction:${specifiedFlexDirection};`
	}
	height:10%;
	justify-content:space-between;

`;


const CampaignNavigation=({totalCards,currentSelectedIndex,specifiedFlexDirection,triggerUpdatedSelectedIndex})=>{
	console.log(totalCards);
	console.log(currentSelectedIndex);
	return(
		<Container>	
			<CircleNavigationContainer specifiedFlexDirection={specifiedFlexDirection}>
				{totalCards.map((data,index)=>
					<CircleIcon
						iteratedIndex={index}
						currentSelectedIndex={currentSelectedIndex}
						triggerUpdatedSelectedIndex={triggerUpdatedSelectedIndex}
					/>
				)}
			</CircleNavigationContainer>
		</Container>
	)
}

export default CampaignNavigation;
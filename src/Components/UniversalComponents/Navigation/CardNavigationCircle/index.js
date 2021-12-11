import React from "react";
import styled from "styled-components";
import CircleIcon from "./CircularIcons.js";

const Container=styled.div`
	position:relative;
	display:flex;
	${({specifiedFlexDirection})=>
		`flex-direction:${specifiedFlexDirection};`
	}
	justify-content:space-between;
	align-items:center;
`;


const CampaignNavigation=({totalCards,currentSelectedIndex,specifiedFlexDirection,triggerUpdatedSelectedIndex})=>{
	console.log(totalCards);
	console.log(currentSelectedIndex);
	return(
		<Container specifiedFlexDirection={specifiedFlexDirection}>	
			{totalCards.map((data,index)=>
				<CircleIcon
					iteratedIndex={index}
					currentSelectedIndex={currentSelectedIndex}
					triggerUpdatedSelectedIndex={triggerUpdatedSelectedIndex}
				/>
			)}
		</Container>
	)
}

export default CampaignNavigation;
import React from "react";
import styled from "styled-components";
import CircleIcon from "./CircularIcons.js";

const Container=styled.div`
	position:relative;
	height:100%;
	width:15%;
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;
	border-left: 1px solid #ECECEC;
`;


const CampaignNavigation=({totalCampaigns,currentSelectedIndex})=>{
	console.log(totalCampaigns);
	console.log(currentSelectedIndex);
	return(
		<Container>	
			{totalCampaigns.map((data,index)=>
				<CircleIcon
					iteratedIndex={index}
					currentSelectedIndex={currentSelectedIndex}
				/>
			)}
		</Container>
	)
}

export default CampaignNavigation;
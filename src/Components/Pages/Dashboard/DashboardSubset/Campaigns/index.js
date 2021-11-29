import React from "react";
import styled from "styled-components";
import CampaignOptions from "./CampaignOptions.js";
import CampaignDisplay from "./Campaign/index.js";

const Container=styled.div`
	position:relative;
	height:100%;
	width:85%;
	justify-content:center;
	align-items:center;
	display:flex;
	flex-direction:column;
`;

const Campaigns=()=>{
	return(
		<Container>
			<div style={{position:"relative",display:"flex",flexDirection:"column",height:"85%",width:"70%"}}>
				<CampaignOptions/>
				<CampaignDisplay/>
			</div>
		</Container>
	)
}

export default Campaigns;
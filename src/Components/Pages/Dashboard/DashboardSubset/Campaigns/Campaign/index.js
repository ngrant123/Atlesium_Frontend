import React,{useContext} from "react";
import styled from "styled-components";
import Campaign from "./IsolatedCampaign.js";
import {CampaignContext} from "../../../DashboardSet/CampaignContext.js";

const Container=styled.div`
	position:relative;
	width:100%;
	height:100%;
	border-radius:5px;
	padding:10px;
`;

const CampaignInitialier=()=>{
	const campaignConsumer=useContext(CampaignContext);
	const {campaigns}=campaignConsumer;
	console.log(campaigns);
	debugger;
	return(
		<Container>
			{campaigns.map((data,index)=>
				<Campaign 
					campaignInformation={data}
					currentIndex={index}
					removeTargetedIndexCampaign={campaignConsumer.removeTargetedIndexCampaign}
				/>
			)}
		</Container>
	)
}

export default CampaignInitialier;

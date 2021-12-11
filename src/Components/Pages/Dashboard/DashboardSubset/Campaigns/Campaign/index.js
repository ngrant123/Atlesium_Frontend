import React,{useContext} from "react";
import styled from "styled-components";
import Campaign from "./IsolatedCampaign.js";
import {CampaignContext} from "../../../DashboardSet/CampaignContext.js";
import {Link} from "react-router-dom";

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
				<Link to={{pathname:"/reticanDetails"}}>
					<Campaign 
						campaignInformation={data}
						currentIndex={index}
						removeTargetedIndexCampaign={campaignConsumer.removeTargetedIndexCampaign}
					/>
				</Link>
			)}
		</Container>
	)
}

export default CampaignInitialier;

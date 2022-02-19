import React,{useContext} from "react";
import styled from "styled-components";
import Retican from "./IsolatedRetican.js";
import {ReticanContext} from "../../../DashboardSet/ReticanContext.js";
import {Link} from "react-router-dom";

const Container=styled.div`
	position:relative;
	width:100%;
	height:100%;
	border-radius:5px;
	padding:10px;
`;

const CampaignInitialier=()=>{
	const reticanConsumer=useContext(ReticanContext);
	const {reticans}=reticanConsumer;
	console.log(reticans);
	debugger;
	return(
		<Container>
			{reticans.length==0?
				<p>No reticans</p>:
				<React.Fragment>
					{reticans.map((data,index)=>
						<Retican 
							campaignInformation={data}
							currentIndex={index}
							removeTargetedIndexRetican={reticanConsumer.removeTargetedIndexRetican}
							deleteCampaign={reticanConsumer.deleteCampaign}
						/>
					)}
				</React.Fragment>
			}
		</Container>
	)
}

export default CampaignInitialier;

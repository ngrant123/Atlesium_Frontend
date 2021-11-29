import React,{useState,useEffect} from "react";
import styled from "styled-components";
import Navigation from "../../../UniversalComponents/Navigation/index.js";
import Campaign from "../DashboardSubset/Campaigns/index.js";
import CampaignNavigation from "../DashboardSubset/CampaignNavigation/index.js";
import {CampaignProvider} from "./CampaignContext.js";


const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	padding:0px;
	display:flex;
	flex-direction:row;
	display:flex;
	overflow-y:auto;

	@media screen and (max-width:1370px){
		flex-direction:column;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		flex-direction:column;
    }
`;

const CampaignContainer=styled.div`
	position:relative;
	height:100%;
	width:100%;
	display:flex;
	flex-direction:row
`;

const campaigns=[
	{
		title:"test",
		description:"Testing out the card features yessir 1"
	},
	{
		title:"test2",
		description:"Testing out the card features yessir 2"
	},
	{
		title:"test3",
		description:"Testing out the card features yessir 3"
	}
]

const Dashboard=()=>{
	const [currentSelectedIndex,changeCurrentSelectedIndex]=useState(0);
	const [constantCampaigns,changeConstantCampaigns]=useState(campaigns);
	const [stackCampaignsView,changeStackCampaignView]=useState(constantCampaigns);
	const [previousIndex,changePreviousIndex]=useState();

	useEffect(()=>{
		debugger;
		const tempStackCampaignHolders=[];
		if(currentSelectedIndex==campaigns.length-1){
			tempStackCampaignHolders.push(constantCampaigns[currentSelectedIndex]);
			tempStackCampaignHolders.push(constantCampaigns[0]);
		}else{
			const selectedIndex=currentSelectedIndex;
			tempStackCampaignHolders.push(constantCampaigns[selectedIndex]);
			tempStackCampaignHolders.push(constantCampaigns[selectedIndex+1]);
		}
		if(previousIndex!=null){
			tempStackCampaignHolders.splice(0,0,{
				...constantCampaigns[previousIndex],
				animationIndicator:true
			});
		}
		changeStackCampaignView([...tempStackCampaignHolders]);

	},[currentSelectedIndex]);

	const updateSelectedIndex=(selectedIndex)=>{
		console.log(selectedIndex);
		changePreviousIndex(currentSelectedIndex);
		changeCurrentSelectedIndex(selectedIndex);
	}

	const removeCampaignFromStack=(index)=>{
		debugger;
		const tempCampaigns=stackCampaignsView;
		tempCampaigns.splice(index,1);
		changeStackCampaignView([...tempCampaigns]);
	}
	return(
		<CampaignProvider
			value={{
				campaigns:stackCampaignsView,
				currentSelectedIndex,
				triggerUpdatedSelectedIndex:(selectedIndex)=>{
					updateSelectedIndex(selectedIndex);
				},
				removeTargetedIndexCampaign:(index)=>{
					removeCampaignFromStack(index);
				}
			}}
		>
			<Container>
				<Navigation
					pageType={"Dashboard"}
				/>
				<CampaignContainer>
					<Campaign/>
					<CampaignNavigation 
						totalCampaigns={campaigns}
						currentSelectedIndex={currentSelectedIndex}
					/>
				</CampaignContainer>
			</Container>
		</CampaignProvider>
	)
}

export default Dashboard;
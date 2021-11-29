import React from "react";

const CampaignContext=React.createContext();
const CampaignConsumer=CampaignContext.Consumer;
const CampaignProvider=CampaignContext.Provider;

export{
	CampaignContext,
	CampaignConsumer,
	CampaignProvider
}
import React from "react";

const AnalyticsContext=React.createContext();
const AnaylticsProvider=AnalyticsContext.Provider;
const AnalyticsConsumer=AnalyticsContext.Consumer;


export{
	AnaylticsProvider,
	AnalyticsContext,
	AnalyticsConsumer
}
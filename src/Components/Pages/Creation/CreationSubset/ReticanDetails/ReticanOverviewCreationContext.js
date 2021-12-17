import React from "react";

const ReticanOverviewContext=React.createContext();
const ReticanOverviewConsumer=ReticanOverviewContext.Consumer;
const ReticanOverviewProvider=ReticanOverviewContext.Provider;

export{
	ReticanOverviewContext,
	ReticanOverviewConsumer,
	ReticanOverviewProvider
}
import React from "react";

const ReticanContext=React.createContext();
const ReticanConsumer=ReticanContext.Consumer;
const ReticanProvider=ReticanContext.Provider;

export{
	ReticanContext,
	ReticanConsumer,
	ReticanProvider
}
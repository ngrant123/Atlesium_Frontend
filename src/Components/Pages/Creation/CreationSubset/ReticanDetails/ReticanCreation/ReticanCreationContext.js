import React from "react";

const ReticanCreationContext=React.createContext();
const ReticanCreationConsumer=ReticanCreationContext.Consumer;
const ReticanCreationProvider=ReticanCreationContext.Provider;


export{
	ReticanCreationContext,
	ReticanCreationConsumer,
	ReticanCreationProvider
}
import React from "react";

const DetailsContext=React.createContext();
const DetailsProvider=DetailsContext.Provider;
const DetailsConsumer=DetailsContext.Consumer;

export{
	DetailsContext,
	DetailsProvider,
	DetailsConsumer
}

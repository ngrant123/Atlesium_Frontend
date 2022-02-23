import {createContext} from "react";


const CreationContext=createContext();
const CreationConsumer=CreationContext.Consumer;
const CreationProvider=CreationContext.Provider;

export{
	CreationContext,
	CreationConsumer,
	CreationProvider
}

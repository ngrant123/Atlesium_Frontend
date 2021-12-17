import React,{createContext} from "react";

const LandingPageContext=createContext();
const LandingPageProvider=LandingPageContext.Provider;
const LandingPageConsumer=LandingPageContext.Consumer;

export{
	LandingPageContext,
	LandingPageProvider,
	LandingPageConsumer
}
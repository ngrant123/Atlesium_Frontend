import React from "react";

const PaymentContext=React.createContext();
const PaymentConsumer=PaymentContext.Consumer;
const PaymentProvider=PaymentContext.Provider;

export{
	PaymentContext,
	PaymentConsumer,
	PaymentProvider
}
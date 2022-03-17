import axios from "axios";

const PaymentURL=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_PAYMENT_URL:
				process.env.REACT_APP_TEST_PAYMENT_URL;

const backendServiceErrorMessage={
	confirmation:"Failure",
	data:{
		statusCode:500,
		message:"Error occured with service"
	}
}


export const generateSessionToken=async()=>{
	try{
		const {data}=await axios.get(`${PaymentURL}/token/initializeSessionToken`);
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}
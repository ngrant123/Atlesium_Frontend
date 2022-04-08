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

export const createTranscation=async(nonce,email,userId,firstName)=>{
	try{
		const {data}=await axios.post(`${PaymentURL}/transcation/createTranscation`,{
			nonce,
			userId,
			email,
			firstName
		});
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}
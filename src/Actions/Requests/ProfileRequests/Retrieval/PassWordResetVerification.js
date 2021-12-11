import axios from "axios";

const SearchURL=process.env.NODE_ENV=="production"?
				process.env.REACT_APP_PROFILE_RETRIEVAL_URL:
				process.env.REACT_APP_TEST_PROFILE_RETRIEVAL_URL;

const backendServiceErrorMessage={
	confirmation:"Failure",
	data:{
		statusCode:500,
		message:"Error occured with service"
	}
}

export const verifyResetCode=async(email,userSubmittedVerificationCode)=>{
	try{
		const {data}=await axios.get(`${SearchURL}/verifyResetCode`,{
			params:{
				email,
				userSubmittedVerificationCode
			}
		});
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}






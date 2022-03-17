import axios from "axios";

const SearchUrl=process.env.NODE_ENV=="production"?
				process.env.REACT_APP_PROFILE_RETRIEVAL_URL:
				process.env.REACT_APP_TEST_PROFILE_RETRIEVAL_URL;


const backendServiceErrorMessage={
	confirmation:"Failure",
	data:{
		statusCode:500,
		message:"Error occured with service"
	}
}

export const retrieveTotalProfiles=async()=>{
	try{
		const {data}=await axios.get(`${SearchUrl}/retrieveTotalProfiles`);
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}
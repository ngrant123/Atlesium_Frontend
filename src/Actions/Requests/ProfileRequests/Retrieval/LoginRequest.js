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

export const loginProfile=async(email,password)=>{
	try{
		const {data}=await axios.get(`${SearchUrl}/loginProfile`,{
			params:{
				email,
				password
			}
		});
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}
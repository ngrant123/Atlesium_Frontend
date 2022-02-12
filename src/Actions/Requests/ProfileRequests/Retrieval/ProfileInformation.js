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


export const hasEmailBeenPreviouslyUsed=async(email)=>{
	try{
		const {data}=await axios.get(`${SearchURL}/hasEmailBeenPreviouslyUsed`,{
			params:{
				email
			}
		});
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}

export const retrieveEmail=async(profileId)=>{
	try{
		const {data}=await axios.get(`${SearchURL}/retrieveProfileEmail`,{
			params:{
				profileId
			}
		})
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}

export const retrieveProfilePicture=async(profileId)=>{
	try{
		const {data}=await axios.get(`${SearchURL}/retrieveProfilePicture`,{
			params:{
				profileId
			}
		});
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}
import axios from "axios";

const ProfileCreationURL=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_PROFILE_CREATION_URL:
				process.env.REACT_APP_TEST_PROFILE_CREATION_URL;

const backendServiceErrorMessage={
	confirmation:"Failure",
	data:{
		statusCode:500,
		message:"Error occured with service"
	}
}

export const deleteProfile=async(profileId)=>{
	try{
		const {data}=await axios.post(`${ProfileCreationURL}/deleteProfile`,{
			profileId
		});
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}
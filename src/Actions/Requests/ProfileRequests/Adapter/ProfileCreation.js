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

export const createProfile=async(personalInformation)=>{
	try{
		const {data}=await axios.post(`${ProfileCreationURL}/createProfile`,{
			...personalInformation
		});
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}

export const createProfilePicture=async(imgUrl,profileId,accessToken)=>{
	try{
		const {data}=await axios.post(`${ProfileCreationURL}/createProfilePicture`,{
			imgUrl,
			profileId
		},{
			headers:{
				authorization:accessToken
			}
		});
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}

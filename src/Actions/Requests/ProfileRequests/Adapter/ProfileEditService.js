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

export const editName=async(profileId,name,accessToken)=>{
	try{
		const {data}=await axios.post(`${ProfileCreationURL}/editName`,{
			profileId,
			name
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

export const editEmail=async(profileId,email,accessToken)=>{
	try{
		const {data}=await axios.post(`${ProfileCreationURL}/editEmail`,{
			profileId,
			email
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

export const updatePassword=async(updatedPasswordInformation)=>{
	try{
		const {data}=await axios.post(`${ProfileCreationURL}/updatePassword`,{
			...updatedPasswordInformation
		});
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}









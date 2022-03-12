import axios from "axios";

const ProfileOnboardingCreationURL=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_PROFILE_CREATION_URL:
				process.env.REACT_APP_TEST_PROFILE_CREATION_URL;

const backendServiceErrorMessage={
	confirmation:"Failure",
	data:{
		statusCode:500,
		message:"Error occured with service"
	}
}

export const updateDashboardOnboardingViewedStatus=async(profileId,onboardingViewedStatus)=>{
	try{
		const {data}=await axios.post(`${ProfileOnboardingCreationURL}/editDashboardOnboardingStatus`,{
			profileId,
			onboardingViewedStatus
		});
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}

export const updateReticanOnboardingViewedStatus=async(profileId,onboardingViewedStatus)=>{
	try{
		const {data}=await axios.post(`${ProfileOnboardingCreationURL}/editReticanOnboardingStatus`,{
			profileId,
			onboardingViewedStatus
		})
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}
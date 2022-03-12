import axios from "axios";

const OnboardingSearchUrl=process.env.NODE_ENV=="production"?
				process.env.REACT_APP_PROFILE_RETRIEVAL_URL:
				process.env.REACT_APP_TEST_PROFILE_RETRIEVAL_URL;


const backendServiceErrorMessage={
	confirmation:"Failure",
	data:{
		statusCode:500,
		message:"Error occured with service"
	}
}

export const retrieveDashboardOnboardingStatus=async(profileId)=>{
	try{
		const {data}=await axios.get(`${OnboardingSearchUrl}/retrieveDashboardOnboardingStatus`,{
			params:{
				profileId
			}
		})
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}


export const retrieveReticanOnboardingStatus=async(profileId)=>{
	try{
		const {data}=await axios.get(`${OnboardingSearchUrl}/retrieveReticanOnboardingStatus`,{
			params:{
				profileId
			}
		})
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}
import axios from "axios";

const ReticanRetrievalURL=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_RETICAN_RETRIEVAL_URL:
				process.env.REACT_APP_TEST_RETICAN_RETRIEVAL_URL;

const backendServiceErrorMessage={
	confirmation:"Failure",
	data:{
		statusCode:500,
		message:"Error occured with service"
	}
}

export const retrieveRetican=async(reticanId,profileId)=>{
	try{
		const {data}=await axios.get(`${ReticanRetrievalURL}/retrieveRetican`,{
			params:{
	            reticanId,
	            profileId
			}
		});
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}


export const retrieveProfileSpecificReticanOverviews=async(profileId,statusType)=>{
	try{
		const {data}=await axios.get(`${ReticanRetrievalURL}/retrieveProfileSpecificReticanOverviews`,{
			params:{
			    profileId,
            	statusType
			}
		})
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}

export const retrieveResponseEligibleForResponses=async(profileId,feedTrackerId,reticanOverviewId)=>{
	try{
		const {data}=await axios.get(`${ReticanRetrievalURL}/retrieveEligibleResponseReticans`,{
			params:{
				profileId,
				feedTrackerId,
				reticanOverviewId
			}
		});
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}

export const retrieveReticanAndResponses=async(reticanRetrievalInformation)=>{
	try{
		const {data}=await axios.get(`${ReticanRetrievalURL}/retrieveReticanAndResponses`,{
			params:{
				...reticanRetrievalInformation
			}
		});
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}











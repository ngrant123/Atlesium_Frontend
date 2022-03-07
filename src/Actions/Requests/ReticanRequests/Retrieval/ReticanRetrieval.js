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


export const retrieveProfileSpecificReticanOverviews=async(profileId,statusType,accessToken)=>{
	try{
		const {data}=await axios.get(`${ReticanRetrievalURL}/retrieveProfileSpecificReticanOverviews`,{
			params:{
			    profileId,
            	statusType
			},
			headers:{
				authorization:accessToken
			}
		})
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}

export const retrieveResponseEligibleForResponses=async(profileId,feedTrackerId,reticanOverviewId,accessToken)=>{
	try{
		const {data}=await axios.get(`${ReticanRetrievalURL}/retrieveEligibleResponseReticans`,{
			params:{
				profileId,
				feedTrackerId,
				reticanOverviewId
			},
			headers:{
				authorization:accessToken
			}
		});
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}

export const retrieveReticanAndResponses=async(reticanRetrievalInformationProps)=>{
	try{
		const {
			accessToken,
			...reticanRetrievalInformation
		}=reticanRetrievalInformationProps;

		const {data}=await axios.get(`${ReticanRetrievalURL}/retrieveReticanAndResponses`,{
			params:{
				...reticanRetrievalInformation
			},
			headers:{
				authorization:accessToken
			}
		});
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}

export const retrieveReticanOverviewForEditPage=async(reticanOverviewId,profileId,accessToken)=>{
	try{
		const {data}=await axios.get(`${ReticanRetrievalURL}/retrieveReticanOverviewForEdit`,{
			params:{
				reticanOverviewId,
				profileId
			},
			headers:{
				authorization:accessToken
			}
		});
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}







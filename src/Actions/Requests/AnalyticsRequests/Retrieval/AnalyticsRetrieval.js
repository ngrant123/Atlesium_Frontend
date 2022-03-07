import axios from "axios";

const AnalyticsRetrievalURL=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_ANALYTICS_RETRIEVAL_URL:
				process.env.REACT_APP_TEST_ANALYTICS_RETRIEVAL_URL;

const backendServiceErrorMessage={
	confirmation:"Failure",
	data:{
		statusCode:500,
		message:"Error occured with service"
	}
}

export const retrieveReticanOverviewCards=async(profileId,statusType,accessToken)=>{
	try{	
		const {data}=await axios.get(`${AnalyticsRetrievalURL}/reticanOverviewCards`,{
			params:{
				profileId,
				statusType
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


export const retrieveReticanCards=async(reticanOverviewId,profileId,accessToken)=>{
	try{
		const {data}=await axios.get(`${AnalyticsRetrievalURL}/reticanCards`,{
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








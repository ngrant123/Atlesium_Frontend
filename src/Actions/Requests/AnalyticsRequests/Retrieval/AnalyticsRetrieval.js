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

export const retrieveReticanAnalytics=async(reticanOverviewId)=>{
	try{
		const {data}=await axios.get(`${AnalyticsRetrievalURL}/reticanAnalytics`,{
			params:{
				reticanOverviewId
			}
		});
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}

export const retrieveReticanOverviewCards=async(profileId,statusType)=>{
	try{	
		const {data}=await axios.get(`${AnalyticsRetrievalURL}/reticanOverviewCards`,{
			params:{
				profileId,
				statusType
			}
		});
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}


export const retrieveReticanCards=async(reticanOverviewId,profileId)=>{
	try{
		const {data}=await axios.get(`${AnalyticsRetrievalURL}/reticanCards`,{
			params:{
				reticanOverviewId,
            	profileId
			}
		});
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}








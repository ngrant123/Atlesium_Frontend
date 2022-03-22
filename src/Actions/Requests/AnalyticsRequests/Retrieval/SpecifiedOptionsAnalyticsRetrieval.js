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

export const retrieveSpecifiedAnaltyicsPage=async(targetId,profileId,accessToken)=>{
	try{
		const {data}=await axios.get(`${AnalyticsRetrievalURL}/specifiedReticanAnalysisPage`,{
			params:{
				profileId,
				targetId
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


export const retrieveTimeSpecifiedAnalytics=async(
	targetId,
	timeRequestedFilterType,
	isAnalyticsReticanOverview,
	accessToken,
	profileId)=>{
	try{
		const {data}=await axios.get(`${AnalyticsRetrievalURL}/retrieveTimeConstraintAnalytics`,{
			params:{
				targetId,
				timeRequestedFilterType,
				isAnalyticsReticanOverview,
				profileId
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
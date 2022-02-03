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


export const retrieveTimeSpecifiedAnalytics=async(reticanOverviewId,timeRequestedFilterType)=>{
	try{
		const {data}=await axois.get(`${AnalyticsRetrievalURL}/retrieveTimeConstraintAnalytics`,{
			params:{
				reticanOverviewId,
				timeRequestedFilterType
			}
		})
	}catch(err){
		return backendServiceErrorMessage;
	}
}
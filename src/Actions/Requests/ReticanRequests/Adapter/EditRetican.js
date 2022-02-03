import axios from "axios";

const ReticanEditURL=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_RETICAN_CREATION_URL:
				process.env.REACT_APP_TEST_RETICAN_CREATION_URL;

const backendServiceErrorMessage={
	confirmation:"Failure",
	data:{
		statusCode:500,
		message:"Error occured with service"
	}
}

export const editRetican=async(editedReticanInformation)=>{
	try{
		const {data}=await axios.post(`${ReticanEditURL}/editRetican`,{
			...editedReticanInformation
		});
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}


export const editReticanOverview=(reticanOverviewId,reticanOverviewParams,profileId)=>{
	try{
		const {data}=await axios.post(`${ReticanEditURL}/editReticanOverview`,{
			reticanOverviewId,
			reticanOverviewParams,
			profileId
		});
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}
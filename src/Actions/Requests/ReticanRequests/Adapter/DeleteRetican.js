import axios from "axios";

const ReticanDeletionURL=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_RETICAN_CREATION_URL:
				process.env.REACT_APP_TEST_RETICAN_CREATION_URL;

const backendServiceErrorMessage={
	confirmation:"Failure",
	data:{
		statusCode:500,
		message:"Error occured with service"
	}
}

export const deleteReticanOverview=async(reticanOverviewId,profileId,accessToken)=>{
	try{
		const {data}=await axios.post(`${ReticanDeletionURL}/deleteReticanOverview`,{
			reticanOverviewId,
            profileId
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
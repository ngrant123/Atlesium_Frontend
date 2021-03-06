import axios from "axios";

const ReticanCreationURL=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_RETICAN_CREATION_URL:
				process.env.REACT_APP_TEST_RETICAN_CREATION_URL;

const backendServiceErrorMessage={
	confirmation:"Failure",
	data:{
		statusCode:500,
		message:"Error occured with service"
	}
}


export const createReticanOverview=async(reticanOverviewInformationProps)=>{
	try{
		const {
			accessToken,
			...reticanOverviewInformation
		}=reticanOverviewInformationProps;

		const {data}=await axios.post(`${ReticanCreationURL}/createRetican`,{
			...reticanOverviewInformation
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
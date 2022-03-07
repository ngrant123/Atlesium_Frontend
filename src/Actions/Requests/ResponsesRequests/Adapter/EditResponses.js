import axios from "axios";

const ResponsesCreationURL=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_RESPONSES_CREATION_URL:
				process.env.REACT_APP_TEST_RESPONSES_CREATION_URL;

const backendServiceErrorMessage={
	confirmation:"Failure",
	data:{
		statusCode:500,
		message:"Error occured with service"
	}
}


export const deleteResponse=async(responseId,reticanId,profileId,accessToken)=>{
	try{
		const {data}=await axios.post(`${ResponsesCreationURL}/deleteResponse`,{
			responseId,
			reticanId,
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
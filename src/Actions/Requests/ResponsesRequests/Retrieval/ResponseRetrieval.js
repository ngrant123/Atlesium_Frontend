import axios from "axios";

const ResponsesRetrievalURL=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_RESPONSES_RETRIEVAL_URL:
				process.env.REACT_APP_TEST_RESPONSES_RETRIEVAL_URL;

const backendServiceErrorMessage={
	confirmation:"Failure",
	data:{
		statusCode:500,
		message:"Error occured with service"
	}
}

export const retrieveReticanResponses=async(reticanRetrievalInformation)=>{
	try{
		const {data}=await axios.get(`${ResponsesRetrievalURL}/retrieveResponses`,{
			params:{...reticanRetrievalInformation}
		});
		return data;
	}catch(err){
		return backendServiceErrorMessage;
	}
}



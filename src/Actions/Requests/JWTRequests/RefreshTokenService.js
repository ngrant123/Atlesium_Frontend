import axios from "axios";

const JWTCreationURL=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_JWT_CREATION_URLv:
				process.env.REACT_APP_TEST_JWT_CREATION_URL;

const backendServiceErrorMessage={
	confirmation:"Failure",
	data:{
		statusCode:500,
		message:"Error occured with service"
	}
}


export const generateTokens=async({userId,currentRefreshToken})=>{
	try{
		const {data}=await axios.post(`${JWTCreationURL}/tokenGeneration`,{
			userId,
			currentRefreshToken
		});
		return data;
	}catch(err){
		throw backendServiceErrorMessage;
	}
}

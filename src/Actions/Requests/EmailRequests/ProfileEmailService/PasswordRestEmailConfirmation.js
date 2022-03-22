import axios from "axios";

const EmailCreationURL=process.env.NODE_ENV=='production'?
				process.env.REACT_APP_EMAIL_CREATION_URL:
				process.env.REACT_APP_TEST_EMAIL_CREATION_URL;

const backendServiceErrorMessage={
	confirmation:"Failure",
	data:{
		statusCode:500,
		message:"Error occured with service"
	}
}


export const passwordResetConfirmationEmail=async(email)=>{
	try{
		const {data}=await axios.post(`${EmailCreationURL}/sendPasswordResetEmailConfirmation`,{
			email
		});
		return data; 
	}catch(err){
		return backendServiceErrorMessage;
	}
}

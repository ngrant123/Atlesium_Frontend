import {generateTokens} from "../Requests/JWTRequests/RefreshTokenService.js";
import {
	editPersonalAccessToken,
	editPersonalRefreshToken
} from "../Redux/Actions/PersonalInformationActions.js";

export const tokensRegeneration=async(props)=>{
	const {
		currentRefreshToken,
		userId,
		parentApiTrigger,
		dispatch,
		parameters
	}=props;

	const {confirmation,data}=await generateTokens({
		userId,
		currentRefreshToken
	})
	
	if(confirmation=="Success"){
		const {
			message:{
				accessToken,
				refreshToken
		}}=data;

		const promises=[];
		promises.push(dispatch(editPersonalAccessToken(accessToken)));
		promises.push(dispatch(editPersonalRefreshToken(refreshToken)));

		Promise.all(promises).then(result=>{
			
			parentApiTrigger({
				...parameters,
				updatedAccessToken:accessToken
			});
		})
	}else{
		alert('Unfortunately something has gone wrong. Please log out and sign back in again');
	}
}
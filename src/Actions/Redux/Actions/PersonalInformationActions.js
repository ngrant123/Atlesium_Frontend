
export const initializeProfile=(profileInformation)=>{
	return{
		type:'NEW_USER',
		payload:profileInformation
	}
}


export const editFirstName=(firstName)=>{
	return{
		type:'EDIT_FIRST_NAME',
		payload:firstName
	}
}
export const editTokens=(updatedTokens)=>{
	return{
		type:'EDIT_TOKENS',
		payload:updatedTokens
	}
}

export const editProfilePicture=(profilePicture)=>{
	return{
		type:'PROFILE_PICTURE',
		payload:profilePicture
	}
}


export const storeEncodedProfilePicture=(encodedProfilePicture)=>{
	return{
		type:'STORE_ENCODED_PROFILE_PICTURE',
		payload:encodedProfilePicture
	}
}

export const editPersonalAccessToken=(accessToken)=>{
	return{
		type:'EDIT_PERSONAL_ACCESS_TOKEN',
		payload:accessToken
	}
}


export const editPersonalRefreshToken=(refreshToken)=>{
	return{
		type:'EDIT_PERSONAL_REFRESH_TOKEN',
		payload:refreshToken
	}
}

export const logoutUser=()=>{
	return{
		type:'LOGOUT_USER',
		palyoad:''
	}
}






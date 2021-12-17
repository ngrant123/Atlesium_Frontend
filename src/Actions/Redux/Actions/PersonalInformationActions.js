
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

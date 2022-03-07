const initialState={
	firstName:"",
	email:"",
	_id:"",
	refreshToken:"",
	accessToken:""
}


const PersonalInformationReducer=(state={...initialState},action)=>{
	const {
		type,
		payload
	}=action;
	switch(type){
		case 'NEW_USER':{
			return {...payload}
		}

		case 'EDIT_FIRST_NAME':{
			return{
				...state,
				firstName:payload
			}
		}

		case 'EDIT_TOKENS':{
			return{
				...state,
				...payload
			}
		}
		case 'STORE_ENCODED_PROFILE_PICTURE':{
			return{
				...state,
				encodedProfilePicture:payload
			}
		}

		case 'EDIT_PERSONAL_ACCESS_TOKEN':{
			return{
				...state,
				accessToken:payload
			}
		}

		case 'EDIT_PERSONAL_REFRESH_TOKEN':{
			return{
				...state,
				refreshToken:payload
			}
		}

		case 'LOGOUT_USER':{
			return{...initialState}
		}


		default:{
			return state;
		}
	}
}


export default PersonalInformationReducer;
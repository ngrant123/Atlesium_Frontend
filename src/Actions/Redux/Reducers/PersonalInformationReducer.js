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

		case 'EDIT_PROFILE_PICTURE':{
			return{
				...state,
				profilePicture:payload
			}
		}
		default:{
			return state;
		}
	}
}


export default PersonalInformationReducer;
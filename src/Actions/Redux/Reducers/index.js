import PersonalReducer from "./PersonalInformationReducer.js";
import {combineReducers} from "redux";

const reducers=combineReducers({
	personalInformation:PersonalReducer
})

export default reducers;
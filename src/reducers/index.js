import { combineReducers } from "redux";
import resourceReducer from "./resourceReducer";
import authentication from "./authenticationReducer";
import alertReducer from './alertReducer'
import projectReducer from "./projectReducer";
import formulaReducer from "./formulaReducer";

const rootReducer = combineReducers({
    gets: resourceReducer,
    auth: authentication, 
    alert: alertReducer, 
    projects: projectReducer, 
    formula: formulaReducer
}) 

export default rootReducer;

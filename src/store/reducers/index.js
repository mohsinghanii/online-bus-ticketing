import { combineReducers } from 'redux';
import userAuthReducer from './userReducer';
import CompanyReducer from './CompanyReducer';
import BusReducer from './BusReducer';


const rootReducer = combineReducers({
    userAuth: userAuthReducer,
    CompanyReducer,
    BusReducer
})

export default rootReducer
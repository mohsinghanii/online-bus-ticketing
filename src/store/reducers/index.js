import { combineReducers } from 'redux';
import userAuthReducer from './userReducer';
import CompanyReducer from './CompanyReducer';
import BusReducer from './BusReducer';
import RideReducer from './rideReducer';


const rootReducer = combineReducers({
    userAuth: userAuthReducer,
    CompanyReducer,
    BusReducer,
    RideReducer
})

export default rootReducer
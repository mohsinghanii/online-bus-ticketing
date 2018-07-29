import { combineReducers } from 'redux'
import userAuthReducer from './userReducer'
import CompanyReducer from './CompanyReducer'


const rootReducer = combineReducers({
    userAuth: userAuthReducer,
    CompanyReducer,
})

export default rootReducer
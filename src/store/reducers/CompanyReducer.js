import {
    CREATE_COMPANY, CREATE_COMPANY_SUCCESS, CREATE_COMPANY_FAILURE
} from '../constants'

const initialState = {
    createdCompany: null,
    createCompanyError: null,
    createCompanyLoader: false
}

export default function CompanyReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_COMPANY:
            return {
                ...state,
                createdCompany: null,
                createCompanyError: null,
                createCompanyLoader: true
            }
        case CREATE_COMPANY_SUCCESS:
            return {
                ...state,
                createdCompany: action.payload,
                createCompanyError: null,
                createCompanyLoader: false
            }
        case CREATE_COMPANY_FAILURE:
            return {
                ...state,
                createdCompany: null,
                createCompanyError: action.payload,
                createCompanyLoader: false
            }

        default:
            return state
    }
}
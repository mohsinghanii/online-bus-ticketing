import {
    CREATE_COMPANY, CREATE_COMPANY_SUCCESS, CREATE_COMPANY_FAILURE,
    GET_COMPANIES, GET_COMPANIES_SUCCESS, GET_COMPANIES_FAILURE
} from '../constants'

const initialState = {
    createdCompany: null,
    createCompanyError: null,
    createCompanyLoader: false,

    companies: null,
    getCompaniesLoader: false,
    getCompaniesError: null
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

        case GET_COMPANIES:
            return {
                ...state,
                companies: null,
                getCompaniesLoader: true,
                getCompaniesError: null
            }
        case GET_COMPANIES_SUCCESS:
            return {
                ...state,
                companies: action.payload,
                getCompaniesLoader: false,
                getCompaniesError: null
            }
        case GET_COMPANIES_FAILURE:
            return {
                ...state,
                companies: null,
                getCompaniesLoader: false,
                getCompaniesError: action.payload
            }

        default:
            return state
    }
}
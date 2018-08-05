import {
    CREATE_COMPANY, CREATE_COMPANY_SUCCESS, CREATE_COMPANY_FAILURE,
    GET_COMPANIES, GET_COMPANIES_SUCCESS, GET_COMPANIES_FAILURE,
    GET_COMPANY, GET_COMPANY_SUCCESS, GET_COMPANY_FAILURE,
    SELECTED_COMPANY
} from './../constants'

export class CompanyAction {
    static createCompany(company) {
        return {
            type: CREATE_COMPANY,
            payload: company
        }
    }

    static createCompanySuccess(company) {
        return {
            type: CREATE_COMPANY_SUCCESS,
            payload: company
        }
    }

    static createCompanyFailure(error) {
        return {
            type: CREATE_COMPANY_FAILURE,
            error: error
        }
    }

    // get all companies
    static getCompanies() {
        return {
            type: GET_COMPANIES,
            payload: null
        }
    }

    static getCompaniesSuccess(companies) {
        return {
            type: GET_COMPANIES_SUCCESS,
            payload: companies
        }
    }

    static getCompaniesFailure(error) {
        return {
            type: GET_COMPANIES_FAILURE,
            error: error
        }
    }

    // get company by id
    static getCompany(company_id) {
        return {
            type: GET_COMPANY,
            payload: company_id
        }
    }

    static getCompanySuccess(company) {
        return {
            type: GET_COMPANY_SUCCESS,
            payload: company
        }
    }

    static getCompanyFailure(error) {
        return {
            type: GET_COMPANY_FAILURE,
            error: error
        }
    }

    static selectedCompany(payload){
        return {
            type: SELECTED_COMPANY,
            payload
        }
    }
}
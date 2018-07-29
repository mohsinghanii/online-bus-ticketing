import {
    CREATE_COMPANY, CREATE_COMPANY_SUCCESS, CREATE_COMPANY_FAILURE
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
}
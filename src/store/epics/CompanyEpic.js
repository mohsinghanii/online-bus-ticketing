import {
    CREATE_COMPANY,
    GET_COMPANIES, GET_COMPANIES_SUCCESS
} from '../constants';
import { firestoreDb } from './../../firebase/firebase';
import { Observable } from 'rxjs/Rx';
import { CompanyAction } from './../actions/index'

export default class CompanyEpic {

    static createCompany = (action$) =>
        action$.ofType(CREATE_COMPANY)
            .mergeMap(({ payload }) => {
                return firestoreDb.collection("companies").doc(`${payload.company_id}`).set(payload)
                    .then(() => {
                        console.log("Document successfully written!");
                        return Observable.of(
                            CompanyAction.createCompanySuccess('successfully'),
                            CompanyAction.getCompanies()
                        )
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                        return CompanyAction.createCompanyFailure(`Error in Creating Company! ${error}`)
                    });
            })

    static getCompanies = (action$) =>
        action$.ofType(GET_COMPANIES)
            .mergeMap(({ payload }) => {
                return firestoreDb.collection("companies").get()
                    .then((querySnapshot) => {
                        let companies = []
                        querySnapshot.forEach((doc) => {
                            console.log(doc.id, " => ", doc.data());
                            companies.push(doc.data())
                        });
                        return CompanyAction.getCompaniesSuccess(companies)
                    })
                    .catch((err) => {
                        return CompanyAction.getCompaniesFailure(`Error in getting Companies! ${err}`)
                    })
            })

}


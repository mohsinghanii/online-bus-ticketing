import {
    CREATE_COMPANY,
    GET_COMPANIES,
    GET_COMPANY
} from '../constants';
import { firestoreDb } from './../../firebase/firebase';
import { Observable } from 'rxjs/Rx';
import { CompanyAction } from './../actions/index'

export default class CompanyEpic {

    static createCompany = (action$) =>
        action$.ofType(CREATE_COMPANY)
            .mergeMap(({ payload }) => {
                return Observable.fromPromise(firestoreDb.collection("companies").doc(`${payload.company_id}`).set(payload))
                    .catch((error) => {
                        // console.error("Error writing document: ", error);
                        return CompanyAction.createCompanyFailure(`Error in Creating Company! ${error}`)
                    })
                    .map((err) => {
                        // console.log("Document successfully written!");
                        return CompanyAction.createCompanySuccess('successfully')
                    })
                    .switchMap((response) => {
                        if (response.type === 'CREATE_COMPANY_SUCCESS') {
                            return Observable.of(
                                CompanyAction.createCompanySuccess(payload),
                                CompanyAction.getCompanies()
                            )
                        } else {
                            return Observable.of(
                                CompanyAction.createCompanyFailure(`Error in Creating Company! ${response.payload}`)
                            )
                        }
                    })
            })

    static getCompanies = (action$) =>
        action$.ofType(GET_COMPANIES)
            .mergeMap(({ }) => {
                return firestoreDb.collection("companies").get()
                    .then((querySnapshot) => {
                        let companies = []
                        querySnapshot.forEach((doc) => {
                            // console.log(doc.id, " => ", doc.data());
                            companies.push(doc.data())
                        });
                        return CompanyAction.getCompaniesSuccess(companies)
                    })
                    .catch((err) => {
                        return CompanyAction.getCompaniesFailure(`Error in getting Companies! ${err}`)
                    })
            })

    static getCompany = (action$) =>
        action$.ofType(GET_COMPANY)
            .mergeMap(({ payload }) => {
                return firestoreDb.collection("companies").doc(payload.company_id).get()
                    .then((doc) => {
                        if (doc.exists) {
                            // console.log("Document data:", doc.data());
                            return CompanyAction.getCompanySuccess(doc.data())
                        } else {
                            // console.log("No such document!");
                            return CompanyAction.getCompanyFailure(`No such document!`)
                        }
                    }).catch((error) => {
                        // console.log("Error getting document:", error);
                        return CompanyAction.getCompanyFailure(`Error in getting Company! ${error}`)
                    })
            })

}


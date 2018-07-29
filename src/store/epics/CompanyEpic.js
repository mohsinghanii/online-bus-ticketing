import {
    CREATE_COMPANY
} from '../constants';
import { firestoreDb } from './../../firebase/firebase';
import { Observable } from 'rxjs/Rx';
import { CompanyAction } from './../actions/index'

export default class CompanyEpic {

    static createCompany = (action$) =>
        action$.ofType(CREATE_COMPANY)
            .mergeMap(({ payload }) => {
                return firestoreDb.collection("companies").doc(`${payload.company_id}`).set(payload)
                    .then(function () {
                        console.log("Document successfully written!");
                        CompanyAction.createCompanySuccess('successfully')
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });
            })

}


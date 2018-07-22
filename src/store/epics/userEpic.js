import {
    SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    CREATE_USER_IN_DB_FAILURE, CREATE_USER_IN_DB_SUCCESS,
} from '../constants';
import { auth, db } from './../../firebase/';
import { Observable } from 'rxjs/Rx';

//** Epic Middlewares For Auth **//
export default class AuthEpic {

    static signUpEpic = (action$) =>
        action$.ofType(SIGNUP)
            .mergeMap(({ payload }) => {
                return Observable.fromPromise(auth.doCreateUserWithEmailAndPassword(payload.email, payload.password))
                .catch((err) => {
                    return Observable.of({
                        type: SIGNUP_FAILURE,
                        payload: err.message
                    })
                })
                   .map((response)=>{
                        return {...response , ...payload}
                   })                    
            })
            .switchMap((obj)=>{
                debugger
                return Observable.fromPromise(db.doCreateUser(obj.user.uid, obj.email, obj.password))
                       .map((response)=>{
                           debugger
                            return Observable.of({
                                type: SIGNUP_SUCCESS,
                                payload: {data: response }
                            })
                       })
                        .catch((err) => {
                            return Observable.of({
                                type: SIGNUP_FAILURE,
                                payload: err.message
                            })
                        })
            })

        static createUser = (action$) =>
            action$.ofType(SIGNUP_SUCCESS)
                .switchMap(({ payload }) => {
                          debugger
                    return Observable.fromPromise(db.doCreateUser(payload.user.uid, payload.password))
                       .switchMap((response)=>{
                            return Observable.of({
                                type: CREATE_USER_IN_DB_SUCCESS,
                                payload: {data: response }
                            })
                       })
                        .catch((err) => {
                            return Observable.of({
                                type: CREATE_USER_IN_DB_FAILURE,
                                payload: err.message
                            })
                        })
                        
    
                })

}


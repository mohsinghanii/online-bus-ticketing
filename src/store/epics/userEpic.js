import {
    SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    CREATE_USER_IN_DB_FAILURE, CREATE_USER_IN_DB_SUCCESS,
} from '../constants';
import { auth, db} from './../../firebase/';
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
                if(obj.type === SIGNUP_FAILURE){
                   return Observable.of(
                       {
                           type: SIGNUP_FAILURE,
                           payload: obj.payload
                       }
                   )
                }
                else{
                    return Observable.fromPromise(db.doCreateUser(obj.user.uid, obj.email, obj.password))
                        .map((response)=>{
                            return {
                                type: SIGNUP_SUCCESS,
                                payload: { ...obj  }
                            }
                        })
                        .catch((err) => {
                            return Observable.of({
                                type: SIGNUP_FAILURE,
                                payload: err.message
                            })
                        })
                }
               
            })

}


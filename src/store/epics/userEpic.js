import {
    SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE,
} from '../constants';
import { Observable } from 'rxjs/Rx';

//** Epic Middlewares For Auth **//
export default class AuthEpic {

    static signUpEpic = (action$) =>
        action$.ofType(SIGNUP)
            .switchMap(({ payload }) => {

                return Observable.fromPromise(AuthEpic.signup(payload.email, payload.password))
                   .switchMap(({response})=>{
                        return Observable.of({
                            type: SIGNUP_SUCCESS,
                            payload: response
                        })
                   })
                    .catch((err) => {
                        return Observable.of({
                            type: SIGNUP_FAILURE,
                            payload: err.message
                        })
                    })
                    

            })

}


import {
    SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE,
} from '../constants'

export class userAuthActions {

    static signup(user) {
        debugger
        return {
            type: SIGNUP,
            payload: user
        }
    }

    static signupSuccess(data) {
        return {
            type: SIGNUP_SUCCESS,
            payload: data
        }
    }

    static signupFailure(error) {
        return {
            type: SIGNUP_FAILURE,
            error: error
        }
    }

    static signin(user) {
        return {
            type: SIGNIN,
            payload: user
        }
    }

    static signinSuccess(data) {
        return {
            type: SIGNIN_SUCCESS,
            payload: data
        }
    }

    static signinFailure(error) {
        return {
            type: SIGNIN_FAILURE,
            error: error
        }
    }

}
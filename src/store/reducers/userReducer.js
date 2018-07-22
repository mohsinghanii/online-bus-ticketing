import {
    SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE,
} from '../constants'

const initialState = {
    user: {},
    isAuthenticated: false,
    isLoading: false,
    isError: false,
    error: null
}

export default function userAuthReducer(state = initialState, action) {
    switch (action.type) {
        case SIGNUP:
            return {
                ...state,
                isLoading: true,
                isError: false,
                error: null
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isError: false,
                user: action.payload.data,
                isLoading: false,
                error: null,
            }
        case SIGNUP_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                user: null,
                error: action.payload.error,
            }
        case SIGNIN:
            return {
                ...state,
                user: null,
                isLoading: true,
                isError: false,
                error: null
            }
        case SIGNIN_SUCCESS:
            return {
                ...state,
                user: action.payload.data,
                isLoading: false,
                isError: false,
                error: null

            }
        case SIGNIN_FAILURE:
            return {
                ...state,
                user: null,
                isLoading: false,
                isError: true,
                error: action.payload.error
            }


        default:
            return state
    }
}
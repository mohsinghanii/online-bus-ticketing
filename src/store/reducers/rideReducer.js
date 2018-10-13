import {
    CREATE_RIDE,
    CREATE_RIDE_FAILURE,
    CREATE_RIDE_SUCCESS,
    GET_RIDES,
    GET_RIDES_FAILURE,
    GET_RIDES_SUCCESS
} from '../constants';

const initialState = {
    isLoading: false,
    isCreated: false,
    error: { isError: false, message: "" },

    rides: [],
}

export default function RideReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_RIDE:
            return {
                ...state,
                isLoading: true,
                isCreated: false,
                error: {
                    isError: false,
                    message: ""
                },
            }
        case CREATE_RIDE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: {
                    isError: true,
                    message: action.payload
                },
            }
        case CREATE_RIDE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isCreated: true,
            }

        case GET_RIDES:
            return {
                ...state,
                isLoading: true,
                error: {
                    isError: false,
                    message: ""
                },
            }
        case GET_RIDES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: {
                    isError: true,
                    message: action.payload
                },
            }
        case GET_RIDES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                rides: action.payload,
            }

        default:
            return state
    }
}
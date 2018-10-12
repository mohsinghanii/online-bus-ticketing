import {
    CREATE_RIDE,
    CREATE_RIDE_FAILURE,
    CREATE_RIDE_SUCCESS
} from '../constants';

const initialState = {
    isLoading: false,
    isCreated: false,
    error: { isError: false, message: "" },
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

        default:
            return state
    }
}
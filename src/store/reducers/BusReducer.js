import {
    CREATE_BUS, CREATE_BUS_FAILURE, CREATE_BUS_SUCCESS
   
} from '../constants'

const initialState = {
    createdBus: {},
    isLoading: false,
    isError: false,
    error: ''
}

export default function BusReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_BUS:
            return {
                ...state,
                createdBus: {},
                isLoading: true,
                isError: false,
                error: ''
            }
        case CREATE_BUS_SUCCESS:
            return {
                ...state,
                isError: false,
                createdBus: action.payload,
                isLoading: false,
                error: '',
            }
        case CREATE_BUS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                isError: true,
                createdBus: {},
                error: action.payload,
            }

        default:
            return state
    }
}
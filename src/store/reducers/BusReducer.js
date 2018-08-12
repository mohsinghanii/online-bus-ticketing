import {
    CREATE_BUS, CREATE_BUS_FAILURE, CREATE_BUS_SUCCESS,
    ADD_CITY, ADD_CITY_SUCCESS, ADD_CITY_FAILURE
} from '../constants'

const initialState = {
    createdBus: {},
    isLoading: false,
    isError: false,
    error: '',
    
    createdCity: null,
    createCityLoader: false,
    createCityError: null
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

        case ADD_CITY:
            return {
                ...state,
                createdCity: null,
                createCityLoader: true,
                createCityError: null
            }
        case ADD_CITY_SUCCESS:
            return {
                ...state,
                createdCity: action.payload,
                createCityLoader: false,
                createCityError: null
            }
        case ADD_CITY_FAILURE:
            return {
                ...state,
                createdCity: null,
                createCityLoader: false,
                createCityError: action.payload
            }

        default:
            return state
    }
}
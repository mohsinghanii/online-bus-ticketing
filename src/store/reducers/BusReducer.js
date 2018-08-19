import {
    CREATE_BUS, CREATE_BUS_FAILURE, CREATE_BUS_SUCCESS,
    ADD_CITY, ADD_CITY_SUCCESS, ADD_CITY_FAILURE,
    GET_CITIES, GET_CITIES_SUCCESS, GET_CITIES_FAILURE,
    GET_BUSES, GET_BUSES_FAILURE, GET_BUSES_SUCCESS
} from '../constants'
import { stat } from 'fs';

const initialState = {
    createdBus: {},
    isLoading: false,
    isError: false,
    error: '',

    createdCity: null,
    createCityLoader: false,
    createCityError: null,

    cities: null,
    getCitiesLoader: false,
    getCitiesError: null,

    getBusLoader: false,
    getBuses:[],
    getBusesError: { isError: false, error: null }
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

        case GET_CITIES:
            return {
                ...state,
                cities: null,
                getCitiesLoader: true,
                getCitiesError: null
            }
        case GET_CITIES_SUCCESS:
            return {
                ...state,
                cities: action.payload,
                getCitiesLoader: false,
                getCitiesError: null
            }
        case GET_CITIES_FAILURE:
            return {
                ...state,
                cities: null,
                getCitiesLoader: false,
                getCitiesError: action.payload
            }

        case GET_BUSES:
            return {
                ...state,
                getBusLoader: true,
                getBuses: {},
                getBusesError: { isError: false, error: "" }
            }

        case GET_BUSES_SUCCESS:
            return {
                ...state,
                getBusLoader: false,
                getBuses: action.payload
            }

        case GET_BUSES_FAILURE:
            return {
                ...state,
                getBusLoader: false,
                getBusesError: { isError: true, error: action.payload }
            }

        default:
            return state
    }
}
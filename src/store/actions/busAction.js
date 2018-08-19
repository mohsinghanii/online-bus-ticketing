import {
    CREATE_BUS, CREATE_BUS_SUCCESS, CREATE_BUS_FAILURE,
    ADD_CITY, ADD_CITY_SUCCESS, ADD_CITY_FAILURE,
    GET_CITIES, GET_CITIES_SUCCESS, GET_CITIES_FAILURE,
    GET_BUSES, GET_BUSES_FAILURE, GET_BUSES_SUCCESS
} from './../constants'

export class BusAction {
    static createBus(payload) {
        return {
            type: CREATE_BUS,
            payload
        }
    }

    static createBusSuccess(payload) {
        return {
            type: CREATE_BUS_SUCCESS,
            payload
        }
    }

    static createBusFailure(payload) {
        return {
            type: CREATE_BUS_FAILURE,
            payload
        }
    }

    static addCity(payload) {
        return {
            type: ADD_CITY,
            payload
        }
    }

    static addCitySuccess(payload) {
        return {
            type: ADD_CITY_SUCCESS,
            payload
        }
    }

    static addCityFailure(payload) {
        return {
            type: ADD_CITY_FAILURE,
            payload
        }
    }
    
    static getCities(payload) {
        return {
            type: GET_CITIES,
            payload
        }
    }

    static getCitiesSuccess(payload) {
        return {
            type: GET_CITIES_SUCCESS,
            payload
        }
    }

    static getCitiesFailure(payload) {
        return {
            type: GET_CITIES_SUCCESS,
            payload
        }
    }

    static getBuses(payload) {
        return {
            type: GET_BUSES,
            payload
        }
    }

    static getBusesSuccess(payload) {
        return {
            type: GET_BUSES_SUCCESS,
            payload
        }
    }

    static getBusesFailure(payload) {
        return {
            type: GET_BUSES_FAILURE,
            payload
        }
    }
}
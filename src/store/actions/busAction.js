import {
    CREATE_BUS, CREATE_BUS_SUCCESS, CREATE_BUS_FAILURE,
    ADD_CITY, ADD_CITY_SUCCESS, ADD_CITY_FAILURE
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
}
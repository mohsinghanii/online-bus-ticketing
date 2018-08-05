import {
    CREATE_BUS, CREATE_BUS_SUCCESS, CREATE_BUS_FAILURE,
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
}
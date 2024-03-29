import {
    CREATE_RIDE, CREATE_RIDE_FAILURE, CREATE_RIDE_SUCCESS,
    GET_RIDES, GET_RIDES_FAILURE, GET_RIDES_SUCCESS
} from './../constants'

export class RideAction {
    
    static createRide(payload) {
        return {
            type: CREATE_RIDE,
            payload
        }
    }

    static createRideSuccess(payload) {
        return {
            type: CREATE_RIDE_SUCCESS,
            payload
        }
    }

    static createRideFailure(payload) {
        return {
            type: CREATE_RIDE_FAILURE,
            payload
        }
    }

    static getRides(payload) {
        return {
            type: GET_RIDES,
            payload
        }
    }

    static getRidesSuccess(payload) {
        return {
            type: GET_RIDES_SUCCESS,
            payload
        }
    }

    static getRidesFailure(payload) {
        return {
            type: GET_RIDES_FAILURE,
            payload
        }
    }


}
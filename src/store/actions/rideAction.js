import {
    CREATE_RIDE, CREATE_RIDE_FAILURE, CREATE_RIDE_SUCCESS,
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

}
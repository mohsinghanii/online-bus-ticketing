import {
    CREATE_RIDE,
    GET_RIDES
} from '../constants';
import { createRide, getRides } from './../../firebase/db';
import { Observable } from 'rxjs/Rx';
import { RideAction } from './../actions/rideAction'

export default class RideEpic {

    static createRide = (action$) =>
        action$.ofType(CREATE_RIDE)
            .switchMap(({ payload }) => {
                const { ride_id, ride_title, bid, cid, arrDate, depDate, route_id } = payload;
                return Observable.fromPromise(createRide(ride_id, ride_title, bid, cid, arrDate, depDate, route_id))
                    .switchMap((response) => {
                        return Observable.of(
                            RideAction.createRideSuccess(response)
                        )
                    })
                    .catch((err) => {
                        return Observable.of(
                            RideAction.createRideFailure(err)
                        )
                    })
            })

    static getRides = (action$) =>
        action$.ofType(GET_RIDES)
            .switchMap(({}) => {
                return Observable.fromPromise(getRides())
                    .switchMap((response) => {
                        return Observable.of(
                            RideAction.getRidesSuccess(response)
                        )
                    })
                    .catch((err) => {
                        return Observable.of(
                            RideAction.getRidesFailure(err)
                        )
                    })
            })
}


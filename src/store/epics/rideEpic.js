import {
    CREATE_RIDE
} from '../constants';
import { createRide } from './../../firebase/db';
import { Observable } from 'rxjs/Rx';
import { RideAction } from './../actions/rideAction'

export default class RideEpic {

    static createRide = (action$) =>
        action$.ofType(CREATE_RIDE)
            .switchMap(({ payload }) => {
             const { ride_id, ride_title, bid, cid, arrDate, depDate } = payload;
                return Observable.fromPromise(createRide(ride_id, ride_title, bid, cid, arrDate, depDate))
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
}


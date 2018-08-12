import {
    ADD_CITY,
    CREATE_BUS
} from '../constants';
import { doCreateBusInCompany, doAddCity } from './../../firebase/db';
import { Observable } from 'rxjs/Rx';
import { BusAction } from './../actions/index'

export default class BusEpic {

    static createBus = (action$) =>
        action$.ofType(CREATE_BUS)
            .switchMap(({ payload }) => {
                const { bid, cid, bus_name, date_created, no_of_seats } = payload
                return Observable.fromPromise(doCreateBusInCompany(bid, cid, bus_name, date_created, no_of_seats))
                    .switchMap((response) => {
                        return Observable.of(
                            BusAction.createBusSuccess(response)
                        )
                    })
                    .catch((err) => {
                        return Observable.of(
                            BusAction.createBusFailure(err)
                        )
                    })
            })

    static addCity = (action$) =>
        action$.ofType(ADD_CITY)
            .switchMap(({ payload }) => {
                const { city, date_created } = payload
                return Observable.fromPromise(doAddCity(city, date_created))
                    .switchMap((response) => {
                        return Observable.of(
                            BusAction.addCitySuccess(response)
                        )
                    })
                    .catch((err) => {
                        return Observable.of(
                            BusAction.addCityFailure(err)
                        )
                    })
            })

}


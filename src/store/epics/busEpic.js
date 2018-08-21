import {
    ADD_CITY,
    CREATE_BUS,
    GET_CITIES,
    GET_BUSES,
    CREATE_ROUTE,
    GET_ROUTES
} from '../constants';
import { doCreateBusInCompany, doAddCity, getCities, getBuses, createRoute, getRoutes } from './../../firebase/db';
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
                            BusAction.addCitySuccess(response),
                            BusAction.getCities()
                        )
                    })
                    .catch((err) => {
                        return Observable.of(
                            BusAction.addCityFailure(err)
                        )
                    })
            })

    static createRoute = (action$) =>
        action$.ofType(CREATE_ROUTE)
            .switchMap(({ payload }) => {
                const { route_id, routeTitle, stops, aboutRoute } = payload
                return Observable.fromPromise(createRoute(route_id, routeTitle, stops, aboutRoute))
                    .switchMap((response) => {
                        return Observable.of(
                            BusAction.createRouteSuccess(response)
                        )
                    })
                    .catch((err) => {
                        return Observable.of(
                            BusAction.createRouteFailure(err)
                        )
                    })
            })

    static getCities = (action$) =>
        action$.ofType(GET_CITIES)
            .switchMap(({ }) => {
                return Observable.fromPromise(getCities())
                    .switchMap((response) => {
                        return Observable.of(
                            BusAction.getCitiesSuccess(response)
                        )
                    })
                    .catch((err) => {
                        return Observable.of(
                            BusAction.getCitiesFailure(err)
                        )
                    })
            })

    static getRoutes = (action$) =>
        action$.ofType(GET_ROUTES)
            .switchMap(({ }) => {
                return Observable.fromPromise(getRoutes())
                    .switchMap((response) => {
                        return Observable.of(
                            BusAction.getRoutesSuccess(response)
                        )
                    })
                    .catch((err) => {
                        return Observable.of(
                            BusAction.getRoutesFailure(err)
                        )
                    })
            })

    static getBuses = (action$) =>
        action$.ofType(GET_BUSES)
            .switchMap(({ payload }) => {
                debugger
                return Observable.fromPromise(getBuses(payload))
                    .switchMap((response) => {
                        return Observable.of(
                            BusAction.getBusesSuccess(response)
                        )
                    })
                    .catch((err) => {
                        return Observable.of(
                            BusAction.getBusesFailure(err)
                        )
                    })
            })

}


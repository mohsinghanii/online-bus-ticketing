import {
CREATE_BUS
} from '../constants';
import { doCreateBusInCompany } from './../../firebase/db';
import { Observable } from 'rxjs/Rx';
import { BusAction } from './../actions/index'

export default class BusEpic {

    static createBus = (action$) =>
        action$.ofType(CREATE_BUS)
            .switchMap(({ payload }) => {
                const { bid, cid, bus_name, date_created } = payload
                return Observable.fromPromise(doCreateBusInCompany(bid, cid, bus_name, date_created))
                   .switchMap((response)=>{
                      return Observable.of(
                          BusAction.createBusSuccess(response)
                      )
                   })
                   .catch((err)=>{
                      return Observable.of(
                          BusAction.createBusFailure(err)
                      )
                   })
            })

}


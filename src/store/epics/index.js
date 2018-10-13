import { combineEpics } from 'redux-observable';
import AuthEpic from './userEpic';
import CompanyEpic from './CompanyEpic';
import BusEpic from './busEpic';
import RideEpic from './rideEpic';

const rootEpic = combineEpics(
    AuthEpic.signUpEpic,
    AuthEpic.signInEpic,

    CompanyEpic.createCompany,
    CompanyEpic.getCompanies,
    CompanyEpic.getCompany,
    //Buses
    BusEpic.createBus,
    BusEpic.addCity,
    BusEpic.getCities,
    BusEpic.getBuses,
    BusEpic.createRoute,
    BusEpic.getRoutes,

    //Ride
    RideEpic.createRide,
    RideEpic.getRides

);

export default rootEpic;
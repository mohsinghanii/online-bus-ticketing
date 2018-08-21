import { combineEpics } from 'redux-observable';
import AuthEpic from './userEpic';
import CompanyEpic from './CompanyEpic';
import BusEpic from './busEpic';

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

);

export default rootEpic;
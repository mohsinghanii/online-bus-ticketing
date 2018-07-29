import { combineEpics } from 'redux-observable';
import AuthEpic from './userEpic';
import CompanyEpic from './CompanyEpic';

const rootEpic = combineEpics(
    AuthEpic.signUpEpic,


    CompanyEpic.createCompany,
);

export default rootEpic;
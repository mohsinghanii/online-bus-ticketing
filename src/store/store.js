import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import rootReducer from './reducers'
import rootEpic from './epics'

// For initialize in application
const epicMiddleware = createEpicMiddleware();

const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);

epicMiddleware.run(rootEpic);

export const store = createStoreWithMiddleware(rootReducer,window.devToolsExtension ? window.devToolsExtension() : f => f);
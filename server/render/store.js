import { createStore,applyMiddleware,compose} from 'redux';
import reducer from '../../client/src/redux/reducers';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk';

import sagaMonitor from '../../client/src/redux/sagaMonitor'
import rootSaga from '../../client/src/redux/sagas'
import createMemoryHistory from 'history/createMemoryHistory';

const getCreateStore = (ctx) =>{
    const initialState = {};
    const path = ctx.req.url;
    const history = createMemoryHistory({ initialEntries: [path] });
    const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
    const middleware = [sagaMiddleware, routerMiddleware(history)];
    const composedEnhancers = compose(applyMiddleware(...middleware));
    const  store = createStore(reducer, initialState, composedEnhancers);
    sagaMiddleware.run(rootSaga)

    return { history, store };
}
export default getCreateStore;
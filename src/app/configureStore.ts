import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { IUser } from './entities/user';
import { Gender } from './entities/gender';
import { composeWithDevTools } from 'redux-devtools-extension';

export type Store = {
    user: IUser;
    student: any;
    earning: any;
    avatar: any;
    blockPresentation: any;
};

const persistConfig = {
    key: 'root',
    storage: storage
};

const logger = createLogger();

const promise = () => (next: any) => (action: any) => (
    typeof action.then === 'function'
        ? Promise.resolve(action).then(next, (error: any) => {
            throw error; // To let the caller handle the rejection
        })
        : next(action)
)

const enhancer = process.env.REACT_APP_ENABLE_REDUX_DEVTOOL_EXTENSION === 'True' ?
    composeWithDevTools(
        process.env.REACT_APP_ENABLE_REDUX_LOGGER === 'True' ?
            applyMiddleware(thunk, promise, logger) :
            applyMiddleware(thunk, promise)
    ) :
    compose(
        process.env.REACT_APP_ENABLE_REDUX_LOGGER === 'True' ?
            applyMiddleware(thunk, promise, logger) :
            applyMiddleware(thunk, promise)
    );

const persistedReducer = persistReducer(persistConfig, rootReducer);
// export default function configureStore(onCompletion: any) {
export default function configureStore() {
  const store: any = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store);
  return {store, persistor};
}

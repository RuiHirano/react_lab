import { createStore, applyMiddleware } from 'redux'
import combineModules from '../modules'
import { persistStore, persistReducer } from 'redux-persist'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
	key: 'root',
	storage,
}

const persistedReducer = persistReducer(persistConfig, combineModules)

export default function configureStore() {

	const store = createStore(
		persistedReducer,
		applyMiddleware(logger)
	)
	let persistor = persistStore(store)

	return { store, persistor }
}


import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"

import RootReducer from "./Reducers/RootReducers"
import RootSagas from "./Sagas/RootSagas"

const saga = createSagaMiddleware()

const Store = configureStore({
    reducer: RootReducer,
    middleware: () => [saga]
})
export default Store

saga.run(RootSagas)
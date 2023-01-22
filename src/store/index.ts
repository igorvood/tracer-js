import {configureStore} from '@reduxjs/toolkit'

import {setupListeners} from '@reduxjs/toolkit/query'
import {tracerApi} from "./tracer/tracer.api";
import {tracerReducer} from "./tracer/tracer.slice";

export const store = configureStore({
    reducer: {
        [tracerApi.reducerPath]: tracerApi.reducer,
        tracer: tracerReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(tracerApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
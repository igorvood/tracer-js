import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IGraph} from "../../models/models";

export const tracerApi = createApi({
    reducerPath: 'tracer/Api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/'
    }),
    endpoints: build => ({
        getGraphByGroup: build.query<IGraph, string>({
            query: (groupName: string) => ({
                url: `arrows/byGroup/${groupName}`
            })
        }),

    })

})

export const {useGetGraphByGroupQuery, useLazyGetGraphByGroupQuery} = tracerApi
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IGraph, IGroupServiceDto} from "../../models/models";

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
        groupListLike: build.query<IGroupServiceDto[], string>({
            query: (groupNameLike: string) => ({
                url: `group/like`,
                params: {
                    groupIdLike: groupNameLike,
                    limit: 10
                }
            })
        }),

    })

})

export const {useGetGraphByGroupQuery, useLazyGetGraphByGroupQuery} = tracerApi
export const {useGroupListLikeQuery, useLazyGroupListLikeQuery} = tracerApi
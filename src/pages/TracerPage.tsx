import React from "react";
import {useGetGraphByGroupQuery} from "../store/tracer/tracer.api";

export function TracerPage() {

    const {isLoading, isError, data} = useGetGraphByGroupQuery('rto_graph')

    console.log(data)
    return (
        <h1>TracerPage</h1>
    )
}
import React, {useEffect, useState} from "react";
import {useGroupListLikeQuery} from "../store/tracer/tracer.api";
import {useDebounce} from "../hooks/debounce";

export function TracerPage() {

    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search)
    const {isLoading, isError, data: groups} = useGroupListLikeQuery(debouncedSearch, {
        skip: debouncedSearch.length < 2
    })


    useEffect(() =>{
        console.log(debouncedSearch)
        },
        [debouncedSearch]
    )

    return (
        <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
            { isError && <p className="text-center text-red-600">Не удалось получить граф</p> }
            <div className="relative w-[560px]">
                <input
                    type="text"
                    className="border py-2 px-4 w-full h-[42px] mb-2"
                    placeholder="Search group for graph..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
                    { isLoading && <p className="text-center">Loading...</p> }
                </ul>

            </div>
        </div>

    )
}
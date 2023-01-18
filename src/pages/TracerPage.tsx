import React, {useEffect, useState} from "react";
import {useGetGraphByGroupQuery, useGroupListLikeQuery} from "../store/tracer/tracer.api";
import {useDebounce} from "../hooks/debounce";

export function TracerPage() {

    const [search, setSearch] = useState('')
    let [dropDown, setDropDown] = useState(false);
    const debouncedSearchUser = useDebounce(search)
    const {isLoading: isLoadingUser, isError: isErrorUser, data: groups} = useGroupListLikeQuery(debouncedSearchUser, {
        skip: debouncedSearchUser.length < 2
    })


    const {isLoading: isLoadingGraph, isError: isErrorGraph, data: graph} = useGetGraphByGroupQuery(debouncedSearchUser)


    useEffect(() =>{
        // показывать дроп даун если
        setDropDown(debouncedSearchUser.length > 2 && groups?.length! > 0)
        },
        [debouncedSearchUser, groups]
    )

    const clickDropDownHandler = (groupId: String) =>  {

    }

    return (
        <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
            { isErrorUser && <p className="text-center text-red-600">Не удалось получить граф</p> }
            <div className="relative w-[560px]">
                <input
                    type="text"
                    className="border py-2 px-4 w-full h-[42px] mb-2"
                    placeholder="Search group for graph..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                {dropDown && <ul
                    className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
                    {isLoadingUser && <p className="text-center">Loading...</p>}
                    {groups?.map(gr => <li key={gr.id}
                                           className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                                           onClick={() => clickDropDownHandler(gr.id)}
                        >{gr.id}</li>
                    )
                    }
                </ul>}

            </div>
        </div>

    )
}
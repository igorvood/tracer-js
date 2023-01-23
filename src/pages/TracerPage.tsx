import React, {useEffect, useState} from "react";
import {
    useGroupListLikeQuery,
    useLazyGetGraphByGroupQuery,
    useLazyInvalidateGroupQuery,
} from "../store/tracer/tracer.api";
import {useDebounce} from "../hooks/debounce";
import {ServiceKafkaGraph} from "../components/ServiceKafkaGraph";
import {Button} from "../components/Button";
import {useActions} from "../hooks/actions";
import {useAppSelector} from "../hooks/redux";

export function TracerPage() {

    const {idGroup} = useAppSelector(state => state.tracer)

    const {rememberIdGroup} = useActions();

    const [search, setSearch] = useState(idGroup ?? '')
    const [dropDown, setDropDown] = useState(false);
    const debouncedSearchUser = useDebounce(search)
    const {isLoading: isLoadingUser, isError: isErrorUser, data: groups} = useGroupListLikeQuery(debouncedSearchUser, {
        skip: debouncedSearchUser.length < 2
    })

    const [fetchRepos, {isLoading: isLoadingGraph, isError: isErrorGraph, data: graph}] = useLazyGetGraphByGroupQuery()

    const [fetchInvalidateGroup, {isLoading: isLoadingInvalidate, isError: isErrorInvalidate}] = useLazyInvalidateGroupQuery()

    useEffect(() => {
            // показывать дроп даун если
            setDropDown(debouncedSearchUser.length > 2 && groups?.length! > 0)
        },
        [debouncedSearchUser, groups]
    )

    const clickDropDownHandler = (groupId: string) => {
        rememberIdGroup(groupId)
        fetchRepos(groupId)
        setSearch(groupId)
        setDropDown(false)
    }

    return (
        <div>
            <div className="flex justify-center pt-10 mx-auto w-screen">
                {isErrorUser && <p className="text-center text-red-600">Не удалось получить список групп</p>}
                <div className="relative w-[560px]">
                    <input
                        type="text"
                        className="border py-2 px-4 w-full h-[42px] mb-2"
                        placeholder="Search group for graph..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {search.length>0 && <Button text="Сброс кеша" clickFun={() => fetchInvalidateGroup(search) }/>
                    }
                    {search.length>0 && <Button text="Обновить граф" clickFun={() => clickDropDownHandler(search) } />
                    }

                    {(dropDown && idGroup!= search) && <ul
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
            <div >
                {isLoadingGraph && <p className="text-center">Graph is loading...</p>}
                {isErrorGraph && <p className="text-center text-red-600">Не удалось получить граф</p>}
                {/*{ graph?.map(repo => <RepoCard repo={repo} key={repo.id} />) }*/}
                {!dropDown &&
                    // <div className="justify-center py-2 px-4">
                        graph && <ServiceKafkaGraph graph={graph}></ServiceKafkaGraph>
                    // </div>
                }
            </div>

            {/*<div className="border py-3 px-5 w-full h-full rounded mb-2 bg-gray-500 flex-grow: 3">asd</div>*/}
        </div>

    )
}
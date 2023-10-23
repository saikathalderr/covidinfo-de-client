import { DeathsOrder, DeathsSort } from '@/interfaces/deaths.interface';
import { useEffect, useState } from 'react';

import { Icon } from '@iconify/react/dist/iconify.js';
import TBody from '@/components/common/TBody';
import TData from '@/components/common/TData';
import THead from '@/components/common/THead';
import THeader from '@/components/common/THeader';
import TRow from '@/components/common/TRow';
import Table from '@/components/common/Table';
import TableSkeleton from '@/components/TableSkeleton';
import dayjs from 'dayjs';
import { useGermanyStatesStore } from '@/store/useGermanyStates';
import { useSearchParams } from 'react-router-dom';

type StatesDeathsHistoryTableProps = {
    stateCode: string;
};

function StatesDeathsHistoryTable({ stateCode }: StatesDeathsHistoryTableProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const [sort, setSort] =
        useState<DeathsSort | undefined>(searchParams.get('sort') as DeathsSort) || undefined;
    const [order, setOrder] =
        useState<DeathsOrder | undefined>(searchParams.get('order') as DeathsOrder) || undefined;

    const fetchGermanyStateDeathsHistoryData = useGermanyStatesStore(
        (state) => state.fetchGermanyStateDeathsHistory,
    );
    const isLoadingStateDeathsHistory = useGermanyStatesStore(
        (state) => state.isLoadingStateDeathsHistory,
    );
    const germanyStateDeathsHistory = useGermanyStatesStore(
        (state) => state.stateDeathsHistory[stateCode],
    );

    useEffect(() => {
        const fetchStateDeathsHistory = async () => {
            await fetchGermanyStateDeathsHistoryData({ stateCode, sort, order });
        };

        if (stateCode) {
            fetchStateDeathsHistory();
        }
    }, [fetchGermanyStateDeathsHistoryData, stateCode, sort, order]);

    const toggleOrder = (sortField: DeathsSort) => {
        let newOrder;
        if (order === DeathsOrder.ASC) {
            newOrder = DeathsOrder.DESC;
        } else if (order === DeathsOrder.DESC) {
            newOrder = DeathsOrder.ASC;
        } else if (order === null) {
            newOrder = DeathsOrder.DESC;
        } else {
            newOrder = DeathsOrder.DESC;
        }
        const newSort = sortField === DeathsSort.DEATHS ? DeathsSort.DEATHS : DeathsSort.DATE;
        const params = new URLSearchParams(searchParams.toString());
        params.set('order', newOrder);
        params.set('sort', newSort);
        setSearchParams(params);
        setOrder(newOrder);
        setSort(newSort);
    };

    return (
        <>
            <Table>
                <THead>
                    <TRow>
                        <THeader>#</THeader>
                        <THeader>
                            Deaths
                            {order === DeathsOrder.DESC && sort === DeathsSort.DEATHS ? (
                                <Icon
                                    icon="iconamoon:arrow-down-2-fill"
                                    width={20}
                                    className="cursor-pointer"
                                    onClick={() => toggleOrder(DeathsSort.DEATHS)}
                                />
                            ) : (
                                <Icon
                                    icon="iconamoon:arrow-up-2-fill"
                                    width={20}
                                    className="cursor-pointer"
                                    onClick={() => toggleOrder(DeathsSort.DEATHS)}
                                />
                            )}
                        </THeader>
                        <THeader>
                            Date
                            {order === DeathsOrder.DESC && sort === DeathsSort.DATE ? (
                                <Icon
                                    icon="iconamoon:arrow-down-2-fill"
                                    width={20}
                                    className="cursor-pointer"
                                    onClick={() => toggleOrder(DeathsSort.DATE)}
                                />
                            ) : (
                                <Icon
                                    icon="iconamoon:arrow-up-2-fill"
                                    width={20}
                                    className="cursor-pointer"
                                    onClick={() => toggleOrder(DeathsSort.DATE)}
                                />
                            )}
                        </THeader>
                    </TRow>
                </THead>

                <TBody>
                    {isLoadingStateDeathsHistory
                        ? [...Array(16).keys()].map(() => {
                              return <TableSkeleton key={`skeleton-${Math.random()}`} />;
                          })
                        : germanyStateDeathsHistory &&
                          germanyStateDeathsHistory?.history?.map((state, index) => {
                              return (
                                  <TRow key={index}>
                                      <TData>{index + 1}</TData>
                                      <TData>{state.deaths}</TData>
                                      <TData>{dayjs(state.date).format('DD/MM/YYYY')}</TData>
                                  </TRow>
                              );
                          })}
                </TBody>
            </Table>
        </>
    );
}

export default StatesDeathsHistoryTable;

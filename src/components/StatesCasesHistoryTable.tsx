import { CasesOrder, CasesSort } from '@/interfaces/cases.interface';
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

type StatesCasesHistoryTableProps = {
    stateCode: string;
};

function StatesCasesHistoryTable({ stateCode }: StatesCasesHistoryTableProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const [sort, setSort] =
        useState<CasesSort | undefined>(searchParams.get('sort') as CasesSort) || undefined;
    const [order, setOrder] =
        useState<CasesOrder | undefined>(searchParams.get('order') as CasesOrder) || undefined;

    const fetchGermanyStateCasesHistoryData = useGermanyStatesStore(
        (state) => state.fetchGermanyStateCasesHistory,
    );
    const isLoadingStateCasesHistory = useGermanyStatesStore(
        (state) => state.isLoadingStateCasesHistory,
    );
    const germanyStateCasesHistory = useGermanyStatesStore(
        (state) => state.stateCasesHistory[stateCode],
    );

    useEffect(() => {
        const fetchStateCasesHistory = async () => {
            await fetchGermanyStateCasesHistoryData({ stateCode, sort, order });
        };

        if (stateCode) {
            fetchStateCasesHistory();
        }
    }, [fetchGermanyStateCasesHistoryData, stateCode, sort, order]);

    const toggleOrder = (sortField: CasesSort) => {
        let newOrder;
        if (order === CasesOrder.ASC) {
            newOrder = CasesOrder.DESC;
        } else if (order === CasesOrder.DESC) {
            newOrder = CasesOrder.ASC;
        } else if (order === null) {
            newOrder = CasesOrder.DESC;
        } else {
            newOrder = CasesOrder.DESC;
        }
        const newSort = sortField === CasesSort.CASES ? CasesSort.CASES : CasesSort.DATE;
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
                            Cases
                            {order === CasesOrder.DESC && sort === CasesSort.CASES ? (
                                <Icon
                                    icon="iconamoon:arrow-down-2-fill"
                                    width={20}
                                    className="cursor-pointer"
                                    onClick={() => toggleOrder(CasesSort.CASES)}
                                />
                            ) : (
                                <Icon
                                    icon="iconamoon:arrow-up-2-fill"
                                    width={20}
                                    className="cursor-pointer"
                                    onClick={() => toggleOrder(CasesSort.CASES)}
                                />
                            )}
                        </THeader>
                        <THeader>
                            Date
                            {order === CasesOrder.DESC && sort === CasesSort.DATE ? (
                                <Icon
                                    icon="iconamoon:arrow-down-2-fill"
                                    width={20}
                                    className="cursor-pointer"
                                    onClick={() => toggleOrder(CasesSort.DATE)}
                                />
                            ) : (
                                <Icon
                                    icon="iconamoon:arrow-up-2-fill"
                                    width={20}
                                    className="cursor-pointer"
                                    onClick={() => toggleOrder(CasesSort.DATE)}
                                />
                            )}
                        </THeader>
                    </TRow>
                </THead>

                <TBody>
                    {isLoadingStateCasesHistory
                        ? [...Array(16).keys()].map(() => {
                              return <TableSkeleton key={`skeleton-${Math.random()}`} />;
                          })
                        : germanyStateCasesHistory &&
                          germanyStateCasesHistory?.history?.map((state, index) => {
                              return (
                                  <TRow key={index}>
                                      <TData>{index + 1}</TData>
                                      <TData>{state.cases}</TData>
                                      <TData>{dayjs(state.date).format('DD/MM/YYYY')}</TData>
                                  </TRow>
                              );
                          })}
                </TBody>
            </Table>
        </>
    );
}

export default StatesCasesHistoryTable;

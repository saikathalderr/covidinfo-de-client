import { DeathsOrder, DeathsSort } from '@/interfaces/deaths.interface';
import { useEffect, useState } from 'react';

import Header from '@/components/common/Header';
import { Icon } from '@iconify/react';
import TBody from '@/components/common/TBody';
import TData from '@/components/common/TData';
import THead from '@/components/common/THead';
import THeader from '@/components/common/THeader';
import TRow from '@/components/common/TRow';
import Table from '@/components/common/Table';
import TableSkeleton from '@/components/TableSkeleton';
import dayjs from 'dayjs';
import { useDeathsStore } from '@/store/useDeaths';
import { useSearchParams } from 'react-router-dom';

function GermanyDeaths() {
    const sectionName = 'Germany COVID Deaths';

    const [searchParams, setSearchParams] = useSearchParams();

    const [sort, setSort] = useState<DeathsSort | undefined>(undefined);
    const [order, setOrder] = useState<DeathsOrder | undefined>(undefined);

    const fetchDeathsData = useDeathsStore((state) => state.fetchDeaths);
    const deaths = useDeathsStore((state) => state.deaths);
    const isLoading = useDeathsStore((state) => state.isLoading);

    useEffect(() => {
        fetchDeathsData({ sort, order });
    }, [fetchDeathsData, sort, order]);

    useEffect(() => {
        if (searchParams.get('order') === DeathsOrder.ASC) {
            setOrder(DeathsOrder.ASC);
        } else if (searchParams.get('order') === DeathsOrder.DESC) {
            setOrder(DeathsOrder.DESC);
        } else {
            setOrder(undefined);
        }
    }, [searchParams]);

    useEffect(() => {
        if (searchParams.get('sort') === DeathsSort.DEATHS) {
            setSort(DeathsSort.DEATHS);
        } else if (searchParams.get('sort') === DeathsSort.DATE) {
            setSort(DeathsSort.DATE);
        } else {
            setSort(undefined);
        }
    }, [searchParams]);

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
            <Header title={sectionName} />
            <div className="mb-10">
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
                        {isLoading
                            ? [...Array(16).keys()].map((idx) => {
                                  return <TableSkeleton key={`skeleton-${idx + 1}`} />;
                              })
                            : deaths.map((deathChild, idx) => {
                                  const { deaths: deathsCount, date } = deathChild;

                                  return (
                                      <TRow key={`death-${idx + 1}`}>
                                          <TData>{idx + 1}</TData>
                                          <TData>{deathsCount}</TData>
                                          <TData>{dayjs(date).format('DD/MM/YYYY')}</TData>
                                      </TRow>
                                  );
                              })}
                    </TBody>
                </Table>
            </div>
        </>
    );
}

export default GermanyDeaths;

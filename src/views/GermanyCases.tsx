import { CasesOrder, CasesSort } from '@/interfaces/cases.interface';
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
import { useCasesStore } from '@/store/useCases';
import { useSearchParams } from 'react-router-dom';

function GermanyCases() {
    const sectionName = 'Germany COVID Cases';

    const [searchParams, setSearchParams] = useSearchParams();

    const [sort, setSort] = useState<CasesSort | undefined>(undefined);
    const [order, setOrder] = useState<CasesOrder | undefined>(undefined);

    const fetchCasesData = useCasesStore((state) => state.fetchCases);
    const cases = useCasesStore((state) => state.cases);
    const isLoading = useCasesStore((state) => state.isLoading);

    useEffect(() => {
        fetchCasesData({ sort, order });
    }, [fetchCasesData, sort, order]);

    useEffect(() => {
        if (searchParams.get('order') === CasesOrder.ASC) {
            setOrder(CasesOrder.ASC);
        } else if (searchParams.get('order') === CasesOrder.DESC) {
            setOrder(CasesOrder.DESC);
        } else {
            setOrder(undefined);
        }
    }, [searchParams]);

    useEffect(() => {
        if (searchParams.get('sort') === CasesSort.CASES) {
            setSort(CasesSort.CASES);
        } else if (searchParams.get('sort') === CasesSort.DATE) {
            setSort(CasesSort.DATE);
        } else {
            setSort(undefined);
        }
    }, [searchParams]);

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
            <Header title={sectionName} />
            <div className="mb-10">
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
                        {isLoading
                            ? [...Array(16).keys()].map((idx) => {
                                  return <TableSkeleton key={`skeleton-${idx + 1}`} />;
                              })
                            : cases.map((caseChild, idx) => {
                                  const { cases: casesCount, date } = caseChild;

                                  return (
                                      <TRow key={`case-${idx + 1}`}>
                                          <TData>{idx + 1}</TData>
                                          <TData>{casesCount}</TData>
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

export default GermanyCases;

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
import { useEffect } from 'react';

function GermanyCases() {
    const fetchCasesData = useCasesStore((state) => state.fetchCases);
    const cases = useCasesStore((state) => state.cases);
    const isLoading = useCasesStore((state) => state.isLoading);

    useEffect(() => {
        fetchCasesData();
    }, [fetchCasesData]);

    const sectionName = 'Germany COVID Cases';
    return (
        <>
            <Header title={sectionName} />
            <div>
                <Table>
                    <THead>
                        <TRow>
                            <THeader>#</THeader>
                            <THeader>
                                Cases
                                <Icon icon="iconamoon:arrow-down-2-fill" width={20} />
                            </THeader>
                            <THeader>
                                Date
                                <Icon icon="iconamoon:arrow-up-2-fill" width={20} />
                            </THeader>
                        </TRow>
                    </THead>

                    <TBody>
                        {isLoading
                            ? [...Array(16).keys()].map(() => {
                                  return <TableSkeleton />;
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

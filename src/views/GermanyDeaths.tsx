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
import { useEffect } from 'react';

function GermanyDeaths() {
    const fetchDeathsData = useDeathsStore((state) => state.fetchDeaths);
    const deaths = useDeathsStore((state) => state.deaths);
    const isLoading = useDeathsStore((state) => state.isLoading);

    useEffect(() => {
        fetchDeathsData();
    }, [fetchDeathsData]);

    const sectionName = 'Germany COVID Deaths';
    return (
        <>
            <Header title={sectionName} />
            <div>
                <Table>
                    <THead>
                        <TRow>
                            <THeader>#</THeader>
                            <THeader>
                                Deaths
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

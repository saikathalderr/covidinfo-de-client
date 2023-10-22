import { GermanyState } from '@/interfaces/states.interface';
import { Link } from 'react-router-dom';
import TBody from '@/components/common/TBody';
import TData from '@/components/common/TData';
import THead from '@/components/common/THead';
import THeader from '@/components/common/THeader';
import TRow from '@/components/common/TRow';
import Table from '@/components/common/Table';
import TableSkeleton from './TableSkeleton';
import { useEffect } from 'react';
import { useGermanyStatesStore } from '@/store/useGermanyStates';

function StatesTable() {
    const isLoading = useGermanyStatesStore((state) => state.isLoading);
    const fetchGermanyAllStatesData = useGermanyStatesStore((state) => state.fetchGermanyAllStates);
    const germanyAllStates = Object.values(
        useGermanyStatesStore((state) => state.states),
    ) as GermanyState[];

    useEffect(() => {
        fetchGermanyAllStatesData();
    }, [fetchGermanyAllStatesData]);

    return (
        <>
            <Table>
                <THead>
                    <TRow>
                        <THeader>#</THeader>
                        <THeader>State</THeader>
                        <THeader>Cases</THeader>
                        <THeader>Deaths</THeader>
                    </TRow>
                </THead>

                <TBody>
                    {isLoading
                        ? [...Array(16).keys()].map(() => {
                              return <TableSkeleton />;
                          })
                        : germanyAllStates.map((germanyState, idx) => {
                              const { id, name, cases, deaths } = germanyState;
                              const stateLink = `/germany/states/${name}`;
                              const stateCasesLink = stateLink + `/cases`;
                              const stateDeathsLink = stateLink + `/deaths`;

                              return (
                                  <TRow key={id}>
                                      <TData>{idx + 1}</TData>
                                      <TData>
                                          <Link to={stateLink}>{name}</Link>
                                      </TData>
                                      <TData>
                                          <Link to={stateCasesLink}>{cases}</Link>
                                      </TData>
                                      <TData>
                                          <Link to={stateDeathsLink}>{deaths}</Link>
                                      </TData>
                                  </TRow>
                              );
                          })}
                </TBody>
            </Table>
        </>
    );
}

export default StatesTable;

import CountCard from '@/components/CountCard';
import { GermanyStates } from '@/interfaces/states.interface';
import Header from '@/components/common/Header';
import StatesCasesHistoryTable from '@/components/StatesCasesHistoryTable';
import StatesDeathsHistoryTable from '@/components/StatesDeathsHistoryTable';
import { useEffect } from 'react';
import { useGermanyStatesStore } from '@/store/useGermanyStates';
import { useParams } from 'react-router-dom';

function GermanyState() {
    const { state } = useParams();
    const stateCode = Object.entries(GermanyStates).find(([key]) => key === state)?.[1] || '';
    const title = state ? `${state}` : 'Germany State';

    const fetchGermanyStateData = useGermanyStatesStore((state) => state.fetchGermanyState);

    const isLoadingState = useGermanyStatesStore((state) => state.isLoadingState);
    const germanyStateCases = useGermanyStatesStore((state) => state.state.cases);
    const germanyStateDeaths = useGermanyStatesStore((state) => state.state.deaths);

    useEffect(() => {
        const fetchStateAllData = async () => {
            await fetchGermanyStateData(stateCode);
        };

        if (stateCode) {
            fetchStateAllData();
        }
    }, [stateCode, fetchGermanyStateData]);

    return (
        <>
            <Header title={title} />
            <div>
                <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 md:grid-cols-2">
                        <CountCard
                            title={`Cases in ${state}`}
                            count={germanyStateCases}
                            isLoading={isLoadingState}
                            className="bg-blue-50 text-blue-700"
                        />
                        <CountCard
                            title={`Deaths in ${state}`}
                            count={germanyStateDeaths}
                            isLoading={isLoadingState}
                            className="bg-red-50 text-red-700"
                        />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-2 gap-5">
                        <StatesCasesHistoryTable stateCode={stateCode} />
                        <StatesDeathsHistoryTable stateCode={stateCode} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default GermanyState;

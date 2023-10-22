import CountCard from '@/components/CountCard';
import { Link } from 'react-router-dom';
import StatesTable from '@/components/StatesTable';
import { useEffect } from 'react';
import { useGermanyStore } from '@/store/useGermany';

function Germany() {
    const fetchGermanyData = useGermanyStore((state) => state.fetchGermany);
    const isLoading = useGermanyStore((state) => state.isLoading);
    const germanyTotalCases = useGermanyStore((state) => state.germany.cases);
    const germanyTotalDeaths = useGermanyStore((state) => state.germany.deaths);

    useEffect(() => {
        fetchGermanyData();
    }, [fetchGermanyData]);

    return (
        <>
            <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 md:grid-cols-2">
                    <Link to="/germany/cases">
                        <CountCard
                            title="Cases"
                            count={germanyTotalCases}
                            isLoading={isLoading}
                            className="bg-blue-50 text-blue-700"
                        />
                    </Link>
                    <Link to="/germany/deaths">
                        <CountCard
                            title="Deaths"
                            count={germanyTotalDeaths}
                            isLoading={isLoading}
                            className="bg-red-50 text-red-700"
                        />
                    </Link>
                </div>

                <StatesTable />
            </div>
        </>
    );
}

export default Germany;

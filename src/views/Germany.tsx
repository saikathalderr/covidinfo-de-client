import CountCard from "@/components/CountCard";
import { useEffect } from "react";
import { useGermanyStore } from "@/store/useGermany";

function Germany() {
  const fetchGermanyData = useGermanyStore((state) => state.fetchGermany);
  const isLoading = useGermanyStore((state) => state.isLoading);
  const germanyTotalCases = useGermanyStore((state) => state.germany.cases);
  const germanyTotalDeaths = useGermanyStore((state) => state.germany.deaths);
  const germanyTotalRecovered = useGermanyStore(
    (state) => state.germany.recovered
  );
  const germanyCasesPerWeek = useGermanyStore(
    (state) => state.germany.casesPerWeek
  );

  useEffect(() => {
    fetchGermanyData();
  }, [fetchGermanyData]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4">
        <CountCard
          title="Cases"
          count={germanyTotalCases}
          isLoading={isLoading}
          className="bg-blue-50/50 text-blue-700"
        />
        <CountCard
          title="Deaths"
          count={germanyTotalDeaths}
          isLoading={isLoading}
          className="bg-red-50/50 text-red-700"
        />
        <CountCard
          title="Recovered"
          count={germanyTotalRecovered}
          isLoading={isLoading}
          className="bg-green-50/50 text-green-700"
        />
        <CountCard
          title="Cases Per Week"
          count={germanyCasesPerWeek}
          isLoading={isLoading}
          className="bg-amber-50/50 text-amber-700"
        />
      </div>
    </>
  );
}

export default Germany;

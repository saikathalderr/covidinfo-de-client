import { GermanyState } from '@/interfaces/states.interface';
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
            <table className="table text-xs font-mono w-full text-left">
                <thead>
                    <tr className="bg-slate-100 text-slate-500 uppercase">
                        <th className="px-2 py-1 border">State</th>
                        <th className="px-2 py-1 border">Cases</th>
                        <th className="px-2 py-1 border">Deaths</th>
                    </tr>
                </thead>

                <tbody>
                    {isLoading
                        ? [1, 2, 3, 4, 5].map(() => {
                              return (
                                  <>
                                      <tr>
                                          <td className="h-8 p-2 border">
                                              <div className="bg-slate-50 border animate-pulse w-full h-full"></div>
                                          </td>
                                          <td className="h-8 p-2 border">
                                              <div className="bg-slate-50 border animate-pulse w-full h-full"></div>
                                          </td>
                                          <td className="h-8 p-2 border">
                                              <div className="bg-slate-50 border animate-pulse w-full h-full"></div>
                                          </td>
                                      </tr>
                                  </>
                              );
                          })
                        : germanyAllStates.map((germanyState) => {
                              const { id, name, cases, deaths } = germanyState;
                              return (
                                  <tr key={id}>
                                      <td className="px-2 py-1 border">{name}</td>
                                      <td className="px-2 py-1 border">{cases}</td>
                                      <td className="px-2 py-1 border">{deaths}</td>
                                  </tr>
                              );
                          })}
                </tbody>
            </table>
        </>
    );
}

export default StatesTable;

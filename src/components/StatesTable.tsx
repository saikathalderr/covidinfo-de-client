import { GermanyState } from '@/interfaces/states.interface';
import { Link } from 'react-router-dom';
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
                        <th className="px-2 py-1 border">#</th>
                        <th className="px-2 py-1 border">State</th>
                        <th className="px-2 py-1 border">Cases</th>
                        <th className="px-2 py-1 border">Deaths</th>
                    </tr>
                </thead>

                <tbody>
                    {isLoading
                        ? [...Array(16).keys()].map(() => {
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
                                          <td className="h-8 p-2 border">
                                              <div className="bg-slate-50 border animate-pulse w-full h-full"></div>
                                          </td>
                                      </tr>
                                  </>
                              );
                          })
                        : germanyAllStates.map((germanyState, idx) => {
                              const { id, name, cases, deaths } = germanyState;
                              const stateLink = `/germany/states/${name}`;
                              const stateCasesLink = stateLink + `/cases`;
                              const stateDeathsLink = stateLink + `/deaths`;

                              return (
                                  <tr key={id}>
                                      <td className="px-2 py-1 border">{idx + 1}</td>
                                      <td className="px-2 py-1 border">
                                          <Link to={stateLink}>{name}</Link>
                                      </td>
                                      <td className="px-2 py-1 border">
                                          <Link to={stateCasesLink}>{cases}</Link>
                                      </td>
                                      <td className="px-2 py-1 border">
                                          <Link to={stateDeathsLink}>{deaths}</Link>
                                      </td>
                                  </tr>
                              );
                          })}
                </tbody>
            </table>
        </>
    );
}

export default StatesTable;

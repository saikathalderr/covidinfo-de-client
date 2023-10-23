import { CasesOrder, CasesSort } from '@/interfaces/cases.interface';
import { DeathsOrder, DeathsSort } from '@/interfaces/deaths.interface';
import {
    FetchGermanyAllStatesResponse,
    FetchGermanyStateCasesHistoryResponse,
    FetchGermanyStateDeathsHistoryResponse,
    FetchGermanyStateResponse,
    GermanyAllStates,
    GermanyState,
    GermanyStateCasesHistory,
    GermanyStateDeathsHistory,
} from '@/interfaces/states.interface';

import axios from 'axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GermanyStatesState {
    states: GermanyAllStates;
    state: GermanyState;
    stateCasesHistory: {
        [state: string]: GermanyStateCasesHistory;
    };
    stateDeathsHistory: {
        [state: string]: GermanyStateDeathsHistory;
    };
    isLoadingAllStates: boolean;
    isLoadingState: boolean;
    isLoadingStateCasesHistory: boolean;
    isLoadingStateDeathsHistory: boolean;
    fetchGermanyAllStates: () => Promise<void>;
    fetchGermanyState: (stateCode: string) => Promise<void>;
    fetchGermanyStateCasesHistory: ({
        stateCode,
        sort,
        order,
    }: {
        stateCode: string;
        sort?: CasesSort;
        order?: CasesOrder;
    }) => Promise<void>;
    fetchGermanyStateDeathsHistory: ({
        stateCode,
        sort,
        order,
    }: {
        stateCode: string;
        sort?: DeathsSort;
        order?: DeathsOrder;
    }) => Promise<void>;
}

const __apiUrl = import.meta.env.VITE_API_ENDPOINT as string;

export const useGermanyStatesStore = create<GermanyStatesState>()(
    devtools((set) => ({
        states: {} as GermanyAllStates,
        state: {} as GermanyState,
        stateCasesHistory: {} as {
            [state: string]: GermanyStateCasesHistory;
        },
        stateDeathsHistory: {} as {
            [state: string]: GermanyStateDeathsHistory;
        },
        isLoadingAllStates: false,
        isLoadingState: false,
        isLoadingStateCasesHistory: false,
        isLoadingStateDeathsHistory: false,
        fetchGermanyAllStates: async () => {
            set({ isLoadingAllStates: true });
            const { data: fetchGermanyAllStates } = await axios.get<FetchGermanyAllStatesResponse>(
                `${__apiUrl}/germany/states`,
            );
            const states = fetchGermanyAllStates.data;
            set({ states });
            set({ isLoadingAllStates: false });
        },
        fetchGermanyState: async (stateCode) => {
            set({ isLoadingState: true });
            const { data: fetchGermanyState } = await axios.get<FetchGermanyStateResponse>(
                `${__apiUrl}/germany/states/?state=${stateCode}`,
            );
            const state = fetchGermanyState.data;
            set({ state });
            set({ isLoadingState: false });
        },
        fetchGermanyStateCasesHistory: async ({ stateCode, sort, order }) => {
            set({ isLoadingStateCasesHistory: true });
            const { data: fetchGermanyStateCases } =
                await axios.get<FetchGermanyStateCasesHistoryResponse>(
                    `${__apiUrl}/germany/states/cases?state=${stateCode}&sort=${
                        sort || CasesSort.CASES
                    }&order=${order || CasesOrder.DESC}`,
                );
            const stateCasesHistory = fetchGermanyStateCases.data;
            set({ stateCasesHistory });
            set({ isLoadingStateCasesHistory: false });
        },
        fetchGermanyStateDeathsHistory: async ({ stateCode, sort, order }) => {
            set({ isLoadingStateDeathsHistory: true });
            const { data: fetchGermanyStateDeaths } =
                await axios.get<FetchGermanyStateDeathsHistoryResponse>(
                    `${__apiUrl}/germany/states/deaths?state=${stateCode}&sort=${
                        sort || DeathsSort.DEATHS
                    }&order=${order || DeathsOrder.DESC}`,
                );
            const stateDeathsHistory = fetchGermanyStateDeaths.data;
            set({ stateDeathsHistory });
            set({ isLoadingStateDeathsHistory: false });
        },
    })),
);

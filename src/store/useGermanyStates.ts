import { FetchGermanyAllStatesResponse, GermanyAllStates } from '@/interfaces/states.interface';

import axios from 'axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GermanyStatesState {
    states: GermanyAllStates;
    fetchGermanyAllStates: () => void;
    isLoading: boolean;
}

const _apiEndpoint = import.meta.env.VITE_API_ENDPOINT as string;

export const useGermanyStatesStore = create<GermanyStatesState>()(
    devtools((set) => ({
        states: {} as GermanyAllStates,
        isLoading: false,
        fetchGermanyAllStates: async () => {
            set({ isLoading: true });
            const { data: fetchGermanyAllStates } = await axios.get<FetchGermanyAllStatesResponse>(
                `${_apiEndpoint}/germany/states`,
            );
            const states = fetchGermanyAllStates.data;
            set({ states });
            set({ isLoading: false });
        },
    })),
);

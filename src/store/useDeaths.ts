import { Death, FetchDeathsResponse } from '@/interfaces/deaths.interface';

import axios from 'axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface DeathsState {
    deaths: Death[];
    isLoading: boolean;
    fetchDeaths: () => void;
}

const __apiUrl = import.meta.env.VITE_API_ENDPOINT as string;

export const useDeathsStore = create<DeathsState>()(
    devtools((set) => ({
        deaths: [] as Death[],
        isLoading: false,
        fetchDeaths: async () => {
            set({ isLoading: true });
            const { data: fetchDeathsResp } = await axios.get<FetchDeathsResponse>(
                `${__apiUrl}/germany/deaths`,
            );
            const deaths = fetchDeathsResp.data;
            set({ deaths });
            set({ isLoading: false });
        },
    })),
);

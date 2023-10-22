import { FetchGermanyResponse, Germany } from '@/interfaces/germany.interface';

import axios from 'axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GermanyState {
    germany: Germany;
    fetchGermany: () => void;
    isLoading: boolean;
}

const _apiEndpoint = import.meta.env.VITE_API_ENDPOINT as string;

export const useGermanyStore = create<GermanyState>()(
    devtools((set) => ({
        germany: {} as Germany,
        isLoading: false,
        fetchGermany: async () => {
            set({ isLoading: true });
            const { data: fetchGermanyResp } = await axios.get<FetchGermanyResponse>(
                `${_apiEndpoint}/germany`,
            );
            const germany = fetchGermanyResp.data;
            set({ germany });
            set({ isLoading: false });
        },
    })),
);

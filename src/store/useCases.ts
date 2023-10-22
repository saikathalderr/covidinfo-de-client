import { Case, FetchCasesResponse } from '@/interfaces/cases.interface';

import axios from 'axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CasesState {
    cases: Case[];
    isLoading: boolean;
    fetchCases: () => void;
}

const __apiUrl = import.meta.env.VITE_API_ENDPOINT as string;

export const useCasesStore = create<CasesState>()(
    devtools((set) => ({
        cases: [] as Case[],
        isLoading: false,
        fetchCases: async () => {
            set({ isLoading: true });
            const { data: fetchCasesResp } = await axios.get<FetchCasesResponse>(
                `${__apiUrl}/germany/cases`,
            );
            const cases = fetchCasesResp.data;
            set({ cases });
            set({ isLoading: false });
        },
    })),
);

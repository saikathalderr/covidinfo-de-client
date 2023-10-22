import TRow from '@/components/common/TRow';

function StatesTableSkeleton() {
    return (
        <>
            <TRow>
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
            </TRow>
        </>
    );
}

export default StatesTableSkeleton;

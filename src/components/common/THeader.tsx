type THeaderProps = {
    children: React.ReactNode;
};

function THeader({ children }: THeaderProps) {
    return (
        <th className="bg-slate-100 text-slate-500 uppercase px-2 py-1 border sticky top-[4rem]">
            <div className="inline-flex justify-center items-center">{children}</div>
        </th>
    );
}

export default THeader;

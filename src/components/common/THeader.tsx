type THeaderProps = {
    children: React.ReactNode;
};

function THeader({ children }: THeaderProps) {
    return <th className="bg-slate-100 text-slate-500 uppercase px-2 py-1 border">{children}</th>;
}

export default THeader;

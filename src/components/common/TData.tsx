type TDataProps = {
    children: React.ReactNode;
};

function TData({ children }: TDataProps) {
    return <td className="px-2 py-1 border">{children}</td>;
}

export default TData;

type TableProps = {
    children: React.ReactNode;
};

function Table({ children }: TableProps) {
    return <table className="table text-xs font-mono w-full text-left">{children}</table>;
}

export default Table;

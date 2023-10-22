type TRowProps = {
    children: React.ReactNode;
};

function TRow({ children }: TRowProps) {
    return <tr>{children}</tr>;
}

export default TRow;

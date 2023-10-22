type TBodyProps = {
    children: React.ReactNode;
};

function TBody({ children }: TBodyProps) {
    return <tbody>{children}</tbody>;
}

export default TBody;

type THeadProps = {
    children: React.ReactNode;
};
function THead({ children }: THeadProps) {
    return <thead>{children}</thead>;
}

export default THead;

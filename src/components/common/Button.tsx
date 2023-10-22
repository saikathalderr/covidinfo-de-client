type ButtonType = {
    children: React.ReactNode;
    onClick?: () => void;
};

function Button({ children, onClick }: ButtonType) {
    return (
        <button
            onClick={onClick}
            className="shadow px-2 py-1 rounded-md flex justify-center items-center gap-2 hover:shadow-md"
        >
            {/* <Icon icon="iconamoon:home-duotone" />
            <span className="font-mono text-xs">Home</span> */}
            {children}
        </button>
    );
}

export default Button;

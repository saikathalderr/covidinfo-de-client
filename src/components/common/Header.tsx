import Button from './Button';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

type HeaderProps = {
    title: string;
};

function Header({ title }: HeaderProps) {
    return (
        <div className="py-5 border-b flex gap-2 sticky top-0 bg-white">
            <Link to={'/'}>
                <Button>
                    <Icon icon="iconamoon:home-duotone" />
                    <span className="font-mono text-xs">Home</span>
                </Button>
            </Link>
            {' - '}
            <span className="font-bold">{title}</span>
        </div>
    );
}

export default Header;

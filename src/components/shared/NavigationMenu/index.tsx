'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import './styles.scss';

const routes = [
    {
        name: 'Main',
        path: '/',
    },
    {
        name: 'Orders',
        path: '/orders',
    },
    {
        name: 'Products',
        path: '/products',
    },
];

const NavigationMenu = () => {
    const pathname = usePathname();

    return (
        <nav className='sidebar col-3 col-sm-2 col-lg-1'>
            <ul className='sidebar__menu'>
                {routes.map((route) => (
                    <li
                        key={route.name}
                        className={classNames('sidebar__menu-item', {
                            'sidebar__menu-item--active': pathname === route.path,
                        })}
                    >
                        <Link href={route.path}>{route.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavigationMenu;

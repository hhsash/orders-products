'use client';

import { Link } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import './styles.scss';

type NavigationMenuProps = {
    locale: string;
};

const NavigationMenu = ({ locale }: NavigationMenuProps) => {
    const pathname = usePathname();
    const t = useTranslations('NavMenu');

    const routes = [
        {
            name: t('main'),
            path: `/`,
        },
        {
            name: t('orders'),
            path: `/orders`,
        },
        {
            name: t('products'),
            path: `/products`,
        },
    ];

    return (
        <nav className='sidebar col-3 col-sm-2 col-lg-1'>
            <ul className='sidebar__menu'>
                {routes.map((route) => {
                    const isActive =
                        route.path === '/' // Для роута "/"
                            ? pathname === `/${locale}` || pathname === `/${locale}/`
                            : pathname === `/${locale}${route.path}`;
                    return (
                        <li
                            key={route.name}
                            className={classNames('sidebar__menu-item', {
                                'sidebar__menu-item--active': isActive,
                            })}
                        >
                            <Link href={route.path}>{route.name}</Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default NavigationMenu;

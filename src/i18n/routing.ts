import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { SUPPORTED_LOCALES } from '@/types/locales';

export const routing = defineRouting({
    locales: SUPPORTED_LOCALES,

    defaultLocale: 'ru',
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

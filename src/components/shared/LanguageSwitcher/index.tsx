'use client';

import React from 'react';
import { useRouter, usePathname } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { SUPPORTED_LOCALES } from '@/types/locales';

const LanguageSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const currentLocale = useLocale();

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = event.target.value;
        router.replace(
            // @ts-ignore
            { pathname, params },
            { locale: selectedLanguage },
        );
    };

    return (
        <select
            className='form-select'
            onChange={handleLanguageChange}
            defaultValue={currentLocale}
            style={{ width: 'fit-content' }}
        >
            {SUPPORTED_LOCALES.map((lang) => (
                <option key={lang} value={lang}>
                    {lang}
                </option>
            ))}
        </select>
    );
};

export default LanguageSwitcher;

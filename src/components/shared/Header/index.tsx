'use client';

import React, { useLayoutEffect, useState } from 'react';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import './styles.scss';

export default function TopMenu() {
    const [date, setDate] = useState<string | null>(null);

    useLayoutEffect(() => {
        const interval = setInterval(() => setDate(new Date().toLocaleString()));
        return () => clearInterval(interval);
    }, []);

    return (
        <header className='header d-flex justify-content-between align-items-center'>
            <span>Orders & Products</span>
            <div className='d-flex align-items-center'>
                <span className='mx-2'>{date || 'Loading...'}</span>
                <LanguageSwitcher />
            </div>
        </header>
    );
}

'use client';

import React, { useLayoutEffect, useState } from 'react';
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
            <span>{date || 'Loading...'}</span>
        </header>
    );
}

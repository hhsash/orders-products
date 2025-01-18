import React from 'react';
import { useTranslations } from 'next-intl';

const Loading = () => {
    const t = useTranslations('Shared');

    return (
        <div
            className='d-flex justify-content-center align-items-center'
            style={{ height: '100vh' }}
        >
            <div className='spinner-border text-primary' role='status' />
            <span className='ms-3'>{t('loading')}</span>
        </div>
    );
};

export default Loading;

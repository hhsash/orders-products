import React from 'react';
import { useTranslations } from 'next-intl';

type ErrorMessageProps = {
    error: string;
    onRetry: () => void;
};

const ErrorMessage = ({ error, onRetry }: ErrorMessageProps) => {
    const t = useTranslations('Shared');

    return (
        <div
            className='d-flex justify-content-center align-items-center'
            style={{ height: '100vh' }}
        >
            <div className='alert alert-danger w-50' role='alert'>
                <h4 className='alert-heading'>{t('error')}</h4>
                <p>{error}</p>
                <button className='btn btn-primary' onClick={onRetry}>
                    {t('tryAgain')}
                </button>
            </div>
        </div>
    );
};

export default ErrorMessage;

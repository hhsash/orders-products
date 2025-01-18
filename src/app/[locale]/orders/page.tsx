import React from 'react';
import { getTranslations } from 'next-intl/server';
import Orders from '@/components/Orders';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('OrdersPage');

    return {
        title: t('title'),
        description: t('description'),
    };
}

const OrdersPage = async () => {
    const t = await getTranslations('OrdersPage');

    return (
        <>
            <h2>{t('title')}</h2>
            <Orders />
        </>
    );
};

export default OrdersPage;

import React from 'react';
import { getTranslations } from 'next-intl/server';
import Products from '@/components/Products';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('ProductsPage');

    return {
        title: t('title'),
        description: t('description'),
    };
}

const ProductsPage = async () => {
    const t = await getTranslations('ProductsPage');

    return (
        <>
            <h2>{t('title')}</h2>
            <Products />
        </>
    );
};

export default ProductsPage;

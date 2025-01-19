'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import type { Product } from '@/types/Product';

type ProductCardProps = {
    product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
    const productTypesTranslate = useTranslations('ProductTypes');
    const productCardTranslate = useTranslations('ProductCard');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className='card mb-3 shadow-sm'
        >
            {/* Заголовок карточки */}
            <div className='card-header bg-primary text-white'>
                <h5 className='mb-0'>{product.title}</h5>
            </div>
            {/* Тело карточки */}
            <div className='card-body'>
                <div className='row'>
                    {/* Тип продукта */}
                    <div className='col-6'>
                        <p className='mb-1 text-muted'>{productCardTranslate('type')}</p>
                        <p className='mb-0'>{productTypesTranslate(product.type.toLowerCase())}</p>
                    </div>
                    {/* Гарантийные даты */}
                    <div className='col-6'>
                        <p className='mb-1 text-muted'>{productCardTranslate('guarantee')}</p>
                        <p className='mb-0'>{product.guarantee.start}</p>
                    </div>
                </div>
                <div className='row mt-3'>
                    {/* Цена */}
                    <div className='col-12'>
                        <p className='mb-1 text-muted'>{productCardTranslate('price')}</p>
                        <p className='fw-bold text-success'>{product?.priceToString?.inUah()}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;

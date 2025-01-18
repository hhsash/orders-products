'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, filterProducts } from '@/redux/slices/productsSlice';
import { AppDispatch } from '@/redux/store';
import { selectProductsState } from '@/redux/slices/productsSlice';
import { useTranslations } from 'next-intl';
import ProductCard from '@/components/ProductCard';
import Loading from '@/components/shared/Loading';
import ErrorMessage from '@/components/shared/ErrorMessage';

const Products = () => {
    const dispatch = useDispatch<AppDispatch>();
    const t = useTranslations('ProductTypes');

    const { filteredData, data, isLoading, error } = useSelector(selectProductsState);

    useEffect(() => {
        if (!data) {
            dispatch(fetchProducts());
        }
    }, [dispatch, data]);

    const types = ['Monitors', 'Keyboards', 'Headphones', 'Speakers'];

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage error={error} onRetry={() => dispatch(fetchProducts())} />;
    }

    const onSelectHandle = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(filterProducts(e.target.value));
    };

    return (
        <>
            {filteredData && (
                <div className='mb-3 col-3'>
                    <select
                        className='form-select'
                        id='exampleSelect'
                        onChange={onSelectHandle}
                        defaultValue='All'
                    >
                        <option value='All'>{t('all')}</option>
                        {types.map((type) => (
                            <option key={type} value={type}>
                                {t(type.toLowerCase())}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <ul className='card-list'>
                {filteredData?.map((product) => (
                    <li key={product.id}>
                        <ProductCard product={product} />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Products;

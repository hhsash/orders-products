'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, filterProducts } from '@/redux/slices/productsSlice';
import { AppDispatch } from '@/redux/store';
import { selectProductsState } from '@/redux/slices/productsSlice';
import ProductCard from '@/components/ProductCard';

const Products = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { filteredData, data, isLoading, error } = useSelector(selectProductsState);

    useEffect(() => {
        if (!data) {
            dispatch(fetchProducts());
        }
    }, [dispatch, data]);

    if (isLoading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
                <button onClick={() => dispatch(fetchProducts())}>Retry</button>
            </div>
        );
    }
    const onSelectHandle = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(filterProducts(e.target.value));
    };

    return (
        <div>
            <select className='mb-3' onChange={onSelectHandle} defaultValue='All'>
                <option value='All'>All</option>
                <option value='Monitors'>Monitors</option>
                <option value='Keyboards'>Keyboards</option>
            </select>
            <ul className='card-list'>
                {filteredData?.map((product) => (
                    <li key={product.id}>
                        <ProductCard product={product} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;

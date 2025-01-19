'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchOrders, selectFormattedOrders } from '@/redux/slices/ordersSlice';
import { useTranslations } from 'next-intl';
import OrderCard from '@/components/OrderCard';
import Loading from '@/components/shared/Loading';
import ErrorMessage from '@/components/shared/ErrorMessage';

const Orders = () => {
    const dispatch = useDispatch<AppDispatch>();
    const t = useTranslations('OrdersPage');

    const { data, isLoading, error } = useSelector(selectFormattedOrders);

    useEffect(() => {
        if (!data) {
            dispatch(fetchOrders());
        }
    }, [dispatch, data]);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage error={error} onRetry={() => dispatch(fetchOrders())} />;
    }

    return data?.length === 0 ? (
        <p>{t('emptyList')}</p>
    ) : (
        <ul className='card-list'>
            {data?.map((order) => (
                <li key={order.id}>
                    <OrderCard order={order} />
                </li>
            ))}
        </ul>
    );
};

export default Orders;

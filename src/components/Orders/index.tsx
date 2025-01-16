'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchOrders, selectFormattedOrders } from '@/redux/slices/ordersSlice';
import OrderCard from '@/components/OrderCard';

const Orders = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { data, isLoading, error } = useSelector(selectFormattedOrders);

    useEffect(() => {
        if (!data) {
            dispatch(fetchOrders());
        }
    }, [dispatch, data]);

    if (isLoading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
                <button onClick={fetchOrders}>Retry</button>
            </div>
        );
    }

    return (
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

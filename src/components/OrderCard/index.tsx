'use client';

import React, { useState, Suspense, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslations } from 'next-intl';
import { removeOrder } from '@/redux/slices/ordersSlice';
import type { Order } from '@/types/Order';
import Loading from '@/components/shared/Loading';

const Modal = lazy(() => import('@/components/shared/Modal'));
const ProductCard = lazy(() => import('@/components/ProductCard'));

type OrderCardProps = {
    order: Order;
};

const OrderCard = ({ order }: OrderCardProps) => {
    const cardTranslate = useTranslations('OrderCard');
    const sharedTranslate = useTranslations('Shared');

    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowDetails, setIsShowDetails] = useState(false);

    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(removeOrder(order.id));
    };

    return (
        <>
            <div className='item-card' onClick={() => setIsShowDetails((prev) => !prev)}>
                <span className='item-card__column item-card__title'>{order.title}</span>
                <div className='item-card__column item-card__guarantee-dates'>
                    <span className='d-block mb-2'>
                        {order.formattedDates.localeDateString(order.date)}
                    </span>
                    <span>{order.formattedDates.localString(order.date)}</span>
                </div>
                <div className='item-card__column item-card__currencies'>
                    <span className='d-block mb-2'>{order.totalPrice.inUsd()}</span>
                    <span>{order.totalPrice.inUah()}</span>
                </div>
                <span className='item-card__column item-card__count'>
                    {cardTranslate('productsCount')} {order.productCount}
                </span>
                <button
                    className='btn btn-danger'
                    style={{ width: 'fit-content', margin: '0 auto' }}
                    type='button'
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsShowModal(true);
                    }}
                >
                    {sharedTranslate('delete')}
                </button>
            </div>
            {isShowDetails && (
                <Suspense fallback={<Loading />}>
                    <div className='p-3 card'>
                        <button
                            type='button'
                            onClick={() => setIsShowDetails(false)}
                            className='btn-close'
                            aria-label='Close'
                        />
                        <span className='mb-3'>{cardTranslate('products')}</span>
                        <ul>
                            {order.products.map((product) => (
                                <li key={product.id}>
                                    <ProductCard product={product} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </Suspense>
            )}
            {isShowModal && (
                <Modal
                    onClose={() => setIsShowModal(false)}
                    onSubmit={() => {
                        handleRemove();
                        setIsShowModal(false);
                    }}
                    title={cardTranslate('deleteModalTitle')}
                />
            )}
        </>
    );
};

export default OrderCard;

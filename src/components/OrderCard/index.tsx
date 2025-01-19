'use client';

import React, { useState, Suspense, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslations, useLocale } from 'next-intl';
import { removeOrder } from '@/redux/slices/ordersSlice';
import { motion, AnimatePresence } from 'framer-motion';
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
    const locale = useLocale();

    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowDetails, setIsShowDetails] = useState(false);

    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(removeOrder(order.id));
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className='card mb-3'
                style={{ cursor: 'pointer' }}
                onClick={() => setIsShowDetails((prev) => !prev)}
            >
                <div className='card-body'>
                    <h5 className='card-title'>{order.title}</h5>
                    <p className='card-text'>
                        <strong>{cardTranslate('productsCount')}</strong>: {order.productCount}
                    </p>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <strong>{cardTranslate('date')}</strong>
                            <div>{order.formattedDates.localeDateString(order.date, locale)}</div>
                            <div>{order.formattedDates.localString(order.date)}</div>
                        </div>
                        <div>
                            <strong>{cardTranslate('totalPrice')}</strong>
                            <div>{order.totalPrice.inUsd()}</div>
                            <div>{order.totalPrice.inUah()}</div>
                        </div>
                    </div>
                    <button
                        className='btn btn-danger btn-sm mt-3'
                        type='button'
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsShowModal(true);
                        }}
                    >
                        {sharedTranslate('delete')}
                    </button>
                </div>
            </motion.div>

            <AnimatePresence>
                {isShowDetails && (
                    <Suspense fallback={<Loading />}>
                        <motion.div
                            className='card p-3 mb-3'
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <button
                                type='button'
                                onClick={() => setIsShowDetails(false)}
                                className='btn-close'
                                aria-label='Close'
                            />
                            <h5 className='mb-3'>{cardTranslate('products')}</h5>
                            <ul className='list-unstyled'>
                                {order.products.map((product) => (
                                    <li key={product.id} className='mb-2'>
                                        <ProductCard product={product} />
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </Suspense>
                )}
            </AnimatePresence>

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

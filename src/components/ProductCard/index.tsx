import React from 'react';
import type { Product } from '@/types/Product';

type ProductCardProps = {
    product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className='item-card'>
            <span className='item-card__column item-card__title'>{product.title}</span>
            <span className='item-card__column item-card__type'>{product.type}</span>
            <div className='item-card__column item-card__guarantee-dates'>
                {product.guarantee.start}
            </div>
            <div className='item-card__column item-card__currencies'>
                {product?.priceToString?.inUah()}
            </div>
        </div>
    );
};

export default ProductCard;

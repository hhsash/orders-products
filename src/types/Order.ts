import type { Product } from './Product';

export type Order = {
    id: number;
    date: string;
    title: string;
    description: string;
    totalPrice: {
        inUsd: () => string;
        inUah: () => string;
    };
    formattedDates: {
        localString: (arg: string) => string;
        localeDateString: (arg: string) => string;
    };
    productCount: number;
    readonly products: Product[];
};

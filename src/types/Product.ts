export type Product = {
    id: number;
    serialNumber: number;
    isNew: number;
    title: string;
    type: string;
    specification: string;
    guarantee: {
        start: string;
        end: string;
    };
    price: [
        { value: number; symbol: string; isDefault: number },
        { value: number; symbol: string; isDefault: number },
    ];
    date: string;
    priceToString: {
        inUsd: () => string;
        inUah: () => string;
    };
};

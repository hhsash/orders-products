export const getPriceString = (
    prices: { symbol: string; value: number }[] | undefined,
    currency: 'USD' | 'UAH',
): string => {
    const price = prices?.find((item) => item.symbol === currency)?.value || 0;
    return `${price} ${currency}`;
};

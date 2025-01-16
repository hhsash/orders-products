import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import axios from 'axios';
import { Order } from '@/types/Order';

interface OrdersState {
    data: Order[] | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: OrdersState = {
    data: null,
    isLoading: false,
    error: null,
};

export const fetchOrders = createAsyncThunk<Order[], void, { rejectValue: string }>(
    'orders/fetchOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                'https://6782c173c51d092c3dd0afd0.mockapi.io/api/data/orders',
            );
            return response.data;
        } catch {
            return rejectWithValue('Failed to fetch orders');
        }
    },
);

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        removeOrder(state, action: PayloadAction<number>) {
            if (state.data) {
                state.data = state.data.filter((order) => order.id !== action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const selectOrdersState = (state: RootState) => ({
    isLoading: state.orders.isLoading,
    error: state.orders.error,
    data: state.orders.data,
});

export const selectFormattedOrders = (state: RootState) => {
    const { data, isLoading, error } = state.orders;
    const formattedData = data?.map((order) => ({
        ...order,
        formattedDates: {
            localeDateString: (date: string) => {
                const options: Intl.DateTimeFormatOptions = {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                };
                return new Date(date).toLocaleDateString('ru-RU', options);
            },
            localString: (date: string) => new Date(date).toLocaleString(),
        },
        totalPrice: {
            inUsd: () => {
                const total = order.products?.reduce((sum, product) => {
                    const priceUSD = product?.price?.find((item) => item?.symbol === 'USD');
                    return sum + (priceUSD?.value || 0);
                }, 0);
                return `${total} $`;
            },
            inUah: () => {
                const total = order.products?.reduce((sum, product) => {
                    const priceUAH = product?.price?.find((item) => item?.symbol === 'UAH');
                    return sum + (priceUAH?.value || 0);
                }, 0);
                return `${total} UAH`;
            },
        },
        productCount: order.products.length,
    }));

    return { isLoading, error, data: formattedData };
};

export const { removeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;

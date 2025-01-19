import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { getPriceString } from '@/utils/priceUtils';
import axios from 'axios';
import type { Product } from '@/types/Product';

interface ProductsState {
    data: Product[] | null;
    filteredData: Product[] | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    data: null,
    filteredData: null,
    isLoading: false,
    error: null,
};

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                'https://6782c173c51d092c3dd0afd0.mockapi.io/api/data/products',
            );
            return data;
        } catch {
            return rejectWithValue('Failed to fetch products');
        }
    },
);

export const selectProductsState = (state: RootState) => ({
    isLoading: state.products.isLoading,
    error: state.products.error,
    data: state.products.data,
    filteredData: state.products.filteredData?.map((product) => ({
        ...product,
        priceToString: {
            inUsd: () => getPriceString(product.price, 'USD'),
            inUah: () => getPriceString(product.price, 'UAH'),
        },
    })),
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        filterProducts: (state, action: PayloadAction<string>) => {
            state.filteredData =
                action.payload === 'All'
                    ? state.data
                    : state.data?.filter((item) => item.type === action.payload) || null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.filteredData = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Unknown error';
            });
    },
});

export const { filterProducts } = productsSlice.actions;

export default productsSlice.reducer;

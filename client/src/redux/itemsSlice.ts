import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";

interface Item {
  id: string;
  title: string;
  price: {
    amount: number;
    currency: string;
  };
  picture: string;
  free_shipping: boolean;
}

interface ItemsState {
  items: Item[];
  loading: boolean;
}

const initialState: ItemsState = {
  items: [],
  loading: false,
};

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (query: string) => {
    const response = await axios.get(
      `http://localhost:3000/api/items?q=${query}`
    );
    // console.log("redux result", response.data.items);
    return response.data.items as Item[];
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    updateItemsList: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { updateItemsList } = itemsSlice.actions;
export const selectItems = (state: RootState) => state.items.items;
export const selectLoading = (state: RootState) => state.items.loading;
export default itemsSlice.reducer;

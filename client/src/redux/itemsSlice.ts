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

interface ItemSelected {
  id: string;
  title: string;
  price: {
    amount: number;
    currency: string;
  };
  picture: string;
  free_shipping: boolean;
  isNew?: boolean;
  salesCount?: number;
  description: string;
}

interface ItemsState {
  items: Item[];
  loading: boolean;
  itemSelected: ItemSelected | null;
  descriptionItemSelected: string | null;
}

const initialState: ItemsState = {
  items: [],
  loading: false,
  itemSelected: null,
  descriptionItemSelected: null,
};

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (query: string) => {
    const response = await axios.get(
      `http://localhost:3000/api/items?q=${query}`
    );
    return response.data.items as Item[];
  }
);

export const fetchItemById = createAsyncThunk(
  "items/fetchItemById",
  async (id: string) => {
    const response = await axios.get(`http://localhost:3000/api/items/${id}`);
    return response.data as ItemSelected;
  }
);

export const fetchItemDescription = createAsyncThunk(
  "items/fetchItemDescription",
  async (id: string) => {
    const response = await axios.get(
      `http://localhost:3000/api/items/${id}/description`
    );
    return response.data.description as string;
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
      })
      .addCase(fetchItemById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchItemById.fulfilled,
        (state, action: PayloadAction<ItemSelected>) => {
          state.itemSelected = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchItemById.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchItemDescription.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchItemDescription.fulfilled,
        (state, action: PayloadAction<string>) => {
          if (state.itemSelected) {
            state.itemSelected.description = action.payload;
          }
          state.descriptionItemSelected = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchItemDescription.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { updateItemsList } = itemsSlice.actions;

export const selectItems = (state: RootState) => state.items.items;
export const selectLoading = (state: RootState) => state.items.loading;
export const selectItemSelected = (state: RootState) =>
  state.items.itemSelected;
export const selectDescriptionItemSelected = (state: RootState) =>
  state.items.descriptionItemSelected;

export default itemsSlice.reducer;

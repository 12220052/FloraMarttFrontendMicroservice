import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, flowerId, quantity }, { rejectWithValue }) => {
    try {
      console.log(userId, flowerId, quantity);
      const response = await axios.post(
        "http://localhost:8765/USERMICROSERVICE/cart/add",
        null, // no request body
        {
          params: { userId, flowerId, quantity },
          // headers: { Authorization: `Bearer ${token}` }, // if needed
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item to cart"
      );
    }
  }
);



export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:8765/USERMICROSERVICE/cart/user/${userId}`
    );
console.log(response.data)
    return response.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, flowerId }, { rejectWithValue }) => {
    try {
      console.log(userId,flowerId)
      const response = await axios.delete(
        `http://localhost:8765/USERMICROSERVICE/cart/remove`,
        {
    params: { userId, flowerId }
  }
      );
      return response.data;
    } catch (error) {
      // Log error for debugging
      console.error("Delete cart item error:", error);

      // Return a custom error message
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete cart item"
      );
    }
  })


export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, flowerId, quantity }, { rejectWithValue }) => {
    try {
      console.log(userId,flowerId,quantity)
      const response = await axios.put(
        "http://localhost:8765/USERMICROSERVICE/cart/update", null,
        {
    params: { userId,flowerId,quantity }
  }
      );
      return response.data;
    } catch (error) {
      // Log error for debugging
      console.error("update cart item error:", error);

      // Return a custom error message
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete cart item"
      );
    }
  }
);


const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
.addCase(fetchCartItems.fulfilled, (state, action) => {
  console.log("Payload:", action.payload);
  state.isLoading = false;
  state.cartItems = action.payload?.[0]?.items || [];
})



      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
           state.cartItems = action.payload[0]?.items || [];
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingCartSlice.reducer;

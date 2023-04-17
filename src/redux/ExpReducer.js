import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const firebaseDB = `https://expensetracker-sharpener-default-rtdb.firebaseio.com/`;

export const fetchExpenses = createAsyncThunk(
  "expenses/fetch",
  async (_, { getState }) => {
    const email = getState().auth.email;
    const response = await axios.get(
      `${firebaseDB}${email.replace(/[.@]/g, "")}.json`
    );
    const data = response.data;
    const loadedExpItems = [];

    for (const key in data) {
      loadedExpItems.push({
        id: key,
        amount: data[key].amount,
        description: data[key].description,
        category: data[key].category,
      });
    }

    return loadedExpItems;
  }
);

export const addExpense = createAsyncThunk(
  "expenses/add",
  async ({ amountSpent, description, category }, { getState }) => {
    const email = getState().auth.email;
    const newExpItem = {
      amount: amountSpent,
      description: description,
      category: category,
    };
    const res = await axios.post(
      `${firebaseDB}${email.replace(/[.@]/g, "")}.json`,
      newExpItem
    );
    // console.log(res)
    const resGet = await axios.get(
      `${firebaseDB}${email.replace(/[.@]/g, "")}/${res.data.name}.json`
    );
    console.log(resGet)
    const loadedExpItem = {
      id: res.data.name,
      amount: resGet.data.amount,
      description: resGet.data.description,
      category: resGet.data.category,
    };

    return loadedExpItem;
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/delete",
  async (id, { getState }) => {
    const email = getState().auth.email;
    await axios.delete(`${firebaseDB}${email.replace(/[.@]/g, "")}/${id}.json`);
    return id;
  }
);

export const editExpense = createAsyncThunk(
  "expenses/edit",
  async ({ id, amountSpent, description, category }, { getState }) => {
    const email = getState().auth.email;
    const updatedExpItem = {
      id: id,
      amount: amountSpent,
      description: description,
      category: category,
    };
    await axios.put(
      `${firebaseDB}${email.replace(/[.@]/g, "")}/${id}.json`,
      updatedExpItem
    );
    return updatedExpItem;
  }
);

export const updateExpense = createAsyncThunk(
  "expenses/update",
  async ({ id, amountSpent, description, category }, { getState }) => {
    const email = getState().auth.email;
    const updatedExpItem = {
      amount: amountSpent,
      description: description,
      category: category,
    };
    await axios.put(
      `${firebaseDB}${email.replace(/[.@]/g, "")}/${id}.json`,
      updatedExpItem
    );
    const loadedExpItem = {
      id: id,
      amount: amountSpent,
      description: description,
      category: category,
    };
    return loadedExpItem;
  }
);

const expenseSlice = createSlice({
  name: "expenses",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload
        );
        state.items.splice(index, 1);
      })
      .addCase(editExpense.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      });
  },
});

export default expenseSlice;

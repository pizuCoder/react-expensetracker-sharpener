import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    // setExpense(state, action){
    //   return produce(state, draftState => {
    //     draftState.items = action.payload;
    //   });
    // }
    setExpense: (state, action) => {
      // console.log('setting expenses', action.payload);
      return {
        ...state,
        items: action.payload
      };
    },
    addExpenseSlice: (state, action) => {
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    },
    updateExpenseSlice: (state, action) => {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    },
    deleteExpenseSlice: (state, action) => {
      return {
        ...state,
        items: state.items.filter((item) =>
          item.id !== action.payload.id
        ),
      };
    },
  }
})

export const { setExpense, addExpenseSlice, updateExpenseSlice, deleteExpenseSlice} = expenseSlice.actions;
export default expenseSlice;

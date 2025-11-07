import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
    name:'favourites',
    initialState:{
        items:[],
    },
    reducers:{
      
        // addFavourite: (state, action) => {
        //     const item = action.payload;
        //     state.items.push(item);
        // },

        // removeFavourite:(state , action)=>{
        //     state.items = state.items.filter((index)=>index!==action.payload)
        // },

     togglefavourites: (state, action) => {
    if (state.items.find(item => item.url === action.payload.url)) {
        state.items = state.items.filter(item => item.url !== action.payload.url);
    } else {
        state.items.push(action.payload);
    }
},


    }

})
export const {togglefavourites, addFavourite} = favouriteSlice.actions
export default favouriteSlice.reducer;
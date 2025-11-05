import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
    name:'favourites',
    initialState:{
        items:[],
    },
    reducers:{
        addFavourite:(state , action) =>{
            state.items.push(action.payload)
        },

        removeFavourite:(state , action)=>{
            state.items = state.items.filter((index)=>index!==action.payload)
        }
    }

})
export const {addFavourite , removeFavourite} = favouriteSlice.actions
export default favouriteSlice.reducer;
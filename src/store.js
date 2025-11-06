import { configureStore } from "@reduxjs/toolkit";
import favouriteReducer from "./features/favourites/favouriteSlice"

const store = configureStore({
    reducer:{

        favourites:favouriteReducer,

    }
})

export default store;
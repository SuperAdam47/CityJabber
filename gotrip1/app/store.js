import { configureStore } from "@reduxjs/toolkit";
import findPlaceSlice from "../features/hero/findPlaceSlice";
import { UserReducer } from "../features/auth/userslice";
import { RecentReducer } from "../features/business/recentReducer";
import { RestaruantReducer } from "../features/business/restaurantReducer";
import { ListReducer } from "../features/business/listReducer";
export const store = configureStore({
  reducer: {
    hero: findPlaceSlice,
    User: UserReducer, // UserReducer is a function that returns a slice of state
    Business: RecentReducer,
    Restaurant: RestaruantReducer,
    List: ListReducer,
  },
});

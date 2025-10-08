import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import findPlaceSlice from "../features/hero/findPlaceSlice";
import { UserSlice } from "../features/auth/userslice";
import { RecentReducer } from "../features/business/recentReducer";
import { RestaruantReducer } from "../features/business/restaurantReducer";
import { ListReducer } from "../features/business/listReducer";
import { SearchSlice } from "../features/business/searchSlice";
import { BusinessInfoSlice } from "../features/business/businessInfoSlice";


const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  Hero: findPlaceSlice,
  User: UserSlice.reducer,
  Business: RecentReducer,
  Restaurant: RestaruantReducer,
  List: ListReducer,
  Search: SearchSlice.reducer,
  BusinessInfo: BusinessInfoSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Add other middleware or options as needed
});

export const persistor = persistStore(store);
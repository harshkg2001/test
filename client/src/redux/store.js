import cartReducer from "./cartReducer";
import txnReducer from "./txnReducer";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import Stripe from "stripe";
const stripe = Stripe('sk_test_51NekqASJQ667AMLhVHnNLEk0RZgYnn3d1MJPLiCBANwKkHjetPYSM6goOxLNtquLuD7cxXYyfLAeQ7HOAXicqvFS00lRyfyaKh');

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedTxnReducer = persistReducer(persistConfig, txnReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    txn: persistedTxnReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

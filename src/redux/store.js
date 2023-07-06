import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import userRecords from "./userRecords";
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
import modal from "./modal";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const combinedReducer = combineReducers({
  user: userReducer,
  userRecords: userRecords,
  modal: modal
});

const rootReducer = (state, action) => {
  if (action.type === "user/reset") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

// const rootReducer = combineReducers({ user: userReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

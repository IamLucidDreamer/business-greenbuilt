import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { applyMiddleware, compose } from "redux";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer,
);

export let store =
  applyMiddleware(thunk)(createStore)(persistedReducer);
export let persistor = persistStore(store);

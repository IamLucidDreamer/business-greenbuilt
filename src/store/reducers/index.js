import { combineReducers } from "redux";

import user from "./user";
import statics from "./statics";

const rootReducer = combineReducers({
  user,
  statics,
});

export default rootReducer;

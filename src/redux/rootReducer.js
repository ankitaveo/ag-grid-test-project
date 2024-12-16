import { combineReducers } from "redux";
import allDataProjectManagement from "./allDataProjectManagement";

const appReducers = combineReducers({
  allDataProjectManagement,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    state = undefined;
  }
  return appReducers(state, action);
};

export default rootReducer;

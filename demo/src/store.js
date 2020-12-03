import Immutable, { Map } from "immutable";
import immutableDevtools from "immutable-devtools";
import {
  Models as PlannerModels,
  reducer as PlannerReducer,
} from "react-planner"; //react-planner
import { createStore } from "redux";

import { State } from "../../src/models";

//define state
let AppState = Map({
  "react-planner": new State(),
});

//define reducer
let reducer = (state, action) => {
  state = state || AppState;
  state = state.update("react-planner", (plannerState) =>
    PlannerReducer(plannerState, action)
  );
  return state;
};

let blackList =
  isProduction === true
    ? []
    : ["UPDATE_MOUSE_COORDS", "UPDATE_ZOOM_SCALE", "UPDATE_2D_CAMERA"];

if (!isProduction) {
  console.info(
    "Environment is in development and these actions will be blacklisted",
    blackList
  );
  console.info("Enable Chrome custom formatter for Immutable pretty print");
  immutableDevtools(Immutable);
}

//init store
const store = createStore(
  reducer,
  null,
  !isProduction && window.devToolsExtension
    ? window.devToolsExtension({
        features: {
          pause: true, // start/pause recording of dispatched actions
          lock: true, // lock/unlock dispatching actions and side effects
          persist: true, // persist states on page reloading
          export: true, // export history of actions in a file
          import: "custom", // import history of actions from a file
          jump: true, // jump back and forth (time travelling)
          skip: true, // skip (cancel) actions
          reorder: true, // drag and drop actions in the history list
          dispatch: true, // dispatch custom actions or action creators
          test: true, // generate tests for the selected actions
        },
        actionsBlacklist: blackList,
        maxAge: 999999,
      })
    : (f) => f
);

export default store;

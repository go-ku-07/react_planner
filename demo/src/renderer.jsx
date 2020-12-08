import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import ContainerDimensions from "react-container-dimensions";
import Immutable, { Map } from "immutable";
import immutableDevtools from "immutable-devtools";
import { createStore } from "redux";
import { Provider } from "react-redux";

import MyCatalog from "./catalog/mycatalog";
import ItemMaker from "./ItemMaker";

import ToolbarScreenshotButton from "./ui/toolbar-screenshot-button";

import {
  Models as PlannerModels,
  reducer as PlannerReducer,
  ReactPlanner,
  Plugins as PlannerPlugins,
} from "react-planner"; //react-planner

//define state
let AppState = Map({
  "react-planner": new PlannerModels.State(),
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

// //init store
// let store = createStore(
//   reducer,
//   null,
//   !isProduction && window.devToolsExtension
//     ? window.devToolsExtension({
//         features: {
//           pause: true, // start/pause recording of dispatched actions
//           lock: true, // lock/unlock dispatching actions and side effects
//           persist: true, // persist states on page reloading
//           export: true, // export history of actions in a file
//           import: "custom", // import history of actions from a file
//           jump: true, // jump back and forth (time travelling)
//           skip: true, // skip (cancel) actions
//           reorder: true, // drag and drop actions in the history list
//           dispatch: true, // dispatch custom actions or action creators
//           test: true, // generate tests for the selected actions
//         },
//         actionsBlacklist: blackList,
//         maxAge: 999999,
//       })
//     : (f) => f
// );

import store from "./store";

let plugins = [
  PlannerPlugins.Keyboard(),
  // PlannerPlugins.Autosave("react-planner_v0"),
  PlannerPlugins.ConsoleDebugger(),
];

let toolbarButtons = [ToolbarScreenshotButton];

const MyContext = React.createContext(store);

const App = () => {
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [position, setPosition] = useState([]);

  let reactPlannerRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setIsTimeOut(true);
    }, 0);
  }, []);

  console.log("store", store.getState());

  return isTimeOut && store ? (
    <Provider context={MyContext} store={store}>
      <button
        onClick={() => {
          // reactPlannerRef.current.openCatalog();
          setPosition(["dbki6Tg_1"]);
        }}
      >
        OPEN cATALOG
      </button>
      <ContainerDimensions>
        {({ width, height }) => (
          <ReactPlanner
            ref={reactPlannerRef}
            store={store}
            catalog={MyCatalog}
            width={width}
            height={height}
            plugins={plugins}
            toolbarButtons={toolbarButtons}
            stateExtractor={(state) => {
              // console.log(state.get("ai"));
              return state.get("react-planner");
            }}
            onAction={(action, itemType, id, position) => {
              console.log(action, itemType, id, position);
              // setPosition({ position });

              // alert("onAction_demo: " + action + "/" + itemType + "/" + id);
            }}
            initialMap={"{\"unit\":\"cm\",\"layers\":{\"layer-1\":{\"id\":\"layer-1\",\"altitude\":0,\"order\":0,\"opacity\":1,\"name\":\"default\",\"visible\":true,\"vertices\":{\"WJBbX_MzZs\":{\"id\":\"WJBbX_MzZs\",\"type\":\"\",\"prototype\":\"vertices\",\"name\":\"Vertex\",\"misc\":{},\"selected\":false,\"properties\":{},\"visible\":true,\"x\":199.32211874163957,\"y\":1900.457078900176,\"lines\":[\"aNwvhyWUSG\",\"wdXhM0jQBU\"],\"areas\":[]},\"3nV8vLbf_Y\":{\"id\":\"3nV8vLbf_Y\",\"type\":\"\",\"prototype\":\"vertices\",\"name\":\"Vertex\",\"misc\":{},\"selected\":false,\"properties\":{},\"visible\":true,\"x\":1799.5878034184043,\"y\":1900.457078900176,\"lines\":[\"aNwvhyWUSG\",\"vs1LFIv-Xf\"],\"areas\":[]},\"DLkE9RHKVj\":{\"id\":\"DLkE9RHKVj\",\"type\":\"\",\"prototype\":\"vertices\",\"name\":\"Vertex\",\"misc\":{},\"selected\":false,\"properties\":{},\"visible\":true,\"x\":1799.5878034184043,\"y\":800.859996684534,\"lines\":[\"vs1LFIv-Xf\",\"DeiVjbEcFI\"],\"areas\":[]},\"suOOL52qim\":{\"id\":\"suOOL52qim\",\"type\":\"\",\"prototype\":\"vertices\",\"name\":\"Vertex\",\"misc\":{},\"selected\":false,\"properties\":{},\"visible\":true,\"x\":199.32211874163957,\"y\":800.859996684534,\"lines\":[\"DeiVjbEcFI\",\"wdXhM0jQBU\"],\"areas\":[]}},\"lines\":{\"aNwvhyWUSG\":{\"id\":\"aNwvhyWUSG\",\"type\":\"wall\",\"prototype\":\"lines\",\"name\":\"Wall\",\"misc\":{},\"selected\":false,\"properties\":{\"height\":{\"length\":300},\"thickness\":{\"length\":20},\"textureA\":\"bricks\",\"textureB\":\"bricks\"},\"visible\":true,\"vertices\":[\"WJBbX_MzZs\",\"3nV8vLbf_Y\"],\"holes\":[]},\"vs1LFIv-Xf\":{\"id\":\"vs1LFIv-Xf\",\"type\":\"wall\",\"prototype\":\"lines\",\"name\":\"Wall\",\"misc\":{},\"selected\":false,\"properties\":{\"height\":{\"length\":300},\"thickness\":{\"length\":20},\"textureA\":\"bricks\",\"textureB\":\"bricks\"},\"visible\":true,\"vertices\":[\"DLkE9RHKVj\",\"3nV8vLbf_Y\"],\"holes\":[]},\"DeiVjbEcFI\":{\"id\":\"DeiVjbEcFI\",\"type\":\"wall\",\"prototype\":\"lines\",\"name\":\"Wall\",\"misc\":{},\"selected\":false,\"properties\":{\"height\":{\"length\":300},\"thickness\":{\"length\":20},\"textureA\":\"bricks\",\"textureB\":\"bricks\"},\"visible\":true,\"vertices\":[\"suOOL52qim\",\"DLkE9RHKVj\"],\"holes\":[]},\"wdXhM0jQBU\":{\"id\":\"wdXhM0jQBU\",\"type\":\"wall\",\"prototype\":\"lines\",\"name\":\"Wall\",\"misc\":{},\"selected\":false,\"properties\":{\"height\":{\"length\":300},\"thickness\":{\"length\":20},\"textureA\":\"bricks\",\"textureB\":\"bricks\"},\"visible\":true,\"vertices\":[\"suOOL52qim\",\"WJBbX_MzZs\"],\"holes\":[]}},\"holes\":{},\"areas\":{\"t41OGcaK6D\":{\"id\":\"t41OGcaK6D\",\"type\":\"area\",\"prototype\":\"areas\",\"name\":\"Area\",\"misc\":{},\"selected\":false,\"properties\":{\"patternColor\":\"#F5F4F4\",\"thickness\":{\"length\":0},\"texture\":\"none\"},\"visible\":true,\"vertices\":[\"WJBbX_MzZs\",\"suOOL52qim\",\"DLkE9RHKVj\",\"3nV8vLbf_Y\"],\"holes\":[]}},\"items\":{\"cxcKVarIA\":{\"id\":\"cxcKVarIA\",\"type\":\"desk\",\"prototype\":\"items\",\"name\":\"Desk\",\"misc\":{},\"selected\":false,\"properties\":{\"widthA\":{\"length\":400,\"unit\":\"cm\"},\"widthB\":{\"length\":400,\"unit\":\"cm\"},\"depth\":{\"length\":90,\"unit\":\"cm\"},\"height\":{\"length\":100,\"unit\":\"cm\"},\"altitude\":{\"length\":0,\"unit\":\"cm\"}},\"visible\":true,\"x\":508.67551659780503,\"y\":1704.1381963258457,\"rotation\":0},\"hwTYxU587\":{\"id\":\"hwTYxU587\",\"type\":\"desk\",\"prototype\":\"items\",\"name\":\"Desk\",\"misc\":{},\"selected\":false,\"properties\":{\"widthA\":{\"length\":400,\"unit\":\"cm\"},\"widthB\":{\"length\":400,\"unit\":\"cm\"},\"depth\":{\"length\":90,\"unit\":\"cm\"},\"height\":{\"length\":100,\"unit\":\"cm\"},\"altitude\":{\"length\":0,\"unit\":\"cm\"}},\"visible\":true,\"x\":511.2158682824907,\"y\":1465.3451379653923,\"rotation\":0},\"gi3bdUS92\":{\"id\":\"gi3bdUS92\",\"type\":\"desk\",\"prototype\":\"items\",\"name\":\"Desk\",\"misc\":{},\"selected\":false,\"properties\":{\"widthA\":{\"length\":400,\"unit\":\"cm\"},\"widthB\":{\"length\":400,\"unit\":\"cm\"},\"depth\":{\"length\":90,\"unit\":\"cm\"},\"height\":{\"length\":100,\"unit\":\"cm\"},\"altitude\":{\"length\":0,\"unit\":\"cm\"}},\"visible\":true,\"x\":508.67551659780503,\"y\":1241.7941897130527,\"rotation\":0},\"L9FQZtYDr\":{\"id\":\"L9FQZtYDr\",\"type\":\"desk\",\"prototype\":\"items\",\"name\":\"Desk\",\"misc\":{},\"selected\":false,\"properties\":{\"widthA\":{\"length\":400,\"unit\":\"cm\"},\"widthB\":{\"length\":400,\"unit\":\"cm\"},\"depth\":{\"length\":90,\"unit\":\"cm\"},\"height\":{\"length\":100,\"unit\":\"cm\"},\"altitude\":{\"length\":0,\"unit\":\"cm\"}},\"visible\":true,\"x\":1159.005547877338,\"y\":1709.218899695217,\"rotation\":0},\"PH6QwQdx8\":{\"id\":\"PH6QwQdx8\",\"type\":\"desk\",\"prototype\":\"items\",\"name\":\"Desk\",\"misc\":{},\"selected\":false,\"properties\":{\"widthA\":{\"length\":400,\"unit\":\"cm\"},\"widthB\":{\"length\":400,\"unit\":\"cm\"},\"depth\":{\"length\":90,\"unit\":\"cm\"},\"height\":{\"length\":100,\"unit\":\"cm\"},\"altitude\":{\"length\":0,\"unit\":\"cm\"}},\"visible\":true,\"x\":1159.005547877338,\"y\":1457.7240829113352,\"rotation\":0},\"ml20UtiKQ\":{\"id\":\"ml20UtiKQ\",\"type\":\"desk\",\"prototype\":\"items\",\"name\":\"Desk\",\"misc\":{},\"selected\":false,\"properties\":{\"widthA\":{\"length\":400,\"unit\":\"cm\"},\"widthB\":{\"length\":400,\"unit\":\"cm\"},\"depth\":{\"length\":90,\"unit\":\"cm\"},\"height\":{\"length\":100,\"unit\":\"cm\"},\"altitude\":{\"length\":0,\"unit\":\"cm\"}},\"visible\":true,\"x\":1166.626602931395,\"y\":1244.3345413977383,\"rotation\":0}},\"selected\":{\"vertices\":[],\"lines\":[],\"holes\":[],\"areas\":[],\"items\":[]}}},\"grids\":{\"h1\":{\"id\":\"h1\",\"type\":\"horizontal-streak\",\"properties\":{\"step\":20,\"colors\":[\"#808080\",\"#ddd\",\"#ddd\",\"#ddd\",\"#ddd\"]}},\"v1\":{\"id\":\"v1\",\"type\":\"vertical-streak\",\"properties\":{\"step\":20,\"colors\":[\"#808080\",\"#ddd\",\"#ddd\",\"#ddd\",\"#ddd\"]}}},\"selectedLayer\":\"layer-1\",\"groups\":{},\"width\":3000,\"height\":2000,\"meta\":{},\"guides\":{\"horizontal\":{},\"vertical\":{},\"circular\":{}}}"}
            activeItems={['cxcKVarIA']}
            availableItems={['cxcKVarIA']}
          />
        )}
      </ContainerDimensions>
    </Provider>
  ) : (
    <div />
  );
};

//render
ReactDOM.render(<App />, document.getElementById("app"));

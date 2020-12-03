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
            initialMap={
              '{"unit":"cm","layers":{"layer-1":{"id":"layer-1","altitude":0,"order":0,"opacity":1,"name":"default","visible":true,"vertices":{"cIzFYg71ci":{"id":"cIzFYg71ci","type":"","prototype":"vertices","name":"Vertex","misc":{},"selected":false,"properties":{},"visible":true,"x":499.08000000000004,"y":1411.2915738463998,"lines":["brm9Y6j1jc","_qOuHz8Ma"],"areas":[]},"F3ktVpbnIO0":{"id":"F3ktVpbnIO0","type":"","prototype":"vertices","name":"Vertex","misc":{},"selected":false,"properties":{},"visible":true,"x":318.89132075471696,"y":1347.1406304501734,"lines":["5MafCqKD1v0","_qOuHz8Ma"],"areas":[]},"usnJra-HF1":{"id":"usnJra-HF1","type":"","prototype":"vertices","name":"Vertex","misc":{},"selected":false,"properties":{},"visible":true,"x":951.054511071556,"y":1557.06,"lines":["tcT-7T76zK","ujKD9J82I"],"areas":[]},"GrXESD9o_S":{"id":"GrXESD9o_S","type":"","prototype":"vertices","name":"Vertex","misc":{},"selected":false,"properties":{},"visible":true,"x":815.2695534906464,"y":1471.2698545618516,"lines":["sqS7YjRV7","tcT-7T76zK","WCp0P66N6s","WCp0P66N6s"],"areas":[]},"ix6eXydDhva":{"id":"ix6eXydDhva","type":"","prototype":"vertices","name":"Vertex","misc":{},"selected":false,"properties":{},"visible":true,"x":675.0400000000001,"y":1382.6715738464,"lines":["brm9Y6j1jc","sqS7YjRV7"],"areas":[]},"ApPZnQipcU":{"id":"ApPZnQipcU","type":"","prototype":"vertices","name":"Vertex","misc":{},"selected":false,"properties":{},"visible":true,"x":604.4345110715559,"y":1821,"lines":["5MafCqKD1v0","ujKD9J82I"],"areas":[]}},"lines":{"sqS7YjRV7":{"id":"sqS7YjRV7","type":"wall","prototype":"lines","name":"Wall","misc":{},"selected":false,"properties":{"height":{"length":300},"thickness":{"length":20},"textureA":"bricks","textureB":"bricks"},"visible":true,"vertices":["ix6eXydDhva","GrXESD9o_S"],"holes":[]},"_qOuHz8Ma":{"id":"_qOuHz8Ma","type":"wall","prototype":"lines","name":"Wall","misc":{},"selected":false,"properties":{"height":{"length":300},"thickness":{"length":20},"textureA":"bricks","textureB":"bricks"},"visible":true,"vertices":["F3ktVpbnIO0","cIzFYg71ci"],"holes":[]},"5MafCqKD1v0":{"id":"5MafCqKD1v0","type":"wall","prototype":"lines","name":"Wall","misc":{},"selected":false,"properties":{"height":{"length":300},"thickness":{"length":20},"textureA":"bricks","textureB":"bricks"},"visible":true,"vertices":["F3ktVpbnIO0","ApPZnQipcU"],"holes":[]},"WCp0P66N6s":{"id":"WCp0P66N6s","type":"wall","prototype":"lines","name":"Wall","misc":{},"selected":false,"properties":{"height":{"length":300},"thickness":{"length":20},"textureA":"bricks","textureB":"bricks"},"visible":true,"vertices":["GrXESD9o_S","GrXESD9o_S"],"holes":[]},"brm9Y6j1jc":{"id":"brm9Y6j1jc","type":"wall","prototype":"lines","name":"Wall","misc":{},"selected":false,"properties":{"height":{"length":300},"thickness":{"length":20},"textureA":"bricks","textureB":"bricks"},"visible":true,"vertices":["cIzFYg71ci","ix6eXydDhva"],"holes":[]},"ujKD9J82I":{"id":"ujKD9J82I","type":"wall","prototype":"lines","name":"Wall","misc":{},"selected":false,"properties":{"height":{"length":300},"thickness":{"length":20},"textureA":"bricks","textureB":"bricks"},"visible":true,"vertices":["ApPZnQipcU","usnJra-HF1"],"holes":[]},"tcT-7T76zK":{"id":"tcT-7T76zK","type":"wall","prototype":"lines","name":"Wall","misc":{},"selected":false,"properties":{"height":{"length":300},"thickness":{"length":20},"textureA":"bricks","textureB":"bricks"},"visible":true,"vertices":["usnJra-HF1","GrXESD9o_S"],"holes":[]}},"holes":{},"areas":{"BiIfo-YsW4":{"id":"BiIfo-YsW4","type":"area","prototype":"areas","name":"Area","misc":{},"selected":false,"properties":{"patternColor":"#F5F4F4","thickness":{"length":0},"texture":"none"},"visible":true,"vertices":["F3ktVpbnIO0","cIzFYg71ci","ix6eXydDhva","GrXESD9o_S","GrXESD9o_S","GrXESD9o_S","usnJra-HF1","ApPZnQipcU"],"holes":[]}},"items":{"dbki6Tg_1":{"id":"dbki6Tg_1","type":"school desk","prototype":"items","name":"School desk","misc":{},"selected":false,"properties":{"altitude":{"length":0,"unit":"cm"}},"visible":true,"x":638,"y":1595,"rotation":0},"-RTV0qJKd":{"id":"-RTV0qJKd","type":"school desk","prototype":"items","name":"School desk","misc":{},"selected":false,"properties":{"altitude":{"length":0,"unit":"cm"}},"visible":true,"x":595,"y":1496,"rotation":0}},"selected":{"vertices":[],"lines":[],"holes":[],"areas":[],"items":[]}}},"grids":{"h1":{"id":"h1","type":"horizontal-streak","properties":{"step":20,"colors":["#808080","#ddd","#ddd","#ddd","#ddd"]}},"v1":{"id":"v1","type":"vertical-streak","properties":{"step":20,"colors":["#808080","#ddd","#ddd","#ddd","#ddd"]}}},"selectedLayer":"layer-1","groups":{},"width":3000,"height":2000,"meta":{},"guides":{"horizontal":{},"vertical":{},"circular":{}}}'
            }
            activeItems={position}
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

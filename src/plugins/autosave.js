const localStorage = window.hasOwnProperty("localStorage")
  ? window.localStorage
  : false;
import { loadProject } from "../actions/project-actions";

const TIMEOUT_DELAY = 500;

let timeout = null;

export default function autosave(autosaveKey, delay) {
  return (store, stateExtractor) => {
    delay = delay || TIMEOUT_DELAY;

    if (!autosaveKey) return;
    if (!localStorage) return;

    //revert
    if (localStorage.getItem(autosaveKey) !== null) {
      let data = localStorage.getItem(autosaveKey);
      let json = JSON.parse(data);
      if (store) {
        store.dispatch(loadProject(json));
      }
    }

    //update
    if (store) {
      store.subscribe(() => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          let state = stateExtractor(store.getState());
          localStorage.setItem(autosaveKey, JSON.stringify(state.scene.toJS()));
          /*let scene = state.sceneHistory.last;
        if (scene) {
          let json = JSON.stringify(scene.toJS());
          localStorage.setItem(autosaveKey, json);
        }*/
        }, delay);
      });
    }
  };
}

import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import connect from "react-redux/lib/connect/connect";

import Translator from "./translator/translator";
import Catalog from "./catalog/catalog";
import actions from "./actions/export";
import { objectsMap } from "./utils/objects-utils";
import {
  ToolbarComponents,
  Content,
  SidebarComponents,
  FooterBarComponents,
} from "./components/export";
import { VERSION } from "./version";
import "./styles/export";
import ReactPlannerService from "./ReactPlannerService";
import { loadProject } from "./actions/project-actions";
import CatalogList from "./components/catalog-view/catalog-list";

const { Toolbar } = ToolbarComponents;
const { Sidebar } = SidebarComponents;
const { FooterBar } = FooterBarComponents;

const toolbarW = 50;
const sidebarW = 300;
const footerBarH = 20;

const wrapperStyle = {
  display: "flex",
  flexFlow: "row nowrap",
};

import { itemsActions, linesActions, holesActions } from "./actions/export";

class ReactPlanner extends Component {
  getChildContext() {
    return {
      ...objectsMap(actions, (actionNamespace) => this.props[actionNamespace]),
      translator: this.props.translator,
      catalog: this.props.catalog,
    };
  }

  componentWillMount() {
    // Autonomous
    // let { store } = this.context;
    let { store } = this.props;

    let { projectActions, catalog, stateExtractor, plugins } = this.props;
    plugins.forEach((plugin) => plugin(store, stateExtractor));
    projectActions.initCatalog(catalog);

    // Autonomous
    let { onAction, initialMap, activeItem } = this.props;
    ReactPlannerService.getInstance().onActionCallBack = onAction;
    // ReactPlannerService.getInstance().activeItem = activeItem;
    if (initialMap) {
      store.dispatch(loadProject(JSON.parse(initialMap)));
    }
  }

  componentWillReceiveProps(nextProps) {
    let { stateExtractor, state, projectActions, catalog } = nextProps;
    let plannerState = stateExtractor(state);
    let catalogReady = plannerState.getIn(["catalog", "ready"]);
    if (!catalogReady) {
      projectActions.initCatalog(catalog);
    }
  }

  openCatalog() {
    this.props.projectActions.openCatalog();
    // this.props.store.dispatch(selectToolDrawingItem("bench"));
  }

  unSelectAll() {
    this.props.projectActions.unselectAll();
  }

  selectCatalogItem(element) {
    if (element) {
      switch (element.prototype) {
        case "lines":
          this.props.store.dispatch(
            linesActions.selectToolDrawingLine(element.name)
          );
          break;
        case "items":
          this.props.store.dispatch(
            itemsActions.selectToolDrawingItem(element.name)
          );
          break;
        case "holes":
          this.props.store.dispatch(
            holesActions.selectToolDrawingHole(element.name)
          );
          break;
      }
    }
  }

  render() {
    let { width, height, state, stateExtractor, ...props } = this.props;

    let contentW = width - toolbarW - sidebarW;
    let toolbarH = height - footerBarH;
    let contentH = height - footerBarH;
    let sidebarH = height - footerBarH;

    let extractedState = stateExtractor(state);

    return (
      <div style={{ ...wrapperStyle, height }}>
        {/* <Toolbar
          width={toolbarW}
          height={toolbarH}
          state={extractedState}
          {...props}
        /> */}
        {/* <CatalogList
          state={state}
          width={300}
          height={height}
          state={extractedState}
        /> */}
        <Content
          width={width}
          height={height}
          state={extractedState}
          {...props}
          onWheel={(event) => event.preventDefault()}
          // itemMaker={this.props.itemMaker}
        />
        {/* <Sidebar
          width={sidebarW}
          height={sidebarH}
          state={extractedState}
          {...props}
        /> */}
        {/* <FooterBar
          width={width}
          height={footerBarH}
          state={extractedState}
          {...props}
        /> */}
      </div>
    );
  }
}

ReactPlanner.propTypes = {
  translator: PropTypes.instanceOf(Translator),
  catalog: PropTypes.instanceOf(Catalog),
  allowProjectFileSupport: PropTypes.bool,
  plugins: PropTypes.arrayOf(PropTypes.func),
  autosaveKey: PropTypes.string,
  autosaveDelay: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  stateExtractor: PropTypes.func.isRequired,
  toolbarButtons: PropTypes.array,
  sidebarComponents: PropTypes.array,
  footerbarComponents: PropTypes.array,
  customContents: PropTypes.object,
  softwareSignature: PropTypes.string,

  // Autonomous
  onAction: PropTypes.func,
  onRemoveItem: PropTypes.func,
  initialMap: PropTypes.string,
  activeItems: PropTypes.array,
  availableItems: PropTypes.array,
  // itemMaker: PropTypes.instanceOf(Element),
};

ReactPlanner.contextTypes = {
  store: PropTypes.object.isRequired,
};

ReactPlanner.childContextTypes = {
  ...objectsMap(actions, () => PropTypes.object),
  translator: PropTypes.object,
  catalog: PropTypes.object,
};

ReactPlanner.defaultProps = {
  translator: new Translator(),
  catalog: new Catalog(),
  plugins: [],
  allowProjectFileSupport: true,
  softwareSignature: `React-Planner ${VERSION}`,
  toolbarButtons: [],
  sidebarComponents: [],
  footerbarComponents: [],
  customContents: {},
};

//redux connect
function mapStateToProps(reduxState) {
  return {
    state: reduxState,
  };
}

function mapDispatchToProps(dispatch) {
  return objectsMap(actions, (actionNamespace) =>
    bindActionCreators(actions[actionNamespace], dispatch)
  );
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(ReactPlanner);

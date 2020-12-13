var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import connect from "react-redux/lib/connect/connect";

import Translator from "./translator/translator";
import Catalog from "./catalog/catalog";
import actions from "./actions/export";
import { objectsMap } from "./utils/objects-utils";
import { ToolbarComponents, Content, SidebarComponents, FooterBarComponents } from "./components/export";
import { VERSION } from "./version";
import "./styles/export";
import ReactPlannerService from "./ReactPlannerService";
import { loadProject } from "./actions/project-actions";
import CatalogList from "./components/catalog-view/catalog-list";

var Toolbar = ToolbarComponents.Toolbar;
var Sidebar = SidebarComponents.Sidebar;
var FooterBar = FooterBarComponents.FooterBar;


var toolbarW = 50;
var sidebarW = 300;
var footerBarH = 20;

var wrapperStyle = {
  display: "flex",
  flexFlow: "row nowrap"
};

import { itemsActions } from "./actions/export";

var ReactPlanner = function (_Component) {
  _inherits(ReactPlanner, _Component);

  function ReactPlanner() {
    _classCallCheck(this, ReactPlanner);

    return _possibleConstructorReturn(this, (ReactPlanner.__proto__ || Object.getPrototypeOf(ReactPlanner)).apply(this, arguments));
  }

  _createClass(ReactPlanner, [{
    key: "getChildContext",
    value: function getChildContext() {
      var _this2 = this;

      return _extends({}, objectsMap(actions, function (actionNamespace) {
        return _this2.props[actionNamespace];
      }), {
        translator: this.props.translator,
        catalog: this.props.catalog
      });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      // Autonomous
      // let { store } = this.context;
      var store = this.props.store;
      var _props = this.props,
          projectActions = _props.projectActions,
          catalog = _props.catalog,
          stateExtractor = _props.stateExtractor,
          plugins = _props.plugins;

      plugins.forEach(function (plugin) {
        return plugin(store, stateExtractor);
      });
      projectActions.initCatalog(catalog);

      // Autonomous
      var _props2 = this.props,
          onAction = _props2.onAction,
          initialMap = _props2.initialMap,
          activeItem = _props2.activeItem;

      ReactPlannerService.getInstance().onActionCallBack = onAction;
      // ReactPlannerService.getInstance().activeItem = activeItem;
      if (initialMap) {
        store.dispatch(loadProject(JSON.parse(initialMap)));
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var stateExtractor = nextProps.stateExtractor,
          state = nextProps.state,
          projectActions = nextProps.projectActions,
          catalog = nextProps.catalog;

      var plannerState = stateExtractor(state);
      var catalogReady = plannerState.getIn(["catalog", "ready"]);
      if (!catalogReady) {
        projectActions.initCatalog(catalog);
      }
    }
  }, {
    key: "openCatalog",
    value: function openCatalog() {
      this.props.projectActions.openCatalog();
      // this.props.store.dispatch(selectToolDrawingItem("bench"));
    }
  }, {
    key: "unSelectAll",
    value: function unSelectAll() {
      this.props.projectActions.unselectAll();
    }
  }, {
    key: "selectCatalogItem",
    value: function selectCatalogItem(element) {
      if (element) {
        switch (element.prototype) {
          case "lines":
            this.props.store.dispatch(linesActions.selectToolDrawingLine(element.name));
            break;
          case "items":
            this.props.store.dispatch(itemsActions.selectToolDrawingItem(element.name));
            break;
          case "holes":
            this.props.store.dispatch(holesActions.selectToolDrawingHole(element.name));
            break;
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props3 = this.props,
          width = _props3.width,
          height = _props3.height,
          state = _props3.state,
          stateExtractor = _props3.stateExtractor,
          props = _objectWithoutProperties(_props3, ["width", "height", "state", "stateExtractor"]);

      var contentW = width - toolbarW - sidebarW;
      var toolbarH = height - footerBarH;
      var contentH = height - footerBarH;
      var sidebarH = height - footerBarH;

      var extractedState = stateExtractor(state);

      return React.createElement(
        "div",
        { style: _extends({}, wrapperStyle, { height: height }) },
        React.createElement(Content, _extends({
          width: width,
          height: height,
          state: extractedState
        }, props, {
          onWheel: function onWheel(event) {
            return event.preventDefault();
          }
          // itemMaker={this.props.itemMaker}
        }))
      );
    }
  }]);

  return ReactPlanner;
}(Component);

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
  availableItems: PropTypes.array
  // itemMaker: PropTypes.instanceOf(Element),
};

ReactPlanner.contextTypes = {
  store: PropTypes.object.isRequired
};

ReactPlanner.childContextTypes = _extends({}, objectsMap(actions, function () {
  return PropTypes.object;
}), {
  translator: PropTypes.object,
  catalog: PropTypes.object
});

ReactPlanner.defaultProps = {
  translator: new Translator(),
  catalog: new Catalog(),
  plugins: [],
  allowProjectFileSupport: true,
  softwareSignature: "React-Planner " + VERSION,
  toolbarButtons: [],
  sidebarComponents: [],
  footerbarComponents: [],
  customContents: {}
};

//redux connect
function mapStateToProps(reduxState) {
  return {
    state: reduxState
  };
}

function mapDispatchToProps(dispatch) {
  return objectsMap(actions, function (actionNamespace) {
    return bindActionCreators(actions[actionNamespace], dispatch);
  });
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true
})(ReactPlanner);
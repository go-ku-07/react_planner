import React from "react";
import PropTypes from "prop-types";
import If from "../../utils/react-if";
import { Tooltip } from "react-svg-tooltip";
import { ReactPlannerService } from "../../ReactPlannerService";

var STYLE_LINE = {
  fill: "#0096fd",
  stroke: "#0096fd"
};

var STYLE_CIRCLE = {
  fill: "#0096fd",
  stroke: "#0096fd",
  cursor: "ew-resize"
};

var STYLE_CIRCLE2 = {
  fill: "none",
  stroke: "#0096fd",
  cursor: "ew-resize"
};

export default function Item(_ref) {
  var layer = _ref.layer,
      item = _ref.item,
      scene = _ref.scene,
      catalog = _ref.catalog,
      activeItems = _ref.activeItems;
  var x = item.x,
      y = item.y,
      rotation = item.rotation;


  var circleRef = React.createRef();

  var renderedItem = catalog.getElement(item.type).render2D(item, layer, scene);

  console.log(activeItems);

  // const activeItem = ReactPlannerService.getInstance().activeItem;

  return React.createElement(
    "g",
    {
      ref: circleRef,
      "data-element-root": true,
      "data-prototype": item.prototype,
      "data-id": item.id,
      "data-selected": item.selected,
      "data-layer": layer.id,
      style: item.selected ? { cursor: "move" } : {},
      transform: "translate(" + x + "," + y + ") rotate(" + rotation + ")"
    },
    React.createElement(
      "g",
      { opacity: activeItems.includes(item.id) ? 1 : 0.5 },
      renderedItem
    ),
    React.createElement(
      Tooltip,
      { triggerRef: circleRef },
      React.createElement("rect", {
        x: 2,
        y: 2,
        width: 10,
        height: 5,
        rx: 0.5,
        ry: 0.5,
        fill: "black"
      }),
      React.createElement(
        "text",
        { x: 5, y: 5, fontSize: 2, fill: "white" },
        "Yay!"
      )
    ),
    React.createElement(
      If,
      { condition: item.selected },
      React.createElement(
        "g",
        {
          "data-element-root": true,
          "data-prototype": item.prototype,
          "data-id": item.id,
          "data-selected": item.selected,
          "data-layer": layer.id,
          "data-part": "rotation-anchor"
        },
        React.createElement("circle", { cx: "0", cy: "150", r: "10", style: STYLE_CIRCLE }),
        React.createElement("circle", { cx: "0", cy: "0", r: "150", style: STYLE_CIRCLE2 })
      )
    )
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired
};
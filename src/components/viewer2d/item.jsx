import React from "react";
import PropTypes from "prop-types";
import If from "../../utils/react-if";
import { Tooltip } from "react-svg-tooltip";
import { ReactPlannerService } from "../../ReactPlannerService";

const STYLE_LINE = {
  fill: "#0096fd",
  stroke: "#0096fd",
};

const STYLE_CIRCLE = {
  fill: "#0096fd",
  stroke: "#0096fd",
  cursor: "ew-resize",
};

const STYLE_CIRCLE2 = {
  fill: "none",
  stroke: "#0096fd",
  cursor: "ew-resize",
};

export default function Item({ layer, item, scene, catalog, activeItems, availableItems }) {

  const isActive = activeItems.includes(item.id)
  const isAvailable = !isActive ? true :  availableItems.includes(item.id)

  // console.log(activeItems);
  // console.log(availableItems);
  // console.log('isAvailable',availableItems.includes(item.id))
  
  let { x, y, rotation } = item;

  const circleRef = React.createRef();

  let renderedItem = catalog.getElement(item.type).render2D(item, layer, scene, isAvailable);

  // const activeItem = ReactPlannerService.getInstance().activeItem;

  return (
    <g
      ref={circleRef}
      data-element-root
      data-prototype={item.prototype}
      data-id={item.id}
      data-selected={item.selected}
      data-layer={layer.id}
      style={item.selected ? { cursor: "move" } : {}}
      transform={`translate(${x},${y}) rotate(${rotation})`}
    >
      <g opacity={activeItems.includes(item.id) ? 1 : 0.5}>{renderedItem}</g>
      <Tooltip triggerRef={circleRef}>
        <rect
          x={2}
          y={2}
          width={10}
          height={5}
          rx={0.5}
          ry={0.5}
          fill="black"
        />
        <text x={5} y={5} fontSize={2} fill="white">
          Yay!
        </text>
      </Tooltip>
      <If condition={item.selected}>
        <g
          data-element-root
          data-prototype={item.prototype}
          data-id={item.id}
          data-selected={item.selected}
          data-layer={layer.id}
          data-part="rotation-anchor"
        >
          <circle cx="0" cy="150" r="10" style={STYLE_CIRCLE} />
          <circle cx="0" cy="0" r="150" style={STYLE_CIRCLE2} />
        </g>
      </If>
    </g>
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
};

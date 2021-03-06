import React, { Component } from "react";
import PropTypes from "prop-types";
import { Layer, Grids } from "./export";

export default class Scene extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    // return this.props.scene.hashCode() !== nextProps.scene.hashCode();
    //Autonomous
    return (
      this.props.scene.hashCode() !== nextProps.scene.hashCode() ||
      this.props.activeItems != nextProps.activeItems ||
      this.props.unAvailableItems != nextProps.unAvailableItems
    );
  }

  render() {
    let { scene, catalog, activeItems, unAvailableItems } = this.props;
    let { height, layers } = scene;
    let selectedLayer = layers.get(scene.selectedLayer);
    return (
      <g>
        {/* <Grids scene={scene} /> */}

        <g style={{ pointerEvents: "none" }}>
          {layers
            .entrySeq()
            .filter(
              ([layerID, layer]) =>
                layerID !== scene.selectedLayer && layer.visible
            )
            .map(([layerID, layer]) => (
              <Layer
                key={layerID}
                layer={layer}
                scene={scene}
                catalog={catalog}
                activeItems={activeItems}
                unAvailableItems={unAvailableItems}
              />
            ))}
        </g>

        <Layer
          key={selectedLayer.id}
          layer={selectedLayer}
          scene={scene}
          catalog={catalog}
          activeItems={activeItems}
          unAvailableItems={unAvailableItems}
        />
      </g>
    );
  }
}

Scene.propTypes = {
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
};

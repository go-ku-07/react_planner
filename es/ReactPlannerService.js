var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReactPlannerService = function () {
  function ReactPlannerService() {
    _classCallCheck(this, ReactPlannerService);
  }

  _createClass(ReactPlannerService, [{
    key: "onAction",
    value: function onAction(action, itemType, id) {
      var position = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      if (this.onActionCallBack) {
        this.onActionCallBack(action, itemType, id, position);
      }
    }
  }], [{
    key: "getInstance",


    // CallBack
    value: function getInstance() {
      if (ReactPlannerService.mInstance == null) {
        ReactPlannerService.mInstance = new ReactPlannerService();
        ReactPlannerService.mInstance.activeItem = [];
      }

      return ReactPlannerService.mInstance;
    }
  }]);

  return ReactPlannerService;
}();

var Action = {
  SELECT: "SELECT",
  REMOVE: "REMOVE"
};

var ItemTypes = {
  ITEM: "ITEM",
  AREA: "AREA"
};

export { Action, ItemTypes, ReactPlannerService };

export default ReactPlannerService;
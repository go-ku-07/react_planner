class ReactPlannerService {
  static mInstance;

  // CallBack
  onActionCallBack;
  static activeItem;

  static getInstance() {
    if (ReactPlannerService.mInstance == null) {
      ReactPlannerService.mInstance = new ReactPlannerService();
      ReactPlannerService.mInstance.activeItem = [];
    }

    return ReactPlannerService.mInstance;
  }

  onAction(action, itemType, id, position = null) {
    if (this.onActionCallBack) {
      this.onActionCallBack(action, itemType, id, position);
    }
  }
}

const Action = {
  SELECT: "SELECT",
  REMOVE: "REMOVE",
};

const ItemTypes = {
  ITEM: "ITEM",
  AREA: "AREA",
};

export { Action, ItemTypes, ReactPlannerService };

export default ReactPlannerService;

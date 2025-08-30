sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/Device"
], function (UIComponent, Device) {
  "use strict";

  /**
   * @name converted.productdetailsview.Component
   * @class Main application component
   * @extends sap.ui.core.UIComponent
   */
  return UIComponent.extend("converted.productdetailsview.Component", {
    metadata: {
      manifest: "json"
    },

    /**
     * The component is initialized by UI5 automatically during the startup of the app.
     * @public
     * @override
     */
    init: function () {
      // Call the base component's init function
      UIComponent.prototype.init.apply(this, arguments);

      // Set device model
      this.setModel(new sap.ui.model.json.JSONModel(Device), "device");

      // Enable routing
      this.getRouter().initialize();
    },

    /**
     * The component is destroyed by UI5 automatically.
     * In this method, the ListSelector and ErrorHandler are destroyed.
     * @public
     * @override
     */
    destroy: function () {
      // Call the base component's destroy function
      UIComponent.prototype.destroy.apply(this, arguments);
    }
  });
});

sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
  "use strict";

  /**
   * @name converted.productdetailsview.controller.App
   * @class Main application controller
   * @extends sap.ui.core.mvc.Controller
   */
  return Controller.extend("converted.productdetailsview.controller.App", {
    /**
     * Called when the app controller is initialized.
     * Sets up the router and handles initial navigation.
     */
    onInit: function () {
      // Log app initialization
      jQuery.sap.log.info("App controller initialized");

      // Get the router instance
      var oRouter = UIComponent.getRouterFor(this);

      // Check if router is available
      if (oRouter) {
        jQuery.sap.log.info("Router found, initializing navigation");

        // Attach error handling for routing
        oRouter.attachBypassed(function (oEvent) {
          jQuery.sap.log.warning("Route bypassed:", oEvent.getParameter("hash"));
        });

        // Navigate to main view if no hash is set
        if (!window.location.hash || window.location.hash === "#") {
          jQuery.sap.log.info("No hash found, navigating to main route");
          // Delay navigation to allow the UI to render
          setTimeout(function () {
            oRouter.navTo("main");
          }, 100);
        }
      } else {
        // Log error if router is not found
        jQuery.sap.log.error("Router not found in App controller");
      }
    }
  });
});

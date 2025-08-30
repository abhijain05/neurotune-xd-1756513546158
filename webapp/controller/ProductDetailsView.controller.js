sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/m/MessagePopover",
  "sap/m/MessageItem",
  "sap/ui/core/library",
  "sap/ui/core/UIComponent",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, MessageToast, MessageBox, MessagePopover, MessageItem, coreLibrary, UIComponent, Filter, FilterOperator) {
  "use strict";

  var MessageType = coreLibrary.MessageType;

  return Controller.extend("converted.productdetailsview.controller.ProductDetailsView", {
    onInit: function () {
      // Load product data from mock data
      var oProductModel = new JSONModel();
      oProductModel.loadData("model/mockData/products.json");
      this.getView().setModel(oProductModel, "products");

      // Load category data from mock data
      var oCategoryModel = new JSONModel();
      oCategoryModel.loadData("model/mockData/categories.json");
      this.getView().setModel(oCategoryModel, "categories");

      // Initialize message model for MessageArea/MessagePopover
      var oMessageModel = new JSONModel({
        messages: [
          {
            type: MessageType.Success,
            title: "System Information",
            description: "Application converted successfully, Use AI optimize for better result",
            subtitle: "Conversion complete",
            counter: 1
          }
        ]
      });
      this.getView().setModel(oMessageModel, "messages");

      // Set the initial product
      this.setInitialProduct();
    },

    setInitialProduct: function () {
      // Get product data
      var aProducts = this.getView().getModel("products").getData();

      if (aProducts && aProducts.length > 0) {
        var oInitialProductModel = new JSONModel(aProducts[0]);
        this.getView().setModel(oInitialProductModel, "product");
      } else {
        // Handle the case where there is no product data
        console.warn("No product data available.");
      }
    },

    handleSave: function () {
      // Get data from input fields
      var oProduct = this.getView().getModel("product").getData();

      // Save data to backend (replace with actual backend call)
      try {
        // Simulate saving
        MessageToast.show("Product saved successfully!");
      } catch (e) {
        MessageBox.error("Error saving product: " + e.getMessage());
      }
    },

    handleValueHelp: function (oEvent) {
      var oSource = oEvent.getSource();

      // Create value help dialog if it doesn't exist
      if (!this._valueHelpDialog) {
        this._valueHelpDialog = new sap.m.SelectDialog({
          title: "Select Value",
          confirm: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
              oSource.setValue(oSelectedItem.getTitle());
            }
          },
          cancel: function () {
            // Handle cancel event
          }
        });

        // Sample items - would be filled with actual data in a real app
        var oDialogModel = new JSONModel({
          items: [
            { title: "Item 1", description: "Description 1" },
            { title: "Item 2", description: "Description 2" },
            { title: "Item 3", description: "Description 3" }
          ]
        });

        this._valueHelpDialog.setModel(oDialogModel);
        this._valueHelpDialog.bindAggregation("items", {
          path: "/items",
          template: new sap.m.StandardListItem({
            title: "{title}",
            description: "{description}"
          })
        });
      }

      // Open the dialog
      this._valueHelpDialog.open();
    },

    onFileDownload: function (oEvent) {
      MessageToast.show("File download initiated");
    },

    handleMessagePopoverPress: function (oEvent) {
      if (!this._messagePopover) {
        this._messagePopover = new MessagePopover({
          items: {
            path: "messages>/messages",
            template: new MessageItem({
              type: "{messages>type}",
              title: "{messages>title}",
              description: "{messages>description}",
              subtitle: "{messages>subtitle}",
              counter: "{messages>counter}"
            })
          }
        });

        this.getView().byId("messageArea").addDependent(this._messagePopover);
      }

      this._messagePopover.toggle(oEvent.getSource());
    },

    onNavigationLinkPress: function (oEvent) {
      var oSource = oEvent.getSource();
      var sHref = oSource.getHref();

      if (sHref) {
        return;
      }

      var sNavTarget = oSource.data("navTarget");
      if (sNavTarget) {
        MessageToast.show("Navigating to: " + sNavTarget);
      }
    },

    onOfficeControlRendered: function (oEvent) {
      console.log("Office control container rendered");

      var oSource = oEvent.getSource();
      var sDomRef = oSource.getDomRef();
      if (sDomRef) {
        sDomRef.innerHTML = '<div class="sapUiMediumMargin">' +
          '<div class="sapUiMediumMarginBottom">' +
          '<span class="sapUiIcon sapUiIconMirrorInRTL" style="font-family:SAP-icons;color:#0854a0;font-size:2.5rem">&#xe0ef;</span>' +
          '</div>' +
          '<div class="sapMText">' +
          '<p>Office document integration would be configured here.</p>' +
          '<p>In SAPUI5, this typically uses OData services with MS Graph API integration.</p>' +
          '</div>' +
          '</div>';
      }
    },

    openDialog: function (oEvent) {
      var oSource = oEvent.getSource();
      var sDialogId = oSource.data("dialogId") || "confirmDialog";

      var oDialog = this.getView().byId(sDialogId);
      if (oDialog) {
        oDialog.open();
      } else {
        MessageToast.show("Dialog with ID '" + sDialogId + "' not found");
      }
    },

    closeDialog: function (oEvent) {
      var oDialog = oEvent.getSource().getParent();
      oDialog.close();
    },

    onDialogConfirm: function (oEvent) {
      MessageToast.show("Dialog confirmed");
      this.closeDialog(oEvent);
    },

    onDialogCancel: function (oEvent) {
      this.closeDialog(oEvent);
    },

    onNextPress: function (oEvent) {
      var oRouter = UIComponent.getRouterFor(this);
      oRouter.navTo("second");
    },

    onBackPress: function (oEvent) {
      var oRouter = UIComponent.getRouterFor(this);
      oRouter.navTo("main");
    },

    navTo: function (sRoute) {
      var oRouter = UIComponent.getRouterFor(this);
      oRouter.navTo(sRoute);
    },

    onSearch: function (oEvent) {
      var sQuery = oEvent.getParameter("query");
      var oFilter = new Filter("ProductName", FilterOperator.Contains, sQuery);
      var oBinding = this.byId("productList").getBinding("items");
      oBinding.filter([oFilter]);
    },

    onProductListItemPress: function (oEvent) {
      var oItem = oEvent.getSource();
      var oProduct = oItem.getBindingContext("products").getObject();

      var oProductModel = new JSONModel(oProduct);
      this.getView().setModel(oProductModel, "product");
    }
  });
});

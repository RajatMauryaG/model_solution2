(function () {
  'use strict';

  angular.module('ShoppingListApp', [])
.controller('BuyController', BuyController)
.controller('BoughtController', BoughtController)
.provider('ShoppingListService', ShoppingListServiceProvider)
.config(Config);

//config the factory
Config.$inject = ['ShoppingListServiceProvider'];
function Config(ShoppingListServiceProvider) {
  ShoppingListServiceProvider.defaults.maxItems = 10;
}

//Buy controller method
BuyController.$inject = ['ShoppingListService'];
function BuyController(ShoppingListService) {
  var Buy = this;

  Buy.itemsBuy = ShoppingListService.getItems();

  Buy.bought = function (itemIndex) {

    ShoppingListService.bought(itemIndex);
    // try {
    //   ShoppingListService.bought(itemIndex);
    // }
    // catch (error)
    // {
    //   Buy.Message = error.message;
    //   }
  };

  Buy.addtobought = function (item) {

    ShoppingListService.addtobought(item);
    // try {
    //   ShoppingListService.addtobought(item);
    // }
    // catch (error) {
    //   Buy.Message = error.message;
    // }

  };

}


//Bought controller method
BoughtController.$inject = ['ShoppingListService'];
function BoughtController(ShoppingListService) {
  var Bought = this;

  Bought.itemBought = ShoppingListService.getBougthItem();

}


//service method
function ShoppingListService(maxItems) {
  var service = this;

  var items = [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Donuts",
      quantity: "200"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "Chocolate",
      quantity: "5"
    },
    {
      name: "Peanut Butter",
      quantity: "5"
    }
  ];

  var bItems = [];

  service.addtobought = function (item) {

    bItems.push(item);
    // if (bItems.length != 0) {
    //   bItems.push(item);
    // }
    // else {
    //     throw new Error("Nothing bought yet");
    // }
  };

  service.getBougthItem = function () {
    return bItems;
  };


  service.getItems = function () {
    return items;
    };

  service.bought = function (itemIndex) {

    items.splice(itemIndex, 1);
    // if (items.length > 0) {
    //   items.splice(itemIndex, 1);
    // }
    // else {
    //   throw new Error("Everything is bought!");
    // }

  };

}


//factory method
function ShoppingListServiceProvider() {
  var provider = this;

  provider.defaults = {
    maxItems : 10
  };

  provider.$get = function () {
    var ShoppingList = new ShoppingListService(provider.defaults.maxItems);

    return ShoppingList;
  };
}


})();

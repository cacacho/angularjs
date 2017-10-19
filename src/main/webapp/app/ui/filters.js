var module = angular.module('mpApp.ui');

module.filter('mirror', function reversal () {
    return function(item) {
        return item +'|'+item.split("").reverse().join("");
    }
  });


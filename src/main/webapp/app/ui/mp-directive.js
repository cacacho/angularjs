var module = angular.module('mpApp.ui');


module.directive('mpDirective', function() {
    return {
        restrict: 'EA', //E = element, A = attribute, C = class, M = comment
        templateUrl: 'app/ui/view/language.html',
        link: function ($scope, element, attrs) {
            element.bind('click', function () {
                element.html('Nombre: ' + $scope.item.name );
            });
        }
    };
});


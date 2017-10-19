var module = angular.module('mpApp.ui');


module.directive('smartPageTitle', function ($rootScope, $timeout) {
    
    
    return {
        restrict: 'A',
        compile: function (element, attributes) {
            element.removeAttr('smart-page-title data-smart-page-title');

            var listener = function(event, toState, toParams, fromState, fromParams) {

            	var title = 'MP, ciencia, verdad y justicia';
                
                if (toState.data && toState.data.title) {
                    var stateTitle = toState.data.title; 
                    if(stateTitle != ''){
                        title = stateTitle + ' | ' + title;
                    }
                    
                }                    // Set asynchronously so page changes before title does
                $timeout(function() {
                	var title_el = document.querySelector("title");

                	if(title_el)
                	    title_el.innerHTML = title;
                	document.title = title;
                });
            };

            $rootScope.$on('$stateChangeStart', listener);

        }
    }
});



var module = angular.module('mpApp.public');


module.controller('searchCategoriaController', function ($state, $log, categoriaResource) {
    var vm = this;
    
    vm.categorias = [];
    
    vm.search = function(){
        var successCallback = function(data, responseHeaders) {
            vm.categorias = data;
        };

        var errorCallback = function(responseHeaders) {
            $log.error('search error ' + responseHeaders);
        };

        categoriaResource.queryAll({}, successCallback, errorCallback);
    };
    
    vm.delete = function(id){
        
    };
    
    vm.search();
});


module.controller('editCategoriaController', function ($state, $log, $stateParams, $location, categoriaResource) {
    var vm = this;
    
    vm.location = $location.path();
    vm.categoria = {};
    vm.get = function(){
        var successCallback = function(data, responseHeaders) {
            $log.info('retrieved successfuly ' + JSON.stringify(data));
            vm.categoria = data;
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while searching ' + responseHeaders);
        };
        
        categoriaResource.query({id:$stateParams.id}, successCallback, errorCallback);
    };

    vm.guardar = function () {

        var successCallback = function(data, responseHeaders) {
            $log.info('updating successfuly ' + data);
            $state.go('public.categorias');
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while persisting');
        };
         
         vm.categoria.$update(successCallback, errorCallback);

    };
    
    vm.delete = function () {

        var successCallback = function(data, responseHeaders) {
            $log.info('removed successfuly ' + data);
            $state.go('public.categorias');
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while persisting');
        };
         
         vm.categoria.$remove(successCallback, errorCallback);

    };
    
    vm.cancel = function () {
        vm.categoria = {};
        $state.go('public.categorias');
    };
    
    vm.get();

});

module.controller('newCategoriaController', function ($state, $log, categoriaResource) {
    var vm = this;
    vm.categoria = {};

    vm.guardar = function () {

        var successCallback = function(data, responseHeaders) {
            $log.info('saved successfuly ' + data);
            $state.go('public.categorias');
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while persisting');
        };

        categoriaResource.save(vm.categoria, successCallback, errorCallback);

    };
    
    vm.cancel = function () {
        vm.categoria = {};
        $state.go('public.categorias');
    };

});
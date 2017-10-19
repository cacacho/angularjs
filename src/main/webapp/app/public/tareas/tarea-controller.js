
var module = angular.module('mpApp.public');


module.controller('searchTareaController', function ($log, tareaResource) {
    var vm = this;
    
    vm.tareas = [];
    
    vm.search = function(){
        var successCallback = function(data, responseHeaders) {
            vm.tareas = data;
        };

        var errorCallback = function(responseHeaders) {
            $log.error('search error ' + responseHeaders);
        };

         tareaResource.queryAll({"max":100}, successCallback, errorCallback);
    };

    vm.evaluateState = function(value){
        if (value)
            return 'Finalizada';
        return 'Pendiente';
    }
    
    vm.search();
});


module.controller('editTareaController', function ($log, $stateParams, $location, tareaResource, $state, categoriaResource) {
    var vm = this;
    vm.location = $location.path();
    vm.tarea = {};

    categoriaResource.queryAll({"max":1000}, (data)=> { vm.categorias = data }, (responseHeaders)=> { $log.error('search categories error ' + responseHeaders); });

    vm.get = function(){
        var successCallback = function(data, responseHeaders) {
            $log.info('retrieved successfuly ' + JSON.stringify(data));
            vm.tarea = data;
            vm.tarea.fechaLimite = new Date(data.fechaLimite);
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while searching ' + responseHeaders);
        };
        
        tareaResource.query({id:$stateParams.id}, successCallback, errorCallback);
    };

    vm.save = function () {

        var successCallback = function(data, responseHeaders) {
            $log.info('updating successfuly ' + data);
            $state.go('public.tareas');
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while persisting');
        };
         
         vm.tarea.$update(successCallback, errorCallback);

    };
    
    vm.delete = function () {

        var successCallback = function(data, responseHeaders) {
            $log.info('removed successfuly ' + data);
            $state.go('public.tareas');
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while persisting');
        };
         
         vm.tarea.$remove(successCallback, errorCallback);

    };
    
    vm.cancel = function () {
        vm.tarea = {};
        $state.go('public.tareas');
    };
    
    vm.get();

});

module.controller('newTareaController', function ($log, $location, tareaResource, $state, categoriaResource) {
    var vm = this;
    vm.tarea = {};
    
    categoriaResource.queryAll({"max":1000}, (data)=> { vm.categorias = data }, (responseHeaders)=> { $log.error('search categories error ' + responseHeaders); });

    vm.save = function () {

        var successCallback = function(data, responseHeaders) {
            $log.info('saved successfuly ' + data);
            $state.go('public.tareas');
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while persisting');
        };

        tareaResource.save(vm.tarea, successCallback, errorCallback);

    };
    
    vm.cancel = function () {
        vm.tarea = {};
        $state.go('public.tareas');
    };

});
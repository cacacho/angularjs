
var module = angular.module('mpApp.public');


module.controller('searchTareaController', function ($log, $stateParams, $location, tareaResource, $state, categoriaResource, $uibModal, $document) {
    var vm = this;
    vm.location = $location.path();
    vm.tarea = {};
    
    vm.tareas = [];
    categoriaResource.queryAll({"max":1000}, (data)=> { vm.categorias = data }, (responseHeaders)=> { $log.error('search categories error ' + responseHeaders); });
    
    vm.search = function(){
        var successCallback = function(data, responseHeaders) {
            vm.tareas = data;
        };

        var errorCallback = function(responseHeaders) {
            $log.error('search error ' + responseHeaders);
        };

        tareaResource.queryAll({"max":100}, successCallback, errorCallback);
    };

    vm.searchT = function(searchText){
        var successCallback = function(data, responseHeaders) {
            vm.tareas = data;
        };

        var errorCallback = function(responseHeaders) {
            $log.error('search error ' + responseHeaders);
        };

        tareaResource.queryAll({"max":100, "busqueda":searchText}, successCallback, errorCallback);
    }

    vm.evaluateState = function(value){
        if (value)
            return 'Finalizada';
        return 'Pendiente';
    }
    
    vm.search();

    vm.open = function(tarea)
    {
        if (tarea)
        {
            var parentElem = angular.element($document[0].querySelector('.bodyclass '));
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/public/tareas/tareaDetalle.html',
                controller: 'editTareaController',
                controllerAs: 'vm',
                size: 'lg',
                appendTo: parentElem,
                resolve: {
                    tarea: function () {
                        return tarea;
                    }
                }
            });
        }
        else
        {            
            var parentElem = angular.element($document[0].querySelector('.bodyclass '));
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/public/tareas/tareaDetalle.html',
                controller: 'newTareaController',
                controllerAs: 'vm',
                size: 'lg',
                appendTo: parentElem
            });
        }
  
        modalInstance.result.then(function (tareas) { vm.tareas = tareas, 
            categoriaResource.queryAll({"max":1000}, (data)=> { vm.categorias = data }, (responseHeaders)=> { $log.error('search categories error ' + responseHeaders); }); }, function () {  });
    }

    vm.cargarCategorias = function(categoria) {
        var successCallback = function(data, responseHeaders) {
            vm.tareas = data;
        };

        var errorCallback = function(responseHeaders) {
            $log.error('search error ' + responseHeaders);
        };

         tareaResource.queryAll({"max":100, "idCategoria":categoria.id}, successCallback, errorCallback);
    }
});


module.controller('editTareaController', function (tarea, $log, $stateParams, $location, tareaResource, $state, categoriaResource, $uibModalInstance) {
    var vm = this;
    vm.location = $location.path();
    vm.tarea = tarea;
    vm.categoria = {};

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
        
        tareaResource.query({id:tarea.id}, successCallback, errorCallback);
    };

    vm.save = function () {

        var successCallback = function(data, responseHeaders) {
            $log.info('updating successfuly ' + data);
            vm.cargarCategorias(data.categoria);
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while persisting');
        };
         
         vm.tarea.$update(successCallback, errorCallback);

    };
    
    vm.delete = function () {

        var successCallback = function(data, responseHeaders) {
            $log.info('removed successfuly ' + data);
            vm.cargarCategorias(data.categoria);
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while persisting');
        };
         
         vm.tarea.$remove(successCallback, errorCallback);

    };
    
    vm.cancel = function () {
        vm.tarea = {};
        $uibModalInstance.dismiss('cancel');
    };
    
    vm.get();

    vm.dateOptions = 
    {
        formatYear: 'yyyy',
        startingDay: 1
    };

    vm.disabled = function(date, mode) 
    {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    vm.open = function($event) 
    {
        $event.preventDefault();
        $event.stopPropagation();

        vm.opened = true;
    };

    vm.cargarCategorias = function(categoria) {
        var successCallback = function(data, responseHeaders) {
            $uibModalInstance.close(data);
        };

        var errorCallback = function(responseHeaders) {
            $log.error('search error ' + responseHeaders);
        };

        categoriaResource.queryAll({"max":1000}, (data)=> { vm.categorias = data }, (responseHeaders)=> { $log.error('search categories error ' + responseHeaders); });        
        tareaResource.queryAll({"max":100, "idCategoria":categoria.id}, successCallback, errorCallback);
    }

    vm.crearCategoria = function() {
        vm.estaCreandoCategoria = true;
    }

    vm.guardarC = function () {

        var successCallback = function(data, responseHeaders) {
            $log.info('saved successfuly ' + data);
            vm.estaCreandoCategoria = false;
            categoriaResource.queryAll({"max":1000}, (data)=> { vm.categorias = data }, (responseHeaders)=> { $log.error('search categories error ' + responseHeaders); });
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while persisting');
        };

        categoriaResource.save(vm.categoria, successCallback, errorCallback);

    };
    
    vm.cancelC = function () {
        vm.categoria = {};
        vm.estaCreandoCategoria = false;
    };

});

module.controller('newTareaController', function ($log, $location, tareaResource, $state, categoriaResource, $uibModalInstance) {
    var vm = this;
    vm.tarea = {};
    vm.categoria = {};
    
    categoriaResource.queryAll({"max":1000}, (data)=> { vm.categorias = data }, (responseHeaders)=> { $log.error('search categories error ' + responseHeaders); });

    vm.save = function () {

        var successCallback = function(data, responseHeaders) {
            $log.info('saved successfuly ' + data);
            vm.cargarCategorias(data.categoria);
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while persisting');
        };

        tareaResource.save(vm.tarea, successCallback, errorCallback);
    };
    
    vm.cancel = function () {
        vm.tarea = {};
        $uibModalInstance.dismiss('cancel');
    };

    vm.dateOptions = 
    {
        formatYear: 'yyyy',
        startingDay: 1
    };

    vm.disabled = function(date, mode) 
    {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    vm.open = function($event) 
    {
        $event.preventDefault();
        $event.stopPropagation();
        vm.opened = true;
    };

    vm.cargarCategorias = function(categoria) {
        var successCallback = function(data, responseHeaders) {
            $uibModalInstance.close(data);
        };

        var errorCallback = function(responseHeaders) {
            $log.error('search error ' + responseHeaders);
        };

        categoriaResource.queryAll({"max":1000}, (data)=> { vm.categorias = data }, (responseHeaders)=> { $log.error('search categories error ' + responseHeaders); });
        tareaResource.queryAll({"max":100, "idCategoria":categoria.id}, successCallback, errorCallback);
    }

    vm.crearCategoria = function() {
        vm.estaCreandoCategoria = true;
    }

    vm.guardarC = function () {

        var successCallback = function(data, responseHeaders) {
            $log.info('saved successfuly ' + data);
            vm.estaCreandoCategoria = false;
            categoriaResource.queryAll({"max":1000}, (data)=> { vm.categorias = data }, (responseHeaders)=> { $log.error('search categories error ' + responseHeaders); });            
        };

        var errorCallback = function(responseHeaders) {
            $log.error('error while persisting');
        };

        categoriaResource.save(vm.categoria, successCallback, errorCallback);

    };
    
    vm.cancelC = function () {
        vm.categoria = {};
        vm.estaCreandoCategoria = false;
    };

});
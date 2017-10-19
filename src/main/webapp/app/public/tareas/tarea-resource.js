var module = angular.module('mpApp.public');


module.factory('tareaResource', function ($resource, comm) {
    return $resource(comm.url + '/tarea/:id', {
            id : '@id'
        }, {
        'queryAll': {
            method: 'GET',
            isArray: true
        },
        'query' : {
                method : 'GET',
                isArray : false
        },
        'update' : {
            method : 'PUT'
        }
    });
});


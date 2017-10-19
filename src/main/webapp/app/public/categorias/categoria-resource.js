var module = angular.module('mpApp.public');


module.factory('categoriaResource', function ($resource, comm) {
    return $resource(comm.url + '/categoria/:id', {
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


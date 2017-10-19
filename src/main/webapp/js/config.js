var module = angular.module('mpApp.controllers');

module.constant('comm',{
    token : 'eltoken'
});

module.config(function($httpProvider, comm){
    //$httpProvider.defaults.headers.common['Nabenik-Key'] = comm.token;
    $httpProvider.defaults.cache = false;
    var dummyInterceptor = 
      function($log) {
        var service = {
          // run this function before making requests
          'request': function(config) {
              $log.warn(JSON.stringify(config));
              return config;
          }
        };
        return service;
      };

    $httpProvider.interceptors.push(dummyInterceptor);
});


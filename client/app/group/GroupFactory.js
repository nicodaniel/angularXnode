'use strict';
 
angular.module('app').
  factory('GroupFactory', function($http){
    return {
     getQueueByName: function(name) {
      return $http.get('/api/getQueueByName?url='+name);
    }
    }
  }); 

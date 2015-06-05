'use strict';
 
angular.module('app').
  factory('HomeFactory', function($http){
    return {
     getDlQueue: function() {
        return $http.get('/api/dlqueue/');
      },
      countDLQueueRequest: function() {
       return $http.get('/api/countDLQueueRequest/');
     },
     getCountQueueByDay: function() {
       return $http.get('/api/getCountQueueByDay/');
     }
    }
  }); 

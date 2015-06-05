angular.module('app').controller('GroupCtrl',
      ['$scope', '$rootScope' , '$http','GroupFactory','$routeParams',
  function($scope, $rootScope, $http, GroupFactory, $routeParams) {
              
       $scope.queues = [];
       $scope.title = $routeParams.id;
       GroupFactory.getQueueByName($routeParams.id).success(function(data) {
        $scope.queues = data; 
       })
       .error(function(data, status, headers, config){
       
       });
       
       $scope.showMore = function($index){
      	if($scope.queues.result[$index].visible == undefined){
      	 $scope.queues.result[$index].visible = true;
      	}else{
      	 $scope.queues.result[$index].visible = !$scope.queues.result[$index].visible;
      	}
       }
       
       
      }]);
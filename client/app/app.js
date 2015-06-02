angular.module('app', ['ngResource', 'ngRoute', 'ngSanitize' ,'ui.bootstrap']);

angular.module('app')
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  
  //all routes from apps
  $routeProvider
    .when('/', { templateUrl: 'app/views/home.html', controller: 'HomeCtrl'})
    .when('/group', { templateUrl: 'app/views/group.html',   controller: 'GroupCtrl'   })
    .when('/groupId', { templateUrl: 'app/views/groupId.html',    controller: 'GroupCtrl'   })
    .otherwise({ redirectTo: '/' });
  
  $locationProvider.html5Mode(true);
}]);

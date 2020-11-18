

var app =angular.module('app',['ui.router'])

app.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider){
    $stateProvider.caseInsensitiveMatch = true;
    $urlRouterProvider.otherwise('/');
    $stateProvider



}]).run(function($rootScope, $state) {
    $rootScope.$state = $state;
})

angular.module("app").controller("indexCtrl", ['$scope', '$interval', '$http', function($scope, $interval, $http){

}]);
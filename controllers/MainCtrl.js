var vmMainController=null;

angular.module("app").controller("MainController", function($scope, $http, $log){
    
    var vm = this;
    vmMainController = vm;
    
    vm.vinculos=[
        'Inicio','Blog','SolicitudUVIE'
    ];

});
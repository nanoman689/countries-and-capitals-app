angular.module('myApp', ['ngRoute', 'ngAnimate'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl : './home.html',
            controller : 'homeCtrl'
        }).when('/countries', {
            templateUrl : './countries.html',
            controller : "countriesCtrl"
        }).when('/countries/:country/capital', {
            templateUrl : './captials.html',
            controller : "capitalsCtrl"
        }).when('/error', {
          template : 'Error - Page Not Found'
        }).otherwise({
          redirectTo : '/error'
        });

      }])
      .controller('homeCtrl', function($rootScope) {
          //Home Controller
          $scope.getJSONData = function(){
            $http.get('http://api.geonames.org/countryInfo?username=demo')
              .then(function(response)){
                $scope.countryName = response.data;
              });
          };
          $scope.countryName = [];

      })

      .controller('countriesCtrl', function($scope, $http, $sce) {
          //Countries Controller
      })

      .controller('capitalsCtrl', function($rootScope) {
          //Capitals Controller
          // flag result <img src="http://www.geonames.org/flags/x/??.gif"/>
          // country image <img id='myImage' src="http://www.geonames.org/img/country/250/??.png"/>
      });

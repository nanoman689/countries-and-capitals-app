angular.module('myApp', ['ngRoute', 'ngAnimate'])
    .factory("countryData", ['$http', function($http){
        var countries = [];
        var selectedCountries;
        return {
            'fetch': function (){
              $http.get('http://api.geonames.org/countryInfo?username=nanoman689@gmail.com').then(function(data, status, headers, config){
                var x2js = new X2JS();
                var jsonObj = x2js.xml_str2json(data.data);
                console.log(jsonObj);
                countries = jsonObj.geonames.country;
              });

        },
            'getCountries': function (){
              return countries;
            },
            'findCountries' : function (countryCode){
              for (i=0; i<countries.length; i++){
                if (countries[i].countryCode == countryCode){
                  return countries[i];
                  break;
                }
              }
            }
      };
    }])
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
      .controller('homeCtrl', ['$rootScope', function($rootScope) {
          //Home Controller

      }])

      .controller('countriesCtrl', ['$scope', 'countryData', '$location', function($scope, countryData, $location) {
          //Countries Controller
            $scope.countries = [];
            $scope.pickCountry = function (countryCode){

              $location.path('/countries/' + countryCode + '/capital');
            }

            countryData.fetch();
            $scope.countries = countryData.getCountries();

            var data=["countryName", "countryCode", "capital", "areaInSqKm", "population", "currencyCode"];
            console.log($scope.countries);
            /*
            $http({
              url:"http://api.geonames.org/countryInfo?username=nanoman689@gmail.com",
              method: 'GET',
              data: data,
            })
            .then(function(data, status, headers, config) {
              // called when the data is avaiable
              console.log('Sucess!');
              // console.log(data.data);
              var x2js = new X2JS();
              var jsonObj = x2js.xml_str2json(data.data);
              console.log(jsonObj);
              $scope.countries = jsonObj.geonames.country;
            },
            function(data, status, headers, config) {
              // called when an error occurs or when and error getting the data
              console.log('Fail!');
            });

            */
      }])

      .controller('capitalsCtrl', ['$scope', 'countryData', '$routeParams', function($scope, countryData, $routeParams) {
          //Capitals Controller
          // flag result <img src="http://www.geonames.org/flags/x/??.gif"/>
          // country image <img id='myImage' src="http://www.geonames.org/img/country/250/??.png"/>
          $scope.countries = countryData.findCountries($routeParams.country);
          $scope.imageFlag = 'http://www.geonames.org/flags/x/' + $scope.countries.countryCode + '.gif';


      }]);

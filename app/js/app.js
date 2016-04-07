angular.module('myApp', ['ngRoute', 'ngAnimate'])
    .factory("countryData", ['$http', function($http){
        var countries = [];
        var selectedCountries;
        return {
            'fetch': function (){
              return $http
                  .get('http://api.geonames.org/countryInfo?username=nanoman689@gmail.com')
                  .then(function(data, status, headers, config){
                        var x2js = new X2JS();
                        var jsonObj = x2js.xml_str2json(data.data);
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
      .controller('homeCtrl', ['$scope', 'countryData', function($scope, countryData) {
          //Home Controller
          $scope.loaded = "Loading....."; 
              countryData
                  .fetch()
                  .then(function(){
                     $scope.loaded = "Countries Loaded";
          });   

      }])

      .controller('countriesCtrl', ['$scope', 'countryData', '$location', function($scope, countryData, $location) {
          //Countries Controller
            $scope.countries = countryData.getCountries();
            if ($scope.countries.length === 0){
                countryData
                    .fetch()
                    .then(function(){
                        $scope.countries = countryData.getCountries();
                });
            }
            $scope.pickCountry = function (countryCode){

              $location.path('/countries/' + countryCode + '/capital');
            }
            
            var data=["countryName", "countryCode", "capital", "areaInSqKm", "population", "currencyCode"];
            console.log($scope.countries);

      }])

      .controller('capitalsCtrl', ['$scope', 'countryData', '$routeParams', function($scope, countryData, $routeParams) {
          //Capitals Controller
          // flag result <img src="http://www.geonames.org/flags/x/??.gif"/>
          // country image <img id='myImage' src="http://www.geonames.org/img/country/250/??.png"/>
          $scope.countries = countryData.findCountries($routeParams.country);
          $scope.imageFlag = 'http://www.geonames.org/flags/x/' + $scope.countries.countryCode + '.gif';


      }]);
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

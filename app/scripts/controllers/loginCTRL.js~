'use strict';


routerApp
  .controller('loginCTRL', function($cookies, $rootScope,$scope, $http, $state,service) {
	 document.body.addEventListener('click', boxCloser, true);
	  $scope.$on('LOAD', function() {
        $scope.loading = true;
      });
      $scope.$on('UNLOAD', function() {
        $scope.loading = false;
      });
    
    var URL = 'http://fabfresh.elasticbeanstalk.com';
    $scope.submitForm = function() {
	     $scope.$emit('LOAD');
      var user = {
        "username": $scope.login.email,
        "password": $scope.login.password
      };
      service.login(user)
        .then(function(response){
          $scope.$emit('UNLOAD');
          if(response.status=="Not Authenticated"){
            alert("Either email or password is wrong");
          }
          else{
            $cookies.put('token',response.access_token);
            $state.go('customer_care');
          }
        },function(error){
            $scope.$emit('UNLOAD');
            alert("Some Error occured");
        });
    };
});

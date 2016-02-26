'use strict';


routerApp
  .controller('loginCTRL', function($cookies, $rootScope,$scope, $http, $state) {
    $scope.user = [];
	
	  $scope.$on('LOAD', function() {
        $scope.loading = true;
      });
      $scope.$on('UNLOAD', function() {
        $scope.loading = false;
      });
    
    var URL = 'http://fabfresh.elasticbeanstalk.com';
    $scope.submitForm = function() {
	$scope.$emit('LOAD');
      $scope.user = {
        "username": $scope.login.email,
        "password": $scope.login.password
      };
    $http({
      method  : 'POST',
      url     : URL+'/users/login/',
      data    : $scope.user,
      headers : {'Content-Type': 'application/json'} 
     })
      .success(function(data) {
	$scope.$emit('UNLOAD');
        if (data.errors) {
          alert("Some error occured");
        }
        else if(data.status=="Not Authenticated"){    
            alert("Either email or password is wrong");
        }
        else {
          $rootScope.access_token = data.access_token;
          $rootScope.otp_flag = 1;
          $cookies.put('key',data.access_token);
          $state.go("homepage");
        }
      });
    };
});

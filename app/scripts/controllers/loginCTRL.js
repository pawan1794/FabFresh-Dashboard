'use strict';


routerApp
  .controller('loginCTRL', function($cookieStore, $rootScope,$scope, $http, $state) {
    $scope.user = [];
    
    var URL = 'http://fabfresh-dev.elasticbeanstalk.com';
    $scope.submitForm = function() {
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
        if (data.errors) {
          alert("Some error occured");
        }
        else if(data.status=="Not Authenticated"){
            alert("Either email or password is wrong");
        }
        else {
          $rootScope.access_token = data.access_token;
          $rootScope.otp_flag = 1;
          $cookieStore.put('key',data.access_token);
          $state.go("homepage");
        }
      });
    };
});
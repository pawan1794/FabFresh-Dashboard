'use strict';


routerApp
  .controller('homeCTRL', function($state,$cookieStore,$http, $rootScope,$scope) {
  		var c = $cookieStore.get('key');
  		$scope.getFlag = function() {
  			return $rootScope.otp_flag;
  		}
		if(c){
			$rootScope.otp_flag=1;
			$state.go('homepage');
		}
		else
			$rootScope.otp_flag=0;
});


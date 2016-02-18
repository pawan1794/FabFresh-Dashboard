
'use strict';


routerApp
	.controller('logoutCTRL', function( $rootScope,$state,$cookies) {
		$cookies.put('key',null);
		$rootScope.otp_flag = 0;
		$state.go('login');
});
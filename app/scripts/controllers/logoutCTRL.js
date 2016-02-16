
'use strict';


routerApp
	.controller('logoutCTRL', function( $rootScope,$state,$cookieStore) {
		$cookieStore.put('key',null);
		$rootScope.otp_flag = 0;
		$state.go('login');
});
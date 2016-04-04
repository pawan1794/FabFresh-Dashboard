
'use strict';


routerApp
	.controller('logoutCTRL', function( $rootScope,$state,$cookies) {
		$cookies.remove('token');
});
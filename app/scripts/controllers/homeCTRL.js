'use strict';


routerApp
  .controller('homeCTRL', function($state,$cookies,$http, $rootScope,$scope) {
  		if(angular.isDefined($cookies.get('token'))){
        //console.log("true");
        	$state.go('customer_care');
      	}

	$scope.check_session=function(){
      if(angular.isDefined($cookies.get('token'))){
        //console.log("true");
        return true;
      }
      else{
         //console.log("false");
        return false;
      }
    }
});


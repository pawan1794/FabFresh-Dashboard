'use strict';


routerApp
  .controller('financeCTRL', function($state,$cookies,$http, $rootScope,$scope,service) {
  		if(angular.isUndefined($cookies.get('token'))){
        $state.go('login');
        alert("Please login to continue");
        return;
      }
      $scope.from=new Date("01 24, 2016 00:00:00");
      $scope.to=new Date();
      $scope.to.setHours("00");
      $scope.to.setMinutes("00");
      $scope.to.setSeconds("00");
      $scope.ordersList = [];
      $scope.to.setDate($scope.to.getDate()+1);

    $scope.getFinanceOrdersByDate=function(){
      service.getFinanceOrdersByDate(getDate1($scope.from),getDate1($scope.to))
       .then(
      function(response){
          response.totalAmount=0;
          response.totalWeight=0;
          response.totalAfterDiscount=0;
          for(var i=0;i<response.length;i++){
            if(!response[i].amount)
              response[i].amount=0;

            response.totalAmount+=response[i].amount;
            response.totalWeight+=response[i].weight;
          

            if(response[i].afterDiscount==null)
              response[i].afterDiscount=response[i].amount;
            response[i].discount=response[i].amount-response[i].afterDiscount;
            response.totalAfterDiscount+=response[i].afterDiscount;

            if(!response[i].coupon)
              response[i].coupon="-";
          }

         $scope.ordersList = response;
      },
      function(httpError){
        throw httpError.status;
      }
    );
    };
    var sort='id'
    $scope.getSorting= function () {
        return sort;
    };
    $scope.setSorting= function (x) {
        if(sort==x)
          sort='-'+x;
        else
          sort=x;
    };
    
    $scope.getFinanceOrdersByDate();
    
    function getDate1(d){
      var dd = d.getDate();
      var mm = d.getMonth()+1;
      var yyyy = d.getFullYear();
      if(dd<10)
          dd='0'+dd
      if(mm<10)
          mm='0'+mm
      return mm+'/'+dd+'/'+yyyy;
    }
    $scope.searchFilter = function (x) {
        var re = new RegExp($scope.nameFilter, 'i');
        return !$scope.nameFilter || re.test(x.id) ;
      };
});


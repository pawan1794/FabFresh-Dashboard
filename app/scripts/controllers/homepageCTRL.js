'use strict';


routerApp
  .controller('homepageCTRL', function( $cookieStore,$uibModal, $rootScope,$scope, $http) {
    $scope.user = [];
    $scope.nameFilter = null;
    $scope.ordersList = [];
    var URL = 'http://fabfresh-dev.elasticbeanstalk.com';
    $http({
      method  : 'GET',
      url     : URL+'/order/live/',
      headers : {'Authorization': 'Bearer '+$cookieStore.get('key')}//$rootScope.access_token} 
     })
      .success(function(data) {
        if (data.errors) {
          alert("Some error occured");
        }
        else {
          
          var type = {};
          type["0"] = "Wash";
          type["1"] = "Iron";
          type["2"] = "Wash and Iron";

          var type1 = {};
          //type1["0"] = "cancelled";
          //type1["1"] = "created";
          type1["2"] = "pickup";
          //type1["3"] = "receivedAtCenter";
          //type1["4"] = "precheck";
          //type1["5"] = "tagging";
          //type1["6"] = "wash";
          //type1["7"] = "dry";
          //type1["8"] = "iron";
          //type1["9"] = "package";
          //type1["10"] = "shipped";
          type1["11"] = "drop";
          //type1["12"] = "completed";


          var update1 = {};
          update1["2"] = "Cancel Order..?";
          update1["11"] = "Update Order..?";

          var colour = {};
          //colour["0"] = "#000000";
          //colour["1"] = "#987654";
          colour["2"] = "#9FCCFF";
          //colour["3"] = "#EA3865";
          //colour["4"] = "#F3A718";
          //colour["5"] = "#73D1F3";
          //colour["6"] = "#DFA938";
          //colour["7"] = "#83FCB1";
          //colour["8"] = "#29C3BA";
          //colour["9"] = "#BC4532";
          //colour["10"] = "#A49340";
          colour["11"] = "#6AB97F";
          //colour["12"] = "#000000";

          var data1=[];
          data.pickup_count=0;
          data.drop_count=0;
          for(var i=0;i<data.length;i++){
            if(data[i].status==2 || data[i].status==11){
              if(data[i].status==2)
                data.pickup_count+=1;
              else
                data.drop_count+=1;
              data[i].update=update1[data[i].status]; 
              data[i].clr=colour[data[i].status];
              data[i].order_type=type[data[i].order_type];
              data[i].status=type1[data[i].status];
              var str=data[i].created_at_time;
              data[i].created_at_time=str.substring(11, 16)+", "+str.substring(0, 10);
              str=data[i].modified_at_time;
              if(!data[i].coupon)
                data[i].coupon="NA";
              if(!str)
                data[i].modified_at_time="Never";
              else
                data[i].modified_at_time=str.substring(11, 16)+", "+str.substring(0, 10);
              if(data[i].afterDiscount==null)
                   data[i].afterDiscount=0;
              if(data[i].coupon==null)
                   data[i].coupon="NA";
                 data1.push(data[i]);
            }
          }
          data1.pickup_count=data.pickup_count;
          data1.drop_count=data.drop_count;
          $scope.data=data1;

        }
      });
      $scope.nameFilter1=true;
      $scope.nameFilter2=true;
      $scope.searchFilter = function (x) {
        var re = new RegExp($scope.nameFilter, 'i');
        return !$scope.nameFilter || re.test(x.id) ;
      };
      $scope.searchFilter1 = function (x) {
        if($scope.nameFilter1==undefined  || ( $scope.nameFilter1 && $scope.nameFilter2))
          return true;
        if( !$scope.nameFilter1 && !$scope.nameFilter2)
          return false;
        if($scope.nameFilter1)
          var re = new RegExp("pickup", 'i');
        else
          var re = new RegExp("drop", 'i');
        return re.test(x.status) ;
      };
    
      $scope.stringToColor = function(str) {
        return str;
      };
      

      $scope.getColor = function(str) {
        var date=new Date();
        var hours=parseInt(str.substring(0,2));
        var minutes=parseInt(str.substring(3,5));
        var year=parseInt(str.substring(7,11));
        var month=parseInt(str.substring(12,14));
        var day=parseInt(str.substring(15,17));
        var color="";
        if(year<date.getFullYear())
          color="red";
        else if(month<date.getMonth()+1)
          color="red";
        else if( day<date.getDay()){
          var dateHours=date.getHours()+24;
          if(hours<dateHours-1)
            color="red";
          else if(hours<dateHours && minutes<date.getMinutes())
            color="red";
          else
            color="#707070";
        }
        else{
          if(hours<date.getHours()-1)
            color="red";
          else if(hours<date.getHours() && minutes<date.getMinutes())
            color="red";
          else
            color="#707070";
        }
        return color;
      };




      $scope.open = function (x) {
        //alert(x.id);
        var modalInstance = $uibModal.open({
          templateUrl: 'views/order_details.html',
              controller: 'ModalInstanceCtrl',
              resolve: {
                x: function () {
                  return x;
                }
              }
            });
        };

      $scope.cancel_order = function (x,size) {
          if(x.status=='pickup'){
            var modalInstance1 = $uibModal.open({
              templateUrl: 'views/cancel_order.html',
              controller: 'ModalInstanceCtrl1',
              size: size,
              resolve: {
                  x: function () {
                    return x;
                  }
              }
            });
          }
          else{
            var modalInstance1 = $uibModal.open({
              templateUrl: 'views/update_order.html',
              controller: 'ModalInstanceCtrl2',
              size: size,
              resolve: {
                  x: function () {
                    return x;
                  }
              }
            });
          }
      };
})



.controller('ModalInstanceCtrl', function ($scope, x) {
   var type = {};
    type["true"] = "pickup";
    type["false"] = "drop";
    var type1 = {};
    type1["1"] = "roadrunner";
    type1["2"] = "shadowfax";
  
   for(var i=0;i<x.DriverDetails.length;i++){
      x.DriverDetails[i].new_trip=type[x.DriverDetails[i].new_trip];
      x.DriverDetails[i].logistics=type1[x.DriverDetails[i].logistics];
    }
  $scope.data=x;
})


.controller('ModalInstanceCtrl1', function ($cookieStore,$state,$http,$scope,$uibModalInstance, x) {
  $scope.data=x;
  var URL = 'http://fabfresh-dev.elasticbeanstalk.com';
  $scope.ok = function () {
    $scope.order = {
        "status": "0"
    };
    $http({
      method  : 'PATCH',
      url     : URL+'/orders/'+x.id+'/',
      data    : $scope.order,
      headers : {'Content-Type': 'application/json', 'Authorization': 'Bearer '+$cookieStore.get('key')}//$rootScope.access_token} } 
     })
      .success(function(data) {
        if (data.errors) {
          alert("Some error occured");
        }
        else {
          alert("Order is successfully cancelled.");
          $state.go($state.current, {}, {reload: true});
        }
      });
      $uibModalInstance.close("");
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})



.controller('ModalInstanceCtrl2', function ($cookieStore,$state,$http,$scope,$uibModalInstance, x) {
  $scope.data=x;
  var URL = 'http://fabfresh-dev.elasticbeanstalk.com';
  $scope.ok = function () {
    $scope.order = {
        "status": "12"
    };
    $http({
      method  : 'PATCH',
      url     : URL+'/orders/'+x.id+'/',
      data    : $scope.order,
      headers : {'Content-Type': 'application/json', 'Authorization': 'Bearer '+$cookieStore.get('key')}//$rootScope.access_token} } 
     })
      .success(function(data) {
        if (data.errors) {
          alert("Some error occured");
        }
        else {
          alert("Order status is changed to completed.");
          $state.go($state.current, {}, {reload: true});
        }
      });
      $uibModalInstance.close("");
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
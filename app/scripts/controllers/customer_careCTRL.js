'use strict';


routerApp
  .controller('customer_careCTRL', function( $state,$cookies,$uibModal, $rootScope,$scope, $http,service) {
    if(angular.isUndefined($cookies.get('token'))){
        $state.go('login');
        alert("Please login to continue");
        return;
      }
    $scope.user = [];
    $scope.nameFilter = null;
    $scope.ordersList = [];

    service.getLiveOrders()
        .then(function(response){
          var data=response;
          var type={"0":"Wash & Iron","1":"Wash & Fold","2":"Iron"};
          var type1={"1":"created","2":"pickup","11":"drop"};
          var update2={"1":"Reassign..?","11":"Reassign..?"};
          var colour={"1":"#CADFBE","2":"#9FCCFF","11":"#6AB97F"};

          var data1=[];
          data.pickup_count=0;
          data.drop_count=0;
          data.all_count=0;
          for(var i=0;i<data.length;i++){
              if(data[i].status==2 || data[i].status==1)
                data.pickup_count+=1;
              else if(data[i].status==11)
                data.drop_count+=1;
              data.all_count+=1;
              data[i].created_at_time= new Date(data[i].created_at_time);
              if(data[i].modified_at_time)
                data[i].modified_at_time= new Date(data[i].modified_at_time);
              else
                data[i].modified_at_time=data[i].created_at_time;
              data[i].reassign=update2[data[i].status]; 
              data[i].clr=colour[data[i].status];
              data[i].order_type=type[data[i].order_type];
              data[i].status=type1[data[i].status];
              if(!data[i].coupon)
                data[i].coupon="NA";
              if(data[i].amount!=null && data[i].afterDiscount==null)
                   data[i].afterDiscount=data[i].amount;
              if(data[i].coupon==null)
                data[i].coupon="NA";
                data1.push(data[i]);
          }

          data1.pickup_count=data.pickup_count;
          data1.drop_count=data.drop_count;
          data1.all_count=data.all_count;
          $rootScope.customer_care_data=data1;
          
        },function(error){
            alert("Error getting orders");
        });


      function parseDate(str) {
        var input=str.split(',');
        var part = input[0].split(':');
        var parts = input[1].split('-');
        return new Date(parts[2], parts[1]-1, parts[0],part[0],part[1]); 
      }

      $scope.nameFilter1=true;
      $scope.nameFilter2=true;
      $scope.nameFilter3=false;

      $scope.searchFilter = function (x) {
        var re = new RegExp($scope.nameFilter, 'i');
        return !$scope.nameFilter || re.test(x.id) ;
      };

      $scope.from=new Date("01 01, 2016 00:00:00");
      $scope.to=new Date();
      $scope.to.setDate($scope.to.getDate()+1);
      $scope.to.setHours('0');
      $scope.to.setMinutes('0');
      $scope.to.setSeconds('0');
      

      $scope.searchFilter1 = function (x) {
        if( $scope.nameFilter3)
          return true;
        if( !$scope.nameFilter1 && !$scope.nameFilter2)
          return false;
        if( $scope.nameFilter1 && $scope.nameFilter2)
          return true;
        var re = new RegExp("pickup", 'i');
        var re1 = new RegExp("created", 'i');
        var re2= new RegExp("drop", 'i');
        if($scope.nameFilter1)
          return re.test(x.status) || re1.test(x.status);
        else
          return re2.test(x.status) ;
      };

      $scope.searchFilter2 = function (x) {

           if( x.created_at_time >= $scope.from && x.created_at_time <= $scope.to)
               return true;
           else
              return false;
      };
    
      $scope.stringToColor = function(str) {
        return str;
      };
      
      
      $scope.getColor = function(str) {
        var date=new Date();
        var hours=str.getHours();
        var minutes=str.getMinutes();
        var year=str.getFullYear();
        var month=str.getMonth();
        var day=str.getDay();
        //console.log(day+" "+month+" "+year+", "+hours+":"+minutes);
        //console.log(date.getDay()+" "+date.getMonth()+" "+date.getFullYear()+", "+date.getHours()+":"+date.getMinutes());
        var color="";
        if(year<date.getFullYear())
          color="red";
        else if(month<date.getMonth())
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

      $scope.if_created = function (x) {
        return x.status=='created';
      }

      $scope.open = function (x) {
        if($scope.p==1){
          $scope.p=0;
          return;
        }
        
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


      $scope.update_order = function (x,size) {
            var modalInstance1 = $uibModal.open({
              templateUrl: 'views/modify_order.html',
              controller: 'ModalInstanceCtrl1',
              size: size,
              resolve: {
                  x: function () {
                    return x;
                  }
              }
            });
      };

      
      $scope.reassign = function (x,size) {
            $scope.p=1;
            if(x.status=='created')
              x.chr='p';
            else if(x.status=='drop')
              x.chr='d';
            var modalInstance1 = $uibModal.open({
              templateUrl: 'views/reassign.html',
              controller: 'ModalInstanceCtrl4',
              size: size,
              resolve: {
                  x: function () {
                    return x;
                  }
              }
            });
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



.controller('ModalInstanceCtrl1', function ($uibModal,$cookies,$state,$http,$scope,$uibModalInstance, x) {
  $scope.cancel_order = function (size) {
    var modalInstance1 = $uibModal.open({
        templateUrl: 'views/cancel_order.html',
        controller: 'ModalInstanceCtrl2',
        size: size,
        resolve: {
            x: function () {
              return x;
            }
        }
      });
    $uibModalInstance.close("");
  };
  $scope.update_order = function (size) {

    if(x.status=='created'){
      x.change_to='2';
      x.change_to_status='pickup';
    }
    else if(x.status=='drop'){
      x.change_to='12';
      x.change_to_status='completed';
    }
    var modalInstance1 = $uibModal.open({
        templateUrl: 'views/update_order.html',
        controller: 'ModalInstanceCtrl3',
        size: size,
        resolve: {
            x: function () {
              return x;
            }
        }
      });
    $uibModalInstance.close("");
  };
   $scope.if_drop = function () {
        return x.status=='drop';
    }
    $scope.if_pickup = function () {
        return x.status=='pickup';
    }

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})



.controller('ModalInstanceCtrl2', function ($rootScope,$cookies,$state,$http,$scope,$uibModalInstance, x,service) {
  $scope.data=x;
  $scope.ok = function () {
    service.cancelOrder(x.id,$scope.remarks)
        .then(function(response){
          alert("Order is successfully cancelled.");
          service.getLiveOrders()
        .then(function(response){
          var data=response;
          var type={"0":"Wash & Iron","1":"Wash & Fold","2":"Iron"};
          var type1={"1":"created","2":"pickup","11":"drop"};
          var update2={"1":"Reassign..?","11":"Reassign..?"};
          var colour={"1":"#CADFBE","2":"#9FCCFF","11":"#6AB97F"};

          var data1=[];
          data.pickup_count=0;
          data.drop_count=0;
          data.all_count=0;
          for(var i=0;i<data.length;i++){
              if(data[i].status==2 || data[i].status==1)
                data.pickup_count+=1;
              else if(data[i].status==11)
                data.drop_count+=1;
              data.all_count+=1;
              data[i].created_at_time= new Date(data[i].created_at_time);
              if(data[i].modified_at_time)
                data[i].modified_at_time= new Date(data[i].modified_at_time);
              else
                data[i].modified_at_time=data[i].created_at_time;
              data[i].reassign=update2[data[i].status]; 
              data[i].clr=colour[data[i].status];
              data[i].order_type=type[data[i].order_type];
              data[i].status=type1[data[i].status];
              if(!data[i].coupon)
                data[i].coupon="NA";
              if(data[i].amount!=null && data[i].afterDiscount==null)
                   data[i].afterDiscount=data[i].amount;
              if(data[i].coupon==null)
                data[i].coupon="NA";
                data1.push(data[i]);
          }
          
          data1.pickup_count=data.pickup_count;
          data1.drop_count=data.drop_count;
          data1.all_count=data.all_count;
          $rootScope.customer_care_data=data1;

          
          },function(error){
              alert("Error getting orders");
          });
          
        },function(error){
            alert("Some Error occured");
        });
      $uibModalInstance.close("");
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})



.controller('ModalInstanceCtrl3', function ($rootScope,$cookies,$state,$http,$scope,$uibModalInstance, x,service) {
  $scope.data=x;
  $scope.ok = function () {
    service.updateOrder(x.id,x.change_to)
        .then(function(response){
          alert("Order status is changed to "+x.change_to_status+".");
          service.getLiveOrders()
        .then(function(response){
          var data=response;
          var type={"0":"Wash & Iron","1":"Wash & Fold","2":"Iron"};
          var type1={"1":"created","2":"pickup","11":"drop"};
          var update2={"1":"Reassign..?","11":"Reassign..?"};
          var colour={"1":"#CADFBE","2":"#9FCCFF","11":"#6AB97F"};

          var data1=[];
          data.pickup_count=0;
          data.drop_count=0;
          data.all_count=0;
          for(var i=0;i<data.length;i++){
              if(data[i].status==2 || data[i].status==1)
                data.pickup_count+=1;
              else if(data[i].status==11)
                data.drop_count+=1;
              data.all_count+=1;
              data[i].created_at_time= new Date(data[i].created_at_time);
              if(data[i].modified_at_time)
                data[i].modified_at_time= new Date(data[i].modified_at_time);
              else
                data[i].modified_at_time=data[i].created_at_time;
              data[i].reassign=update2[data[i].status]; 
              data[i].clr=colour[data[i].status];
              data[i].order_type=type[data[i].order_type];
              data[i].status=type1[data[i].status];
              if(!data[i].coupon)
                data[i].coupon="NA";
              if(data[i].amount!=null && data[i].afterDiscount==null)
                   data[i].afterDiscount=data[i].amount;
              if(data[i].coupon==null)
                data[i].coupon="NA";
                data1.push(data[i]);
          }
          
          data1.pickup_count=data.pickup_count;
          data1.drop_count=data.drop_count;
          data1.all_count=data.all_count;
          $rootScope.customer_care_data=data1;

          
          },function(error){
              alert("Error getting orders");
          });
          
        },function(error){
            alert("Some Error occured");
        });
      $uibModalInstance.close("");
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})




.controller('ModalInstanceCtrl4', function ($cookies,$state,$http,$scope,$uibModalInstance, x,service) {
  $scope.ok = function () {
    service.reassign(x.id,x.chr)
        .then(function(response){
          alert("Order is Reassigned.");
          
        },function(error){
            alert("Some Error occured");
        });
      $uibModalInstance.close("");
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});


'use strict'

angular.module('routerApp')
 .service('service',function service($http,$q,$rootScope,$cookies){ 
  var URL = 'http://fabfresh.elasticbeanstalk.com';
  $http.defaults.headers.common.Authorization = 'Bearer '+ $cookies.get('token');
  $http.defaults.headers.post["Content-Type"] = "application/json";
  $http.defaults.headers.patch["Content-Type"] = "application/json";
  var service = this;
      service.taskList = {};


  service.getOrder= function(id){

    var deferOrder = $q.defer();
     $http({
      method  : 'GET',
      url     : URL+'/orders/'+id+'/',
     })
    .success(function(response){
        deferOrder.resolve(response);
    })
    .error(function(error,status){
      deferOrder.reject(error);
    })

   return deferOrder.promise
  };

  service.getReport= function(min_date1,max_date1){
    //console.log(min_date1);
    //console.log(max_date1);
    var deferOrder = $q.defer();
     $http({
      method  : 'GET',
      url     : URL+'/v1/order/report/',
      params : {min_date:min_date1,max_date:max_date1}
     })
    .success(function(response){
        deferOrder.resolve(response);
    })
    .error(function(error,status){
      deferOrder.reject(error);
    })

   return deferOrder.promise
  };

  service.getOrderByStatus= function(status){
    var deferotp = $q.defer();
    $http({
        url : URL + '/orders/?status='+status,
        method : 'GET'
    })
    .success(function(response){
        //console.log(response);
        deferotp.resolve(response);
    })
    .error(function(error){
      deferotp.reject(error);
    })

   return deferotp.promise;
  };

    service.getLiveOrders= function(){
      $http.defaults.headers.common.Authorization = 'Bearer '+ $cookies.get('token');
    var deferOrder = $q.defer();
     $http({
      method  : 'GET',
      url     : URL+'/order/live/'
     })
    .success(function(response){
        deferOrder.resolve(response);
    })
    .error(function(error,status){
      deferOrder.reject(error);
    })

   return deferOrder.promise;
  };

  service.getFinanceOrders= function(){
    var deferOrder = $q.defer();
     $http({
      method  : 'GET',
      url     : URL+'/v1/order/finance/'
      //headers : {'Authorization': 'Bearer '+$cookies.get('token')} 
     })
    .success(function(response){
        deferOrder.resolve(response);
    })
    .error(function(error,status){
      deferOrder.reject(error);
    })

   return deferOrder.promise;
  };

  service.getFinanceOrdersByDate= function(min_date1,max_date1){
    //console.log(min_date1);
    //console.log(max_date1);
    var deferOrder = $q.defer();
     $http({
      method  : 'GET',
      url     : URL+'/v1/order/finance/',
      params : {min_date:min_date1,max_date:max_date1}
      //headers : {'Authorization': 'Bearer '+$cookies.get('token')} 
     })
    .success(function(response){
        deferOrder.resolve(response);
    })
    .error(function(error,status){
      deferOrder.reject(error);
    })

   return deferOrder.promise;
  };

  service.updateOrder= function(id,status1){
    var deferotp = $q.defer();
    var order = {
        "status": status1
    };
    $http({
      method  : 'PATCH',
      url     : URL+'/orders/'+id+'/',
      data    : order
     })
    .success(function(response){
        deferotp.resolve(response);
    })
    .error(function(error){
      deferotp.reject(error);
    })

   return deferotp.promise
  };

  service.cancelOrder= function(id,remark1){
    var deferotp = $q.defer();
    var order = {
        "status": "0",
        "remark":remark1
    };
    $http({
      method  : 'PATCH',
      url     : URL+'/orders/'+id+'/',
      data    : order
     })
    .success(function(response){
        deferotp.resolve(response);
    })
    .error(function(error){
      deferotp.reject(error);
    })

   return deferotp.promise
  };

  service.reassign= function(id,chr){
    var deferotp = $q.defer();
    $http({
      method  : 'GET',
      url     : URL+'/v1/reassign/'+id+chr+'/'
     })
    .success(function(response){
        deferotp.resolve(response);
    })
    .error(function(error){
      deferotp.reject(error);
    })

   return deferotp.promise
  };





    service.login = function(us){
      var deferl = $q.defer();
      $http({
      method  : 'POST',
      url     : URL+'/users/login/',
      data    : us,
      headers : {'Content-Type': 'application/json'} 
     })
      .success(function(response){
        deferl.resolve(response);
    })
    .error(function(error,status){
      deferl.reject(error);
    })

    return deferl.promise

    };

    service.getClothInfo = function() {
    var deferredType = $q.defer();
    return $http({
        url : URL + '/cloth/info/',
        method : 'GET'
    })
      .then(function(response){
        deferredType.resolve(response.data);
                    return deferredType.promise;
                },function(response){
        deferredType.reject(response);
                    return deferredType.promise;      
      });
  };

    service.getClothType = function() {
    var deferredType = $q.defer();
    return $http({
        url : URL + '/cloth/type/',
        method : 'GET'
    })
      .then(function(response){
        deferredType.resolve(response.data);
                    return deferredType.promise;
                },function(response){
        deferredType.reject(response);
                    return deferredType.promise;      
      });
  };


  service.getClothBrand = function() {
    var deferredBrand = $q.defer();
    return $http({
        url : URL + '/cloth/brand/',
        method : 'GET'
    })
      .then(function(response){
        deferredBrand.resolve(response.data);
                    return deferredBrand.promise;
                },function(response){
        deferredBrand.reject(response);
                    return deferredBrand.promise;      
      });
  };  

  service.getClothColor = function() {
    var deferredColor = $q.defer();
    return $http({
        url : URL + '/cloth/color/',
        method : 'GET'
    })
      .then(function(response){
        deferredColor.resolve(response.data);
                    return deferredColor.promise;
                },function(response){
        deferredColor.reject(response);
                    return deferredColor.promise;      
      });
  };

  //For Size
  service.getClothSize = function() {
    var deferredSize = $q.defer();
    return $http({
        url : URL + '/cloth/size/',
        method : 'GET'
    })
      .then(function(response){
        deferredSize.resolve(response.data);
                    return deferredSize.promise;
                },function(response){
        deferredSize.reject(response);
                    return deferredSize.promise;      
      });
  };







    return service;
 });

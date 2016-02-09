'use strict';


routerApp
  .controller('homepageCTRL', function($rootScope,$scope, $http) {
    $scope.user = [];
    $scope.nameFilter = null;
    $scope.ordersList = [];


    

    var URL = 'http://fabfresh-dev.elasticbeanstalk.com';
    $http({
      method  : 'GET',
      url     : URL+'/orders/',
      headers : {'Authorization': 'Bearer '+'hari'}//$rootScope.access_token} 
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
          type1["0"] = "cancelled";
          type1["1"] = "created";
          type1["2"] = "pickup";
          type1["3"] = "receivedAtCenter";
          type1["4"] = "precheck";
          type1["5"] = "tagging";
          type1["6"] = "wash";
          type1["7"] = "dry";
          type1["8"] = "iron";
          type1["9"] = "package";
          type1["10"] = "shipped";
          type1["11"] = "drop";
          type1["12"] = "completed";

          var type = {};
          type["0"] = "Wash";
          type["1"] = "Iron";
          type["2"] = "Wash and Iron";

          var colour = {};
          colour["0"] = "#000000";
          colour["1"] = "#987654";
          colour["2"] = "#9FCCFF";
          colour["3"] = "#EA3865";
          colour["4"] = "#F3A718";
          colour["5"] = "#73D1F3";
          colour["6"] = "#DFA938";
          colour["7"] = "#83FCB1";
          colour["8"] = "#29C3BA";
          colour["9"] = "#BC4532";
          colour["10"] = "#A49340";
          colour["11"] = "#6AB97F";
          colour["12"] = "#000000";
          var d=new Date();
          //alert(data[0].created_at_time);
          var data1=[];
          for(var i=0;i<data.length;i++){
              if(data[i].status==2 || data[i].status==11){
                data[i].clr=colour[data[i].status];
                data[i].order_type=type[data[i].order_type];
                data[i].status=type1[data[i].status];
                var str=data[i].created_at_time;
                data[i].created_at_time=str.substring(11, 16)+", "+str.substring(0, 10);
                if(data[i].amount==null)
                      data[i].amount=0;
                if(data[i].afterDiscount==null)
                     data[i].afterDiscount=0;
                if(data[i].weight==null)
                     data[i].weight=0;
                if(data[i].quantity==null)
                     data[i].quantity=0;
                if(data[i].rating==null)
                     data[i].rating="NA";
                if(data[i].coupon==null)
                     data[i].coupon="NA";
                data1.push(data[i]);
              }
          }
          $scope.data=data1;

        }
      });

      $scope.searchFilter = function (x) {
        var re = new RegExp($scope.nameFilter, 'i');
        return !$scope.nameFilter || re.test(x.id) ;
      };
      $scope.searchFilter1 = function (x) {
        var re = new RegExp($scope.nameFilter1, 'i');
        return !$scope.nameFilter1 || re.test(x.status) ;
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
});
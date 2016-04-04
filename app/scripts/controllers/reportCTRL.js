'use strict';


routerApp
  .controller('reportCTRL', function($cookies, $rootScope,$scope, $http, $state,service) {
    var context;
    var clientsChart;
    $scope.from=new Date();
    $scope.to=new Date();
    $scope.to.setHours("00");
    $scope.to.setMinutes("00");
    $scope.to.setSeconds("00");
    $scope.ordersList = [];
    $scope.to.setDate($scope.to.getDate()+1);
    service.getReport(getDate1($scope.from),getDate1($scope.to))
          .then(function(response){
            var count1=[0,0,0,0,0,0,0,0,0,0,0,0,0];
            for(var i=0;i<response.length;i++)
              count1[parseInt(response[i].status)]++;

            var barData = {
                labels: ["cancelled", "created", "pickup", "received", "precheck", "tagging", "wash", "dry", "iron","package", "shipped", "drop", "completed"],
                  datasets: [
                        {
                            label: 'count',
                            fillColor: '#000',
                            data: count1
                        },
                            ]
            };
            context = document.getElementById('report_status').getContext('2d');
            clientsChart = new Chart(context).Bar(barData); 



          },function(error){
              alert("Error Getting Report");
          });


    $scope.searchByDate=function(){
      service.getReport(getDate1($scope.from),getDate1($scope.to))
          .then(function(response){
            var count1=[0,0,0,0,0,0,0,0,0,0,0,0,0];
            for(var i=0;i<response.length;i++)
              count1[parseInt(response[i].status)]++;

            var barData = {
                labels: ["cancelled", "created", "pickup", "received", "precheck", "tagging", "wash", "dry", "iron","package", "shipped", "drop", "completed"],
                  datasets: [
                        {
                            label: 'count',
                            fillColor: '#000',
                            data: count1
                        },
                            ]
            };
            clientsChart.destroy();
            context = document.getElementById('report_status').getContext('2d');
            clientsChart = new Chart(context).Bar(barData); 

          },function(error){
              alert("Error Getting Report");
          });
        };




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
});

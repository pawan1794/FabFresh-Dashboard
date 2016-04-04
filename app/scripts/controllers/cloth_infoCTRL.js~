'use strict'

routerApp
    .controller('cloth_infoCTRL', function ($cookies, $rootScope,$scope, $http,service) {

    service.getClothInfo()
        .then(function(data){
          //console.log(data);
            $scope.data = data;
            $scope.aa = [];
            var male = 0;
            var female = 0;
             for(var i= 0; i < data.length; i++) {
                if(data[i].gender == "male")
                  male++;
                else
                female++;

             if($scope.aa[data[i].brand] == null)
               $scope.aa[data[i].brand] = 1;
             else
               $scope.aa[data[i].brand]++
           }
           var value = [];
           for(var k = 0; k < $scope.arr.length; k++) {
             if($scope.aa[$scope.arr[k]] > 0)
                 value[k]= $scope.aa[$scope.arr[k]];
             else 
                 value[k]=0;
           }

          var brandarray = [];
          brandarray = $scope.arr;
          var barData = {
              labels: brandarray,
                datasets: [
                      {
                          label: 'count',
                          fillColor: '#000',
                          data: value
                      },
                          ]
          };
          var context = document.getElementById('brand').getContext('2d');
          var clientsChart = new Chart(context).Bar(barData);  

          $scope.saa = [];
               for(var i= 0; i < data.length; i++) {
               if($scope.saa[data[i].size] == null)
                 $scope.saa[data[i].size] = 1;
               else
                 $scope.saa[data[i].size]++
             }
             var svalue = [];
             for(var k = 0; k < $scope.sarr.length; k++) {
               if($scope.saa[$scope.sarr[k]] > 0)
                   svalue[k]= $scope.saa[$scope.sarr[k]];
               else 
                   svalue[k]=0;
             }
          var sizearray = [];
          sizearray = $scope.sarr;
          var barData = {
              labels: sizearray,
                datasets: [
                      {
                          label: 'count',
                          fillColor: '#000',
                          data: svalue
                      },
                          ]
          };
          var context = document.getElementById('size').getContext('2d');
          var clientsChart = new Chart(context).Bar(barData);

             $scope.taa = [];
             for(var i= 0; i < data.length; i++) {
             if($scope.taa[data[i].type] == null)
               $scope.taa[data[i].type] = 1;
             else
               $scope.taa[data[i].type]++
           }
           var tvalue = [];
           for(var k = 0; k < $scope.tarr.length; k++) {
             if($scope.taa[$scope.tarr[k]] > 0)
                 tvalue[k]= $scope.taa[$scope.tarr[k]];
             else 
                 tvalue[k]=0;
           }
          var typearray = [];
          typearray = $scope.tarr;
          var barData = {
              labels: typearray,
                datasets: [
                      {
                          label: 'count',
                          fillColor: '#000',
                          data: tvalue
                      },
                          ]
          };
          var context = document.getElementById('type').getContext('2d');
          var clientsChart = new Chart(context).Bar(barData);

               $scope.caa = [];
               for(var i= 0; i < data.length; i++) {
               if($scope.caa[data[i].color] == null)
                 $scope.caa[data[i].color] = 1;
               else
                 $scope.caa[data[i].color]++
             }
             var cvalue = [];
             for(var k = 0; k < $scope.carr.length; k++) {
               if($scope.caa[$scope.carr[k]] > 0)
                   cvalue[k]= $scope.caa[$scope.carr[k]];
               else 
                   cvalue[k]=0;
             }
          var colorarray = [];
          colorarray = $scope.carr;
          var barData = {
              labels: colorarray,
                datasets: [
                      {
                          label: 'count',
                          fillColor: '#000',
                          data: cvalue
                      },
                          ]
          };
          var context = document.getElementById('color').getContext('2d');
          var clientsChart = new Chart(context).Bar(barData);  

          var pieData = [
              {  
                 label:"Male",
                 value: male,
                 color:"#333"
              },
              {
                label:"Female",
                value : female,
                color : "#000"
              }
          ];

          var pieOptions = {
            segmentShowStroke : false,
            animateScale : true
          }
          var context = document.getElementById('gender').getContext('2d');
          var clientsChart = new Chart(context).Pie(pieData,pieOptions);  
        },function(error){
            alert("Error Getting Cloth Brand");
        });


      service.getClothBrand()
        .then(function(response){
           $scope.arr = [];
           for(var j = 0; j < response.length; j++)
            if(response[j].brand_name!="OTHERS")
             $scope.arr[j] = response[j].brand_name;
        },function(error){
            alert("Error Getting Cloth Brand");
        });

     service.getClothColor()
        .then(function(response){
           $scope.carr = [];
           for(var j = 0; j < response.length; j++)
             $scope.carr[j] = response[j].color_name;
        },function(error){
            alert("Error Getting Cloth Color");
        });



     service.getClothType()
        .then(function(response){
           $scope.tarr = [];
           for(var j = 0; j < response.length; j++)
             $scope.tarr[j] = response[j].type_name;
        },function(error){
            alert("Error Getting Cloth Type");
        });


     service.getClothSize()
        .then(function(response){
          $scope.sarr = [];
         for(var j = 0; j < response.length; j++)
           $scope.sarr[j] = response[j].size_name;
        },function(error){
            alert("Error Getting Cloth Size");
        });
});
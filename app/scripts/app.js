'use strict';

var routerApp = angular.module('routerApp', [
    'ui.router',
    'Login.services',
    'ngAnimate',
    'ui.bootstrap',
    ]);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        .state('login', {
            url: '/#',
            templateUrl: '../views/login.html',
            controller: 'loginCTRL',
        })
        .state('homepage', {
            url: '/homepage',
            templateUrl: '../views/homepage.html',
            controller: 'homepageCTRL',
        })
});

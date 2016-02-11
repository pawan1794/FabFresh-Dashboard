'use strict';

var routerApp = angular.module('routerApp', [
    'ui.router',
    'Login.services',
    'ngAnimate',
    'ui.bootstrap',
    'ngCookies',
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
            url: '/#',
            templateUrl: '../views/homepage.html',
            controller: 'homepageCTRL',
        })
        .state('logout', {
            url: '/#',
            //template: '<h1>BYE<h1>',
            controller: 'logoutCTRL',
        })
});

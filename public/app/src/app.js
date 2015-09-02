(function () {
	angular.module('nithStory', ['authService', 'MainCtrlModule', 'appRoutes', 'userCtrl', 'userService'])
	.config(function($httpProvider){
		$httpProvider.interceptors.push('AuthInterceptor');
	});



})();
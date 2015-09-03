(function () {
	angular.module('nithStory', ['authService', 'MainCtrlModule', 'appRoutes', 'userCtrl', 'userService', 'storyCtrl','storyServiceModule'])
	.config(['$httpProvider',function($httpProvider){
		$httpProvider.interceptors.push('AuthInterceptor');
	}]);



})();
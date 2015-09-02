(function(){

	angular.module('appRoutes',['ngRoute'])

		.config(['$routeProvider', '$locationProvider' ,function($routeProvider, $locationProvider){
			$routeProvider
				.when('/', {
					templateUrl: 'app/src/views/pages/home.html',
					
				})
				.when('/login', {
					templateUrl: 'app/src/views/pages/login.html',
					controller: 'MainCtrl as vm'
				})
				.when('/signup', {
					templateUrl : 'app/src/views/pages/signup.html',
					controller: 'userCreateCtrl as vm'
				});
			
		}]);

})();
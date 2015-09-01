(function(){

	angular.module('appRoutes',['ngRoute'])

		.config(['$routeProvider', '$locationProvider' ,function($routeProvider, $locationProvider){
			$routeProvider
				.when('/', {
					templateUrl: 'app/src/views/pages/home.html',

				});
		}]);

})();
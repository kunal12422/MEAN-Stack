(function(){
	angular.module('userService', [])

	.factory('userService', ['$http', function($http){

		var create = function(userData){
			return $http.post('/api/signup', userData);
		};

		var all = function(){
			return $http.get('/api/users'); 
		};

		return {
			create: create,
			all: all
		};
	}]);



})();
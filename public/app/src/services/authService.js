(function(){

	angular.module('authService', [])


	.factory('Auth', ['$http', '$q', 'AuthToken', function($http, $q, AuthToken){

		var login = function(username, password){
			return $http.post('/api/login', {
				username: username,
				password: password
			})

			.success(function(data){
				AuthToken.setToken(data.token);
				return data;
			});
		};			

		var logout = function(){
			AuthToken.setToken();
		};

		var isLoggedIn = function(){
			if(AuthToken.getToken())
				return true;
			else 
				return false;
		};

		var getUser = function(){

			if(AuthToken.getToken())
				return $http.get('/api/me');
			else
				return $q.reject({message: "User has no token"});
		};

		return {
			login: login,
			logout: logout,
			isLoggedIn: isLoggedIn,
			getUser: getUser
		};

	}])

	.factory('AuthToken', ['$window', function($window){

	
		var getToken = function(){
			return $window.localStorage.getItem('token');
		};

		var setToken = function(token){
			if(token){
				$window.localStorage.setItem('token', token);
			}else{
				$window.localStorage.removeItem('token');
			}
		};


		return {
			getToken: getToken,
			setToken: setToken
		};	
	}])

	.factory('AuthInterceptor', ['$q', '$location', 'AuthToken', function($q, $location, AuthToken){

		var request = function(config){
			var token = AuthToken.getToken();

			if(token){
				config.headers['x-access-token'] = token;
			}
			 

			return config;
		};

		var responseError = function(response){

			if(response.status == 403){
				$location.path('/login');
			}

			return $q.reject(response);
		};

		return {
			request: request,
			responseError: responseError
		};
	}]);


})();
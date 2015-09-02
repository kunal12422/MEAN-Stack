(function(){
	angular.module('userCtrl', ['userService'])
	.controller('userCtrl', ['userService', function(userService){
		var vm = this;

		userService.all()
					.success(function(data){
						vm.users = data;
					});

	}])

	.controller('userCreateCtrl', ['userService', '$location', '$window', function(userService, $location, $window){
		var vm = this;
		vm.signupUser = function(){
			vm.message = '';
			userService.create(vm.userData)
				.then(function(response){
					vm.userData = {};
					vm.message = response.data.message;
					$window.localStorage.setItem('token', response.data.token);
					$location.path('/');
				});
		};
	}]);

})();
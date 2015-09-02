(function(){
	angular.module('MainCtrlModule', [])

	.controller('MainCtrl', ['$rootScope','$location', 'Auth', function($rootScope, $location, Auth){

		var vm = this;
		vm.loginData = {
			username: '',
			password: ''
		};

		vm.loggedIn = Auth.isLoggedIn();
		
		$rootScope.$on('$routeChangeStart', function(){
			vm.loggedIn = Auth.isLoggedIn();

			Auth.getUser()
				.then(function(data){
					
					vm.user = data.data;
				}) ;
		});

		vm.doLogin = function(){
			vm.processing = true;
			vm.error = '';
			Auth.login(vm.loginData.username, vm.loginData.password)
				.success(function(data){
					
					vm.processing = false;

					Auth.getUser()
						.then(function(data){
						
							vm.user = data.data;
					});
						if(data.success){
						
							vm.loginData.username = '';
							vm.loginData.password = '';
							$location.path('/');

						}
							
						else
							vm.error = data.message;

				});
		};

		vm.doLogout = function(){
			 vm.loggedIn =  Auth.isLoggedIn();
			Auth.logout();
			$location.path('/login');
			
		};

	}]);

	

})();
(function(){
	angular.module('storyServiceModule', [])

	.factory('storyService', ['$http', function($http){
		
		var allUsersStory = function(){
			return $http.get('/api/all_stories');
		};

		var create = function(storyData){
			return $http.post('/api', storyData);
		};

		var allStory = function(){
			return $http.get('/api');
		};

		return {
			create: create,
			allStory: allStory,
			allUsersStory: allUsersStory
		};
	}])

	.factory('socketio', ['$rootScope', function($rootScope){
		var socket = io.connect();
		return {
			on : function(eventName, callback){
					socket.on(eventName, function(){
						var args = arguments;
						$rootScope.$apply(function(){
							callback.apply(socket,args);
						});
					});
			},

			emit: function(eventName, data, callback){
					socket.emit(eventName,data,function(){
						var args = arguments;
						$rootScope.apply(function(){
							if(callback){
								callback.apply(socket, args);
							}
						});
					});
			}
		};
	}]);
})();
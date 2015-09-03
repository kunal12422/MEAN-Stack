(function(){

	angular.module('storyCtrl', ['storyServiceModule'])
	.controller('storyCtrl', ['storyService', 'socketio',function(storyService, socketio){
		var vm = this;
		storyService.allStory()
			.success(function(data){
				vm.stories = data;
			});

			vm.createStory = function(){
				vm.message = '';
				storyService.create(vm.storyData)
					.success(function(data){
						vm.storyData = '';
						vm.message = data.message;
						
					});
			};

			socketio.on('story', function(data){
				vm.stories.push(data);
			});
	}])
	.controller('AllStoriesCtrl', ['stories', 'socketio', function(stories, socketio){
		var vm = this;
		vm.stories = stories.data;
		socketio.on('story', function(data){
			vm.stories.push(data);
		});
	}]);
})();
var User = require('../models/user');
var Story =  require('../models/story');
var config = require('../../config');
var secretKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');

function createToken(user){
	var token = jsonwebtoken.sign({
		id: user._id,
		name: user.name,
		username:user.username
	}, secretKey, {
		expiresInMinute: 1440
	});

	return token;
}

module.exports = function(app, express){
	var api = express.Router();

	api.post('/signup', function(req, res){
		var user = new User({
			name:req.body.name,
			username:req.body.username,
			password:req.body.password
		});
		var token = createToken(user);

		user.save(function(err){
			if(err){
				res.send(err);
				return;
			}
				
			res.json({
				success:true,
				message: "User has been created!",
				token: token
			});


		});
	});

	api.get('/users', function(req, res){

		User.find({}, function(err, users){
			if(err){
				res.send(err);
				return;
			}

			res.json(users);

		});
	});

	api.post('/login', function(req, res){

		User.findOne({
			username: req.body.username
		}).select('name username password').exec(function(err, user){
			if(err) throw err;

			if(!user){
				res.send({message: "User doesnot exist"});
			}else if(user){
				var validPassword = user.comparePassword(req.body.password);
				
				if(!validPassword){
				
					res.send({message: "Invalid password"});
				
				}else{
					///token

					var token = createToken(user);

					res.json({
						success: true,
						message: "Successfuly login!",
						token: token
					});
				}
			}
		});
	});

	///To check whether a user is logged in or not //**middleware**//

	api.use(function(req, res, next){

		var token = req.body.token || req.param('token') || req.headers['x-access-token'];

		if(token){
			jsonwebtoken.verify(token, secretKey, function(err, decoded){

				if(err){
					res.status(403).send({success:false, message:"Failed to authenticate"});
				}else {

					req.decoded = decoded;

					next();	/// Move to next Destination code
				}

			});
		}else{
			res.status(403).send({success:false, message: "No token provided"});

		}
	});

	api.route('/')
		.post(function(req, res){
			var story = new Story({
				creator: req.decoded.id,	
				content: req.body.content
			});

			story.save(function(err){

				if(err){
					res.send(err);
					return;
				}
				res.json({message:"New nith story created!"});
			});
		})
		.get(function(req, res){

			Story.find({creator: req.decoded.id}, function(err, stories){
				if(err){
					res.send(err);
					return;
				}
				res.json(stories);
			});
		});

		api.get('/me', function(req, res){
			///required for the front end, since middleware can't be accessed from front-end; require seperate api....
			res.json(req.decoded);
		});

	return api;
};
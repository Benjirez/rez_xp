var dbcreds = require('../../dbcreds');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extend: false});

mongoose.connect('mongodb://'+ dbcreds.user +':' + dbcreds.pw + '@ds051913.mlab.com:51913/rezdb');
var model1 = mongoose.model('rez2_collection1', mongoose.Schema({item: String}) ); //todoModel
var model2 = mongoose.model('rez2_collection2', mongoose.Schema({item: String}) ); //todoModel
//var data = [{item: 'get blue milk'}, {item: "re-attach 3PO's arm"}, {item: 'pickup power converters at toshi station'}];

module.exports = function(xsvr){

	// get todo data and render view
	xsvr.get('/', function(req, res){
		var data = model1.find({}, function(err, data){
			if (err) throw err;
			//console.log('into the shoot flyboy');
			//res.render('view1', {todos: data, todos2: data2});
			
			var data2 = model2.find({}, function(err, data2){
			if (err) throw err;
			//console.log('into the shoot flyboy');
			res.render('view1', {todos: data, todos2: data2});
			
		});
		
		
		});
		

		console.log('controller1 called');
	});

	//create new todoModel with data from req.body, push to db, reload view
	xsvr.post('/', urlencodedParser, function(req, res){
		var newTodo = model1(req.body).save(function(err, data){
			if (err) throw err;
			res.json(data);
			console.log(data);
		});
	});

	xsvr.delete('/:item', function(req, res){
		//delete requested item from db
		model1.find( {item: req.params.item.replace(/\-/g, " ")} ).remove(function(err, data){
			if (err) throw err;
			res.json(data);
			console.log(data);
		});
	});

};

var dbcreds = require('../../dbcreds');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extend: false});

mongoose.connect('mongodb://'+ dbcreds.user +':' + dbcreds.pw + '@ds051913.mlab.com:51913/rezdb');
var model1 = mongoose.model('rez2_collection1', mongoose.Schema({item: String}) ); //todoModel
var model2 = mongoose.model('rez2_collection2', mongoose.Schema({item: String}) ); //todoModel
//var data = [{item: 'get blue milk'}, {item: "re-attach 3PO's arm"}, {item: 'pickup power converters at toshi station'}];

var textsSch = mongoose.Schema({text:[ {name: String, keyword: String, body: String} ]});



var model3 = mongoose.model('quicktext2', mongoose.Schema({title:[], texts: [textsSch] }) ); //todoModel

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
	
		xsvr.get('/qt', function(req, res){
		var data = model3.find({}, function(err, data){
			if (err) throw err;
			//console.log('into the shoot flyboy');
			//res.render('view1', {todos: data, todos2: data2});

			var text = "";
			
	// model3 data structure
	// myData[ group index ].texts[0].text[template index].name,keyword,body,_shortcut,_type
			
			function treeMe(myData){
				
				var myGroup;
				for (myGroup = 0; myGroup < myData.length; myGroup++){
					text += "<h1>"+ (myGroup +1)+". " + myData[myGroup].title +"</h1>";
					var myTemplate;
					for (myTemplate = 0; myTemplate < myData[myGroup].texts[0].text.length; myTemplate++){
					text += "<b>"+ (myTemplate +1)+". </b>" + myData[myGroup].texts[0].text[myTemplate].name +" - ";
					text += "<b>" + myData[myGroup].texts[0].text[myTemplate].keyword +"</b><br><br>";
					text += "" + myData[myGroup].texts[0].text[myTemplate].body +"<br><br>";
					}
				}
			}
				
			
			treeMe(data);
			//regex to clean up data... no longer necessary.
			//text = text.replace(/\n\r/g, '<br>');
			//text = text.replace(/\\n/g, '');

			res.send(text);

		});
		console.log('qt called');
	});

	//create new todoModel with data from req.body, push to db, reload view
	xsvr.post('/', urlencodedParser, function(req, res){
		var newTodo = model1(req.body).save(function(err, data){
			if (err) throw err;
			res.json(data);
			console.log(data);
		});
	});
	
	xsvr.post('/form2', urlencodedParser, function(req, res){
		var newTodo = model2(req.body).save(function(err, data){
			if (err) throw err;
			res.json(data);
			console.log(data);
		});
	});

	xsvr.delete('/:item', function(req, res){
		//delete requested item from db
		var myItem = {item: req.params.item};
		console.log( myItem );
		model1.find( {_id: myItem.item} ).remove(function(err, data){
			if (err) throw err;
				console.log(myItem.item +' '+ data);
				model2.find( {_id: myItem.item} ).remove(function(err, data){
				if (err) throw err;
				res.json(data);
				console.log(myItem.item +' '+ data);
				});
		
		});
	});
	
	
};

var dbcreds = require('../../dbcreds');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extend: false});

var Mousetrap = require('mousetrap');
var copy = require('clipboard-copy');

mongoose.connect('mongodb://'+ dbcreds.user +':' + dbcreds.pw + '@ds051913.mlab.com:51913/rezdb');
var model1 = mongoose.model('rez2_collection1', mongoose.Schema({item: String}) ); //todoModel
var model2 = mongoose.model('rez2_collection2', mongoose.Schema({item: String}) ); //todoModel
//var data = [{item: 'get blue milk'}, {item: "re-attach 3PO's arm"}, {item: 'pickup power converters at toshi station'}];

var textsSch = mongoose.Schema({text:[ {name: String, keyword: String, body: String} ]});

var model3 = mongoose.model('quicktext3', mongoose.Schema({title:[], texts: [textsSch] }) );

var model0 = mongoose.model('schematest', mongoose.Schema( {a1: []} ) );


var textOut2 = "";


function dig(o0){

	o0 = JSON.parse ( JSON.stringify( o0 ) );

	if (Object.prototype.toString.call( o0 ) === "[object Object]"){
		if (o0.title){
			textOut2 += "<h2 style='color: salmon' class='toggler'; >" + o0.title.__cdata  + "</h2><br>";
		}
		for (o1 in o0){
			//textOut += nestLevel + "Object key: " + o1 + ", val: " + o0[o1] + "<br>";
			dig( o0[o1] );
		}

		//textOut += "<br>";
		//nestLevel = nestLevel.slice(0,-3);
	}else if (Object.prototype.toString.call( o0 ) === "[object Array]"){
		for (var o1 = 0; o1 < o0.length; o1++){
			if (o0[o1].name){
				textOut2 += "<div class='toggler'><b style='color: khaki' style='display:none;'>" + o0[o1].name.__cdata +" </b>";
				//textOut2 += o0[o1].body  + "<br><br>";
				
				if (o0[o1].keyword){
					textOut2 += "<b style='color: lightgreen'> " + o0[o1].keyword.__cdata + " </b><br>";
					//textOut2 += o0[o1].body  + "<br>";
				}else{textOut2 += "<br>"}
				if (o0[o1].body){
					textOut2 += "<div class='toggles' style='display:none;'>" + o0[o1].body.__cdata + "</div><br>";
					//textOut2 += o0[o1].body  + "<br><br>";
				}
				
				textOut2 +=   "</div>";
					
			}
			
			//textOut += nestLevel + "Array key: " + o1 + ", val: " + o0[o1] + "<br>";
			dig( o0[o1] );
		}

	}

}

module.exports = function(xsvr){
	
//route get /ext - sends text
		xsvr.get('/ext', function(req, res){

		textOut2 = "";

		var myItems = model3.find().lean().exec({}, function(err, data){
			if (err) throw err;

			dataStr = JSON.stringify(data, null, '\t');
			dataJson = JSON.parse( dataStr );

			//console.log( dataJson  );
			//textOut += "data: " + dataStr + "<br><br>";


			dig( dataJson );


			res.render('viewExt', {myData: textOut2});
			//res.send(data);

		});
		console.log('ext called');
	});




//route get /sch - sends text
		xsvr.get('/sch', function(req, res){

		textOut2 = "";

		var myItems = model3.find().lean().exec({}, function(err, data){
			if (err) throw err;

			dataStr = JSON.stringify(data, null, '\t');
			dataJson = JSON.parse( dataStr );

			//console.log( dataJson  );
			//textOut += "data: " + dataStr + "<br><br>";


			dig( dataJson );


			res.render('view0', {myData: textOut2});
			//res.send(data);

		});
		console.log('sch called');
	});

	//create new todoModel with data from req.body, push to db, reload view
	xsvr.post('/sch', urlencodedParser, function(req, res){
		var newItem = model0(req.body).save(function(err, data){
			if (err) throw err;
			res.json(data);
			console.log(data);
		});
	});



	// get /qt2 query for data and render view2
	xsvr.get('/qt2', function(req, res){
		var data = model3.find({}, function(err, data){
			if (err) throw err;
			//console.log('into the shoot flyboy');
			//res.render('view1', {todos: data, todos2: data2});

			res.render('view2', {myData: data});

		});


		console.log('controller1 called');
	});

	//route get /qt - sends text
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
	
	
	// WIG1
	xsvr.get('/wig1', function (req, res) {
		var data = model1.find({}, function (err, data) {
			if (err) throw err;
			//console.log('into the shoot flyboy');
			//res.render('view1', {todos: data, todos2: data2});

			var data2 = model2.find({}, function (err, data2) {
				if (err) throw err;
				//console.log('into the shoot flyboy');
				res.render('view_Wig1', { todos: data, todos2: data2 });

			});

		});



		console.log('controller1 called route wig1');
	});
	
	// drag1
	xsvr.get('/drag1', function (req, res) {
		var data = model1.find({}, function (err, data) {
			if (err) throw err;
			//console.log('into the shoot flyboy');
			//res.render('view1', {todos: data, todos2: data2});

			var data2 = model2.find({}, function (err, data2) {
				if (err) throw err;
				//console.log('into the shoot flyboy');
				res.render('view_drag1', { todos: data, todos2: data2 });

			});

		});

		console.log('controller1 called route drag1');
	});
	

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


		console.log('controller1 default / route called');
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

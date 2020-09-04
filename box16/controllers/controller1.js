var dbcreds = require('../../dbcreds');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extend: false});

//var Mousetrap = require('mousetrap');
//var copy = require('clipboard-copy');

//mongoose.connect('mongodb://'+ dbcreds.user +':' + dbcreds.pw + '@rezcluster0-shard-00-00-dldbs.mongodb.net:27017,rezcluster0-shard-00-01-dldbs.mongodb.net:27017,rezcluster0-shard-00-02-dldbs.mongodb.net:27017/test?ssl=true&replicaSet=RezCluster0-shard-0&authSource=admin&retryWrites=true');


//mongoose.connect('mongodb://'+ dbcreds.user +':' + dbcreds.pw + '@ds051913.mlab.com:51913/rezdb');

mongoose.connect('mongodb+srv://'++ dbcreds.user +':' + dbcreds.pw + '@rezdb.9cpbm.mongodb.net/rezdb?retryWrites=true&w=majority');

//mongodb://rez:<PASSWORD>@rezcluster0-shard-00-00-dldbs.mongodb.net:27017,rezcluster0-shard-00-01-dldbs.mongodb.net:27017,rezcluster0-shard-00-02-dldbs.mongodb.net:27017/test?ssl=true&replicaSet=RezCluster0-shard-0&authSource=admin&retryWrites=true



var model1 = mongoose.model('rez2_collection1', mongoose.Schema({item: String}) ); //todoModel
var model2 = mongoose.model('rez2_collection2', mongoose.Schema({item: String}) ); //todoModel
//var data = [{item: 'get blue milk'}, {item: "re-attach 3PO's arm"}, {item: 'pickup power converters at toshi station'}];

var textsSch = mongoose.Schema({text:[ {name: String, keyword: String, body: String} ]});

var model3 = mongoose.model('quicktext3', mongoose.Schema({title:[], texts: [textsSch] }) );

var model0 = mongoose.model('schematest', mongoose.Schema( {a1: []} ) );

var model_x1 = mongoose.model('model_x1s', mongoose.Schema({
		col_a: String, col_b: String, col_c: String, col_d: String, col_e: String,
		col_f: String, col_g: String, col_h: String, col_i: String, col_j: String
	}) );
	
var model_x2 = mongoose.model('model_x2s', mongoose.Schema({
		col_a: String, col_b: String, col_c: String, col_d: String, col_e: String,
		col_f: String, col_g: String, col_h: String, col_i: String, col_j: String
	}) );

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

				xsvr.locals.myData = data;
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
				res.render('view_drag1', { data: data, data2: data2 });

			});

		});

		console.log('controller1 called route drag1');
	});

	// x1
	xsvr.get('/x1', function (req, res) {
		var data = model_x1.find({}, function (err, data) {
			if (err) throw err;
			//console.log('into the shoot flyboy');
			//xsvr.locals.myData = data;
			res.render('view_x1', {data: data});
			});

			/*
			var data2 = model2.find({}, function (err, data2) {
				if (err) throw err;
				//console.log('into the shoot flyboy');
				//data = data.replace(/\s/g, '&nbsp;');
				res.render('view_x1', { data: data, data2: data2 });

			});
			*/


		//});

		console.log('controller1 called route drag1');
	});


	//create new todoModel with data from req.body, push to db, reload view
	xsvr.post('/x1', urlencodedParser, function (req, res) {
		var new_x1 = model_x1(req.body).save(function (err, data) {
			if (err) throw err;
			res.json(data);
			console.log(data);
		});
	});


	xsvr.delete('/x1:item', function(req, res){
		//delete requested item from db
		var myItem = {item: req.params.item};
		console.log( myItem );
		model_x1.find( {_id: myItem.item} ).remove(function(err, data){
			if (err) throw err;
				//console.log(myItem.item +' '+ data);
				//model2.find( {_id: myItem.item} ).remove(function(err, data){
				//if (err) throw err;
				res.json(data);
				console.log(myItem.item +' '+ data);
				//});

		});
	});
	
	
	
	// x2 -----------------------------------------------------------------------------------------------
	
	xsvr.get('/x2', function (req, res) {
		var data = model_x2.find({}, function (err, bulkData) {
			if (err) throw err;
			//console.log('into the shoot flyboy');
			var pig = [];
			var pork = bulkData[1].col_c.match(/<item>.+<\/item>/ig);
			var tempDesc;
			var tempHK;
			var tempTX;
			for (var i = 0; i < pork.length; i++){
				if (pork[i].match(/<desc>.+<\/desc>/i)){ tempDesc = pork[i].match(/<desc>.+<\/desc>/i)[0].slice(6, -7); } else {tempDesc = "a";}
				if (pork[i].match(/<hk>.+<\/hk>/i)){ tempHK = pork[i].match(/<hk>.+<\/hk>/i)[0].slice(4, -5); } else {tempHK = "b";}
				if (pork[i].match(/<tx>.+<\/tx>/i)){ tempTX = pork[i].match(/<tx>.+<\/tx>/i)[0].slice(4, -5); } else {tempHK = "c";}
				pig[i] = { "col_a": tempDesc, "col_b": tempHK, "col_c": tempTX, "col_d": "d", "col_e": "e", "col_f": "f", "col_g": "g", "col_h": "h"};
			}
			
			//console.log( pork );
			//xsvr.locals.myData = data;
			var data = pig; //bulkData;
			//var data = bulkData[1].col_c.match(/<tx>/g);
			res.render('view_x1', {data: data});
			});

			/*
			var data2 = model2.find({}, function (err, data2) {
				if (err) throw err;
				//console.log('into the shoot flyboy');
				//data = data.replace(/\s/g, '&nbsp;');
				res.render('view_x1', { data: data, data2: data2 });

			});
			*/


		//});

		console.log('controller1 called route drag1');
	});


	//create new todoModel with data from req.body, push to db, reload view
	xsvr.post('/x2', urlencodedParser, function (req, res) {
		var new_x1 = model_x2(req.body).save(function (err, data) {
			if (err) throw err;
			res.json(data);
			console.log(data);
		});
	});


	xsvr.delete('/x2:item', function(req, res){
		//delete requested item from db
		var myItem = {item: req.params.item};
		console.log( myItem );
		model_x2.find( {_id: myItem.item} ).remove(function(err, data){
			if (err) throw err;
				//console.log(myItem.item +' '+ data);
				//model2.find( {_id: myItem.item} ).remove(function(err, data){
				//if (err) throw err;
				res.json(data);
				console.log(myItem.item +' '+ data);
				//});

		});
	});



	// get '/' todo data and render view -----------------------------------------------------------------
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

//var Mousetrap = require('mousetrap');
//var copy = require('clipboard-copy');
var Mousetrap = rezBundle.Mousetrap;
var copy = rezBundle.copy;
var myHKs = ['12', '123', '1234', 'pp'];

$(document).ready(function(){
	
	for(let ii of myHKs){
		let temp = "";
		for(let vv of ii){
			temp = temp + vv + " ";
		}
		temp = temp + "- =";
		Mousetrap.bind( temp , function() { 
		
			console.log('you pressed: ' + ii ); 
			copy('...Chewy pressed: ' + ii + ' and is making the jump to hyper-space');
			$( "#txOut1" ).html( ""+ ii + "!" );
		  
		});
	
	}
	//var Mousetrap = require('mousetrap');
  //$( "#txOut1" ).html("chewy");
	
  $( "#drag1" ).draggable();
  $( "#drag2" ).draggable();
  $( "#drag3" ).draggable();
  

  $('#form1').on('submit', function(){
	console.log('submitting yo');
      var item = $('#form1 input');
      var todoX = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/',
        data: todoX,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });
  
   $('#form2').on('submit', function(){
	console.log('submitting 2 yo');
      var item = $('#form2 input');
      var todoX = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/form2',
        data: todoX,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).attr('name'); //.replace(/ /g, "-");
	  console.log(item);
      $.ajax({
        type: 'DELETE',
        url: '/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
		  
        }
      });
  });
  
	var stage = new createjs.Stage("demoCanvas");
	var circle = new createjs.Shape();
	circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 40);
	circle.x = 50;
	circle.y = 50;
	stage.addChild(circle);
	stage.update();

	
	$.contextMenu({
		// define which elements trigger this menu
		selector: "#pork",
		// define the elements of the menu
		items: {
			foo: {name: "Foo", callback: function(key, opt){ alert("Foo!"); }},
			bar: {name: "Bar", callback: function(key, opt){ alert("Bar!") }}
		}
		// there's more, have a look at the demos and docs...
	});
	
	

});

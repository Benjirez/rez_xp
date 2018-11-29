//var Mousetrap = require('mousetrap');
//var copy = require('clipboard-copy');

$(document).ready(function(){
  
  /*
	Mousetrap.bind('1 2 3', function() { 
	
		console.log('you pressed one, two and three'); 
		copy('...this is Chewy and I am making the jump to hyper-space');
    $("#txOut1").html('...this is Chewy and I am making the jump to hyper-space');
	});
	*/
	//var Mousetrap = require('mousetrap');
  //$( "#txOut1" ).html("chewy");
	
  $( ".drag" ).draggable({ 
		grid: [ 100, 100 ], 
		//create: function( event, ui ) { $( "#txOut1" ).html( ui.position.left + ' , ' + ui.position.top ); },
		drag: function( event, ui ) { $( "#txOut1" ).html( ui.position.left + ' , ' + ui.position.top ); } 
	
	});
	
	//var c1 = $("#c1").offset();
	var d1 = $( "#demoCanvas" ).offset();
	d1.top = 0;  
	d1.top = 0;
	$("#txOut1").html( d1.left + ' , ' + d1.top);
  //$( "#drag2" ).draggable();
  //$( "#drag3" ).draggable();
  
/*
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
  
  */
  
	var stage = new createjs.Stage("demoCanvas");
	var circle = new createjs.Shape();
	circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 30);
	circle.x = 30;
	circle.y = 30;
	stage.addChild(circle);
	stage.update();

	/*
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
		*/

});

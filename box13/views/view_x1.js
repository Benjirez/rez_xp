//var Mousetrap = require('mousetrap');
//var copy = require('clipboard-copy');

var Mousetrap = rezBundle.Mousetrap;
var copy = rezBundle.copy;


$(document).ready(function(){
	
//console.log( myData[0] );	
//var myData = xsvr.locals.myData; 
var sel1 = $("#sel1");

sel1.attr("multiple", true).attr("size", 16);

//$("select option[value='0']").attr("selected","selected"); //.changed();

function doIt(){
	
		//sel1.selectedIndex
		selTx = $("#sel1 option:selected").val();
		//console.log( selTx );
		$("#colA").html( myData[ selTx ].col_a );
		$("#colB").html( myData[ selTx ].col_b );
		$("#colC").html( myData[ selTx ].col_c );
		$("#colD").html( myData[ selTx ].col_d );
		$("#colE").html( myData[ selTx ].col_e );
		$("#colF").html( myData[ selTx ].col_f );
		$("#colG").html( myData[ selTx ].col_g );
		$("#colH").html( myData[ selTx ].col_h );
		$("#colI").html( myData[ selTx ].col_i );
		$("#colJ").html( myData[ selTx ].col_j );
	
}

doIt();

//sel1.on("change", function() {console.log("nah holmes")} );
	var selTx;

	sel1.change( doIt );


	$('#clr_btn').on('click', function () {

			console.log('clearing foo');

			$("#colA").val("");
			$("#colB").html("");
			$("#colC").html("");
			$("#colD").html("");
			$("#colE").html("");
			$("#colF").html("");
			$("#colG").html("");
			$("#colH").html("");
			$("#colI").html("");
			$("#colJ").html("");

	});

	


  
	  $('#add_btn').on('click', function(){
		console.log('submitting yo');
		
		  //var item = $('#form1 input');
		  var my_x1 = { 

				col_a: $("#colA").val(),
				col_b: $("#colB").val(),
				col_c: $("#colC").val(),
				col_d: $("#colD").val(),
				col_e: $("#colE").val(),
				col_f: $("#colF").val(),
				col_g: $("#colG").val(),
				col_h: $("#colH").val(),
				col_i: $("#colI").val(),
				col_j: $("#colJ").val()
				};

		  $.ajax({
			type: 'POST',
			url: '/x1',
			data: my_x1,
			success: function(data){
			  //do something with the data via front-end framework
			  location.reload();
			}
			
		  });

		  return false;
		
	  });
  
 
  
//$( "#sel1 option:selected"
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

$(document).ready(function(){
	
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

});

$(document).ready(function(){
	
	$(".toggler").click(function(){
        $(this).children(".toggles").toggle();
    });

	$('#form1').on('submit', function(){
		console.log('submitting yo');
    var newItem = $('#form1 input');
    var item = { a1: [1,2,{a2: [3,4,{a3: [5,6,{a4: [7,8,{a5: [9,10,{a6: "deep"}] }] }] }] }] }; //p1: newItem.val(),

    $.ajax({
        type: 'POST',
        url: '/sch',
        data: item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
    });

    return false;

  });

});

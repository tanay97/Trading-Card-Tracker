// $('.upload-btn').on('click', function() {
// 	$('#upload-input').click();
// });    only useful if hiding the other button

$('#upload-input').on('change', function(){

  var files = $(this).get(0).files;  // cause everything is a fileList

  if (files.length > 0) {  // if there is even input

  	var formData = new FormData();
  	for (var i = 0; i < files.length; i++) {
  		var file = files[i];
  		formData.append('uploads[]', file, file.name);   // append to formData object
  	}

  	// jquery send a post request
  	$.ajax({
  		url: '/upload',
  		type: 'POST',
  		data: formData,
		processData: false,  // not sure why...
      	contentType: false,

  		success: function() {   // callback function for success
  			console.log('upload successful\n');
  		}

  	});  
  }
});
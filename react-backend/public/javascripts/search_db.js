function search () {
	var holes = document.getElementById('holes').value;
	var course_name = '*';
	var town_city_area = '*';
	var state = '*';
	var country = '*';
	var world_area = 'NA';
	var founded_date = '*';
	var type = '*';

	console.log(holes);

	$.ajax({
  		url: '/search_db',
  		type: 'GET',
  		data: {
  			'course_name': course_name,
  			'town_city_area': town_city_area,
  			'state': state,
  			'country': country,
  			'world_area': world_area, 
  			'holes': holes,
  			'founded_date': founded_date,
  			'type': type
  		},
  		
  		success: function() {   // callback function for success
  			console.log('success');
  		}

  	});
}

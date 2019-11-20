$(document).ready(function() {
	var teamsjson = $.getJSON( "fantasycalculator.json", function (data) {
		  console.log(data);
		  console.log(data.teams.donkeys.fullname);

	});
	/*teams = JSON.Data;
	console.log(teams);
	console.log(teamsjson);
	console.log("1");
	console.log(teamsjson);
	console.log("2");
	console.log(teams);
	$("body").append(teams[0]); */
});
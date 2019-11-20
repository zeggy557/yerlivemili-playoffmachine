$(document).ready(function() {
	var teamsjson = $.getJSON( "fantasycalculator.json", function (data) {
		  console.log(data.teams.donkeys.fullname);
		  $.each(data.teams, function (key, val) {
		  	var totalwins = 0;
		  	$.each(val.winlist, function (key, val) {
		  		totalwins += val;
		  	});
		  	var newdiv = "<div>" +  val.fullname + " W: " + val.wins + " TW: "+ totalwins + " L: " + val.losses + " DW: " + val.divwins + " DL: " + val.divlosses + "/<div>";
		  	console.log(newdiv);
		  	$(newdiv).appendTo("body"); 
		  });

	});

});
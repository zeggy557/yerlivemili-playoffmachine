$(document).ready(function() {
	var teamsjson = $.getJSON( "fantasycalculator.json", function (data) {
		$.each(data.teams, function (key, val) {
		  	var totalwins = 0;
		  	$.each(val.winlist, function (key, val) {
		  		totalwins += val;
		  	});
		  	var newdiv = "<div>" +  val.fullname + " W: " + val.wins + " L: " + val.losses + " DW: " + val.divwins + " DL: " + val.divlosses + " Points: " + val.points + "</div>";
		  	$(newdiv).appendTo("#maincontainer");
		 });

		$(".team").click(function() {
			$(this).addClass("active-toggle");
			var wteam, lteam, wid, lid;
			wteam = $(this).attr("data-teamname");
			console.log(wteam);
			console.log(data.teams[wteam].fullname);
		 	if($(this).hasClass("team1")) {
		 		$(this).siblings(".team2").removeClass("active-toggle");
		 	}
		 });

	});

});
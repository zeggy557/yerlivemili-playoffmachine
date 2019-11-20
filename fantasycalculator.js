function calculateTotalWins(winlist) {
	var totalwins;
	$.each(winlist, function (key, val) {
		  		totalwins += val;
		  	});
	return totalwins;

}


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
			if($(this).hasClass("active-toggle") === false) {
				$(this).addClass("active-toggle");
				var otherteam;
				if($(this).hasClass("team1")) {
			 		var otherteam = $(this).siblings(".team2");
			 	}
			 	else if($(this).hasClass("team2")) {
			 		var otherteam = $(this).siblings(".team1");
			 	}
			 	otherteam.removeClass("active-toggle");

			 	var wteam, lteam, wid, lid;
				wteam = $(this).attr("data-teamname");
				lteam = otherteam.attr("data-teamname");
				wteamdata = data.teams[wteam];
				lteamdata = data.teams[lteam];
				wid = wteamdata.id;
				lid = lteamdata.id;
				console.log("current state");
				console.log(wteamdata.fullname, wteamdata.wins, wteamdata.losses, wteamdata.divwins, wteamdata.divlosses);
				console.log(lteamdata.fullname, lteamdata.wins, lteamdata.losses, lteamdata.divwins, lteamdata.divlosses);				
				console.log(wteamdata.winlist[lid], lteamdata.winlist[wid]);

				if ($(this).parent().hasClass("divisional")) {
					if(wteamdata.winlist[lid] + lteamdata.winlist[wid] === 1) {
						wteamdata.winlist[lid]++;
						wteamdata.wins++;
						wteamdata.divwins++;

						lteamdata.losses++;
						lteamdata.divlosses++;
					}
					else {
						wteamdata.winlist[lid]++;
						wteamdata.wins++;
						wteamdata.divwins++;
						wteamdata.losses--;
						wteamdata.divlosses--;

						lteamdata.winlist[wid]--;
						lteamdata.wins--;
						lteamdata.divwins--;
						lteamdata.losses++;
						lteamdata.divlosses++;	
					}
				}
				else {
					if(wteamdata.winlist[lid] + lteamdata.winlist[wid] === 0) {
						wteamdata.winlist[lid]++;
						wteamdata.wins++;

						lteamdata.losses++;
					}
					else {
						wteamdata.winlist[lid]++;
						wteamdata.wins++;
						wteamdata.losses--;

						lteamdata.winlist[wid]--;
						lteamdata.wins--;
						lteamdata.losses++;
					}
				}
				console.log("new state");
				console.log(wteamdata.fullname, wteamdata.wins, wteamdata.losses, wteamdata.divwins, wteamdata.divlosses);
				console.log(lteamdata.fullname, lteamdata.wins, lteamdata.losses, lteamdata.divwins, lteamdata.divlosses);				
				console.log(wteamdata.winlist[lid], lteamdata.winlist[wid]);
			}

		 });

	});

});
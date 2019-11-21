function calculateTotalWins(winlist) {
	var totalwins;
	$.each(winlist, function (key, val) {
		  		totalwins += val;
		  	});
	return totalwins;

}

function tiebreakTwoTeams (firstteam, secondteam){
	if(firstteam.wins > secondteam.wins) return 1;
	else if(firstteam.wins < secondteam.wins) return 2;
	else {
		console.log("w-l eşit ", firstteam, secondteam);
		console.log("aralarındaki maçlara bakılıyor");
		if(firstteam.winlist[secondteam.id] > secondteam.winlist[firstteam.id]) return 1;
		else if(firstteam.winlist[secondteam.id] < secondteam.winlist[firstteam.id]) return 2;
		else {
			console.log("aralarındaki maçlar eşit ", firstteam, secondteam);
			console.log("division galibiyetine bakılıyor");
			if(firstteam.divwins > secondteam.divwins) return 1;
			else if(firstteam.divwins < secondteam.divwins) return 2;
			else {
				console.log("division maçları eşit ", firstteam, secondteam);
				console.log("puanlara bakılıyor");
				if(firstteam.points > secondteam.points) return 1;
				else if(firstteam.points < secondteam.points) return 2;
				else alert("PUAN EŞİTLİĞİ VAR? NANİ?");
			}
		}
	}
}

function tiebreakDivision (sorteddiv, winnertb, wctb) {
	var winner = 0;
	console.log("tiebreak process");
	//üçlü tiebreaker
	if(winnertb.length === 2) {}
	//ikili tiebreker
	else if(winnertb.length === 1) {
		console.log("1st place tiebreak between", sorteddiv[0], winnertb[0]);
		winner = tiebreakTwoTeams(sorteddiv[0], winnertb[0]);
		if(winner === 2) {
			console.log("liderlik, winner = 2");
			sorteddiv[1] = sorteddiv[0];
			sorteddiv[0] = winnertb[0]
		}
	}
	else if(wctb.length === 2) {
		console.log("2nd place tiebreak between", wctb[0], wctb[1]);
		winner = tiebreakTwoTeams(wctb[0], wctb[1]);
		if(winner === 2) {
			console.log("ikinci sıra, winner = 2");
			sorteddiv[1] = wctb[1];
			sorteddiv[2] = wctb[0];
		}
	}
	if (winner === 0) console.log("tiebreak yok");
	console.log("tiebreak sorteddiv ", sorteddiv[0], sorteddiv[1], sorteddiv[2]);
	return;
}

function populateTables (teams) {
	var divisions = [
		[],
		[],
		[],
		[]
	];
	$.each(teams, function (key, val) {
		divisions[val.division - 1].push(val);	
	});
	var sorteddiv = [];
	var mostwins = 0, mwindex = 0;
	var firstplacetiebreaker = [];
	var secondplacetiebreaker = [];
	//sort by wins first
	$.each(divisions, function (key, division) {
		sorteddiv = [];
		firstplacetiebreaker = [];
		secondplacetiebreaker = [];
		mostwins = 0, mwindex = 0;
		$.each(division, function (key, team) {
			if(team.wins > mostwins) {
				mostwins = team.wins;
				mwindex = key;
			}
			else if(team.wins === mostwins) {
				firstplacetiebreaker.push(team);
			}
		});
		sorteddiv.push(division[mwindex]);
		division.splice(mwindex,1);
		if(division[0].wins > division[1].wins) {
			sorteddiv.push(division[0]);
			sorteddiv.push(division[1]);
		}
		else if(division[1].wins > division[0].wins) {
			sorteddiv.push(division[1]);
			sorteddiv.push(division[0]);
		}
		else {
			sorteddiv.push(division[0]);
			sorteddiv.push(division[1]);
			secondplacetiebreaker.push(division[0]);
			secondplacetiebreaker.push(division[1]);
		}
		//division tiebreakers
		console.log("tb öncesi sorteddiv ", sorteddiv[0], sorteddiv[1], sorteddiv[2]);
		tiebreakDivision(sorteddiv, firstplacetiebreaker, secondplacetiebreaker);
		console.log("tb sonrası sorteddiv ", sorteddiv[0], sorteddiv[1], sorteddiv[2]); 
	}); 
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
				/*console.log("current state");
				console.log(wteamdata.fullname, wteamdata.wins, wteamdata.losses, wteamdata.divwins, wteamdata.divlosses);
				console.log(lteamdata.fullname, lteamdata.wins, lteamdata.losses, lteamdata.divwins, lteamdata.divlosses);				
				console.log(wteamdata.winlist[lid], lteamdata.winlist[wid]); */

				if($(this).parent().hasClass("divisional")) {
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
				/* console.log("new state");
				console.log(wteamdata.fullname, wteamdata.wins, wteamdata.losses, wteamdata.divwins, wteamdata.divlosses);
				console.log(lteamdata.fullname, lteamdata.wins, lteamdata.losses, lteamdata.divwins, lteamdata.divlosses);				
				console.log(wteamdata.winlist[lid], lteamdata.winlist[wid]); */
				populateTables(data.teams);

			}

		 });

	});

});
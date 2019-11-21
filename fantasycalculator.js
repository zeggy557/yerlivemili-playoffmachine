var consFlag = 0;

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}


function calculateTotalWins(winlist) {
	var totalwins;
	$.each(winlist, function (key, val) {
		  		totalwins += val;
		  	});
	return totalwins;

}

function tiebreakMultipleTeamsWC (wcteams1) {
	var mostwins = 0;
	var eliminate = [];
	var winner;
	var wcteams = $.extend(true, [], wcteams1); //deep clone the array
	var returnValue = null;
	$.each(wcteams, function (key, team) {
		if(team.wins > mostwins) {
				mostwins = team.wins;			
		}
	});

	$.each(wcteams, function(key,team) {
			if (team.wins < mostwins) {
				eliminate.push(key);
			}
	});
	eliminate.sort(function(a, b){return a-b}); //sort eliminate


	for (var i = eliminate.length -1; i >= 0; i--) {
		wcteams.splice(eliminate[i], 1);
    }
	if(wcteams.length === 1) {
		return wcteams[0];
	}
	if(wcteams.length === 2) {
		winner = tiebreakTwoTeamsWC(wcteams[0],wcteams[1]) -1;
		return wcteams[winner];
	}
	else {
		var wcteamids = [];
		$.each(wcteams, function (key, val) {
			wcteamids.push(val.id);
		});
		var wincounts = [];
		var wincount = 0;
		$.each(wcteams, function (key, val) {
			wincount = 0;
			var i;
			for (i = 0; i < wcteamids.length; i++) {
  				wincount += val.winlist[wcteamids[i]];
			}
			wincounts.push(wincount);
		});
		eliminate = [];
		$.each(wcteams, function(key,val) {
			if(wincounts[key] === wcteams.length -1) {
				var opponentsList = [];
				for (var i=0; i<wcteams.length; i++) {
					if(i !== key) {
						opponentsList.push(wcteams[i]);
					}
				}
				if(opponentsList.length === 3)
					$(".tiebreakers-explanation").append("<div>" + val.fullname + " gets ahead by having H2H wins against all his opponents: " + opponentsList[0].fullname + ", " +opponentsList[1].fullname + " and " + opponentsList[2].fullname + ".</div>" );
				else if(opponentsList.length === 2)
					$(".tiebreakers-explanation").append("<div>" + val.fullname + " gets ahead by having H2H wins against all his opponents: " + opponentsList[0].fullname + " and " + opponentsList[1].fullname + ".</div>" );
				returnValue = val;
				return false; //gets out of the loop, not the function
			}
			else if(wincounts[key] === 0) {
				var opponentsList = [];
				for (var i=0; i<wcteams.length; i++) {
					if(i !== key) {
						opponentsList.push(wcteams[i]);
					}
				}
				if(opponentsList.length === 3)
					$(".tiebreakers-explanation").append("<div>" + val.fullname + " has no H2H wins against his opponents " + opponentsList[0].fullname + ", " +opponentsList[1].fullname + " and " + opponentsList[2].fullname + ".</div>");
				else if(opponentsList.length === 2)
					$(".tiebreakers-explanation").append("<div>" + val.fullname + " has no H2H wins against his opponents " + opponentsList[0].fullname + " and " + opponentsList[1].fullname + ".</div>");
				eliminate.push(key);
			}
		});
		if(returnValue !== null) return returnValue;
		eliminate.sort(function(a, b){return a-b}); //sort eliminate
		for (var i = eliminate.length -1; i >= 0; i--) 
                wcteams.splice(eliminate[i], 1); 
		/* if(wcteams.length === 1) {
			$(".tiebreakers-explanation").append("<div>" + wcteams[0].fullname + " gets ahead of his opponents by having more H2H wins</div>");
			return wcteams[0];
		} */ //never gets in here because of the previous return
		if(wcteams.length === 2) {
			winner = tiebreakTwoTeamsWC(wcteams[0],wcteams[1]) -1;
			if(winner === 1) return wcteams[0];
			else return wcteams[1];
		}
		else {
			var mostpoints = 0,  mpindex = 0;
			$.each(wcteams, function (key, team) {
				if(team.points > mostpoints) {
					mostpoints = team.points;
					mpindex = key;
				}
				else if(team.points === mostpoints) {
					winner = tiebreakTwoTeamsWC(team, wcteams[mpindex]);
					if(winner === 1) {
						mostpoints = team.points;
						mpindex = key;
					}
				}
			}); 
			var opponentsList = [];
			$.each(wcteams, function(key,val) {
				opponentsList.push(val);
			})
			opponentsList.splice(mpindex,1);
			var opponentsNames = [];
			$.each(opponentsList, function(key,val) {
				opponentsNames.push(val.fullname + "");
			});

			var opponentsString = opponentsNames.join(", ");
			$(".tiebreakers-explanation").append("<div>" + wcteams[mpindex].fullname + " gets ahead of " + opponentsString + " by scoring more points!</div>");
			return wcteams[mpindex];
		}
	}
}

function tiebreakTwoTeamsWC (firstteam, secondteam){
	if(firstteam.wins > secondteam.wins) return 1;
	else if(firstteam.wins < secondteam.wins) return 2;
	else {
		if(firstteam.winlist[secondteam.id] > secondteam.winlist[firstteam.id]) {
			$(".tiebreakers-explanation").append("<div>" + firstteam.fullname + " gets ahead of " + secondteam.fullname + " by H2H win.</div>");
			return 1;
		}
		else if(firstteam.winlist[secondteam.id] < secondteam.winlist[firstteam.id]) {
			$(".tiebreakers-explanation").append("<div>" +secondteam.fullname + " gets ahead of " + firstteam.fullname + " by H2H win.</div>");
			return 2;
		}
		else {
			if(firstteam.points > secondteam.points) {
				$(".tiebreakers-explanation").append("<div>" +firstteam.fullname + " gets ahead of " + secondteam.fullname + " by scoring more points.</div>");
				return 1;	
			} 
			else if(firstteam.points < secondteam.points) {
				$(".tiebreakers-explanation").append("<div>" + secondteam.fullname + " gets ahead of " + firstteam.fullname + " by scoring more points</div>");
				return 2;	
			} 
			else {
				console.log("PUAN EŞİTLİĞİ VAR! ", firstteam.fullname, " VE ", secondteam.fullname, " ARASINDA KURA ÇEKİLİYOR!");
				var winner = getRndInteger(1,2);
				if(winner === 1) {
					console.log("KAZANAN TAKIM: ", firstteam.fullname);
					return 1;
				}
				else {
					console.log("KAZANAN TAKIM: ", secondteam.fullname);
					return 2;
				}
			}

		}
	} 
}

function tiebreakTwoTeamsInDivision (firstteam, secondteam){
	if(firstteam.wins > secondteam.wins) return 1;
	else if(firstteam.wins < secondteam.wins) return 2;
	else {
		if(firstteam.winlist[secondteam.id] > secondteam.winlist[firstteam.id]) {
			$(".tiebreakers-explanation").append("<div>" + firstteam.fullname + " gets ahead of " + secondteam.fullname + " by H2H win.</div>");
			return 1;
		}
		else if(firstteam.winlist[secondteam.id] < secondteam.winlist[firstteam.id]) {
			$(".tiebreakers-explanation").append("<div>" + secondteam.fullname + " gets ahead of " + firstteam.fullname + " by H2H win.</div>");
			return 2;
		}
		else {
			if(firstteam.divwins > secondteam.divwins){
				$(".tiebreakers-explanation").append("<div>" + firstteam.fullname + " gets ahead of " + secondteam.fullname + " by more divisional wins.</div>");
				return 1;
			}
			else if(firstteam.divwins < secondteam.divwins){
				$(".tiebreakers-explanation").append("<div>" + secondteam.fullname + " gets ahead of " + firstteam.fullname + " by more divisional wins.</div>");
				return 2;
			}
			else {
				if(firstteam.points > secondteam.points) {
					$(".tiebreakers-explanation").append("<div>" + firstteam.fullname + " gets ahead of " + secondteam.fullname + " by scoring more points.</div>");
					return 1;	
				} 
				else if(firstteam.points < secondteam.points) {
					$(".tiebreakers-explanation").append("<div>" + secondteam.fullname + " gets ahead of " + firstteam.fullname + " by scoring more points.</div>");
					return 2;	
				}
				else {
					console.log("PUAN EŞİTLİĞİ VAR! ", firstteam.fullname, " VE ", secondteam.fullname, " ARASINDA KURA ÇEKİLİYOR!");
					var winner = getRndInteger(1,2);
					if(winner === 1) {
						console.log("KAZANAN TAKIM: ", firstteam.fullname);
						return 1;
					}
					else {
						console.log("KAZANAN TAKIM: ", secondteam.fullname);
						return 2;
					}
				}

			}
		} 
	}
}

function tiebreakThreeTeamsInDivision (sorteddiv) {
	var firstteam = sorteddiv[0];
	var secondteam = sorteddiv[1];
	var thirdteam = sorteddiv[2];
	var winner = 0;
	var mostdivwins = 0, mdwindex = 0;

	$.each(sorteddiv, function (key, team) {
		if(team.divwins > mostdivwins) {
				mostdivwins = team.divwins;
				mdwindex = key;
		}
	});
	if(mostdivwins === 4) {
		var tmp = sorteddiv[0];
		sorteddiv[0] = sorteddiv[mdwindex];
		sorteddiv[mdwindex] = tmp;
		$(".tiebreakers-explanation").append("<div>" + sorteddiv[0].fullname + " wins division by having more divisional wins!</div>");
		winner = tiebreakTwoTeamsInDivision(sorteddiv[1],sorteddiv[2]);
		if(winner === 2) {
			tmp = sorteddiv[1];
			sorteddiv[1] = sorteddiv[2];
			sorteddiv[2] = tmp;
		}
		return sorteddiv;
	}
	else if (mostdivwins === 2) {
		var mostpoints = 0,  mpindex = 0;
		$.each(sorteddiv, function (key, team) {
			if(team.points > mostpoints) {
				mostpoints = team.points;
				mpindex = key;
			}
			else if(team.points === mostpoints) {
				console.log("PUAN EŞİTLİĞİ VAR! ", sorteddiv[mpindex].fullname, " VE ", team.fullname, " ARASINDA KURA ÇEKİLİYOR!");
					var winner = getRndInteger(1,2);
					if(winner === 1) {
						console.log("KAZANAN TAKIM: ", sorteddiv[mpindex].fullname);
					}
					else {
						console.log("KAZANAN TAKIM: ", team.fullname);
						mpindex = key;
					}
			}
		});
		var tmp = sorteddiv[0];
		sorteddiv[0] = sorteddiv[mpindex];
		sorteddiv[mpindex] = tmp;
		$(".tiebreakers-explanation").append("<div>" + sorteddiv[0].fullname + " wins division by scoring more points!</div>");
		winner = tiebreakTwoTeamsInDivision(sorteddiv[1],sorteddiv[2]);
		if(winner === 2) {
			tmp = sorteddiv[1];
			sorteddiv[1] = sorteddiv[2];
			sorteddiv[2] = tmp;
		}
		return sorteddiv;
	}
	else { //mostdivwins === 3
		var threedivwins = [];
		var nonthreedivwins = [];
		$.each(sorteddiv, function (key, team) {
			if(team.divwins === 3) {
				threedivwins.push(key);
			}
			else {
				nonthreedivwins.push(key);
			}
		});
		if(threedivwins.length === 1) {
			var tmp = sorteddiv[0];
			sorteddiv[0] = sorteddiv[threedivwins[0]];
			sorteddiv[threedivwins[0]] = tmp;
			$(".tiebreakers-explanation").append("<div>" + sorteddiv[0].fullname + " wins division by having more divisional wins!</div>");
			winner = tiebreakTwoTeamsInDivision(sorteddiv[1],sorteddiv[2]);
			if(winner === 2) {
				tmp = sorteddiv[1];
				sorteddiv[1] = sorteddiv[2];
				sorteddiv[2] = tmp;
			}
			return sorteddiv;
		}
		else { //threedivwins.length === 2
			var tmp = sorteddiv[2];
			sorteddiv[2] = sorteddiv[nonthreedivwins[0]];
			sorteddiv[nonthreedivwins[0]] = tmp;
			winner = tiebreakTwoTeamsInDivision(sorteddiv[0],sorteddiv[1]);
			if(winner === 2) {
				tmp = sorteddiv[0];
				sorteddiv[0] = sorteddiv[1];
				sorteddiv[1] = tmp;
			}
			return sorteddiv;

		}
	} 

} 

function tiebreakDivision (sorteddiv, winnertb, wctb) {
	var winner = 0;
	//üçlü tiebreaker
	if(winnertb.length === 2) {
		sorteddiv = tiebreakThreeTeamsInDivision(sorteddiv);
	}
	//ikili tiebreker
	else if(winnertb.length === 1) {
		winner = tiebreakTwoTeamsInDivision(sorteddiv[0], winnertb[0]);
		if(winner === 2) {
			sorteddiv[1] = sorteddiv[0];
			sorteddiv[0] = winnertb[0]
		}
	}
	else if(wctb.length === 2) {
		winner = tiebreakTwoTeamsInDivision(wctb[0], wctb[1]);
		if(winner === 2) {
			sorteddiv[1] = wctb[1];
			sorteddiv[2] = wctb[0];
		}
	}
	return sorteddiv;
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
				firstplacetiebreaker = [];
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
		sorteddiv = tiebreakDivision(sorteddiv, firstplacetiebreaker, secondplacetiebreaker);
		division = sorteddiv;
		divisions[key] = division;
		var tableofdiv = key;
		$('table[data-id="' + tableofdiv + '"]').children("tbody").empty();
		$.each(sorteddiv, function (key, val){
			var position = key + 1;
			$('table[data-id="' + tableofdiv + '"]').children("tbody").append("<tr data-team-id='" + val.id + "'><th>" + position + "</th><td>" + val.fullname + "</td><td>" + val.wins + "-" + val.losses + "</td><td>" + val.divwins +"-" + val.divlosses + "</td><td>" + val.points + "</td><td></td></tr>");
		});

	});
	var seeds = [];
	var groupwinners = [divisions[0][0], divisions[1][0],divisions[2][0],divisions[3][0]];
	$(".tiebreakers-explanation").append("<br/><div class='tiebreaker-title subtitle'>Seeding Tiebreakers:</div>");
	var seed1 = tiebreakMultipleTeamsWC(groupwinners);
	seeds.push(seed1);
	var exclude = seeds[0].division -1;
	groupwinners = [];
	for (var i=0; i<4;i++) {
		if(i !== exclude) {
			groupwinners.push(divisions[i][0]);
		}
	}
	var seed2 = tiebreakMultipleTeamsWC(groupwinners);
	seeds.push(seed2);
	var exclude2 = seeds[1].division -1;
	groupwinners = [];
	for (var i=0; i<4;i++) {
		if(i !== exclude && i !=exclude2) {
			groupwinners.push(divisions[i][0]);
		}
	}
	var winner = tiebreakTwoTeamsWC(groupwinners[0],groupwinners[1]);
	if(winner === 1 ) {
		seeds.push(groupwinners[0]);
		seeds.push(groupwinners[1]);
	}
	else {
		seeds.push(groupwinners[1]);
		seeds.push(groupwinners[0]);
	}
	var wildcards = [divisions[0][1], divisions[1][1],divisions[2][1],divisions[3][1]];
	seeds.push(tiebreakMultipleTeamsWC(wildcards));
	exclude = seeds[4].division-1;
	wildcards = [];
	for (var i=0; i<4;i++) {
		if(i !== exclude) {
			wildcards.push(divisions[i][1]);
		}
	}
	wildcards.push(divisions[exclude][2]);
	seeds.push(tiebreakMultipleTeamsWC(wildcards));
	var seednumber;
	$.each(seeds, function(key,val) {
		seednumber = key+1;
		$('tr[data-team-id="' + val.id + '"]').children().last().remove();
		$('tr[data-team-id="' + val.id + '"]').append("<th> #" + seednumber  + "</th>");
		$('tr[data-team-id="' + val.id + '"]').addClass("has-background-primary");

	});

	console.log("CONSTIPATION");
	consFlag = 1;
	var constipation = [];
	$.each(teams, function(key,val) {
		if ($('tr[data-team-id="' + val.id + '"]').hasClass("has-background-primary") === false) {
			constipation.push(val);
		}
	});

	$(".tiebreakers-explanation").append("<br/><div class='tiebreaker-title subtitle'>Constipation Tiebreakers:</div>");

	var consseeds = [];
	var consSeed1;
	for (i=0; i<4; i++) {
		consSeed1 = tiebreakMultipleTeamsWC(constipation);
		console.log("Cons Seed pushed: ", consSeed1);
		consseeds.push(consSeed1);
		$.each(constipation, function (key, val) {
			if(consseeds[i].id === val.id) {
				constipation.splice(key,1);
				return false;
			}
		});
	}
	winner = tiebreakTwoTeamsWC(constipation[0], constipation[1]) -1;
	consseeds.push(constipation[winner]);
	constipation.splice(winner,1);
	consseeds.push(constipation[0]);
	$.each(consseeds, function(key,val) {
		seednumber = key+7;
		$('tr[data-team-id="' + val.id + '"]').children().last().remove();
		$('tr[data-team-id="' + val.id + '"]').append("<th> #" + seednumber  + "</th>");

	});





}


$(document).ready(function() {
	var teamsjson = $.getJSON( "fantasycalculator.json", function (data) {
		$(".tiebreakers-explanation").append("<div class='tiebreaker-title subtitle'>Divisional Tiebreakers:</div>");
		populateTables(data.teams);
		$(".team").click(function() {
			if($(this).hasClass("active-toggle") === false) {
				$(this).addClass("active-toggle");
				$(this).addClass("is-success");
				var otherteam;
				if($(this).hasClass("team1")) {
			 		var otherteam = $(this).siblings(".team2");
			 	}
			 	else if($(this).hasClass("team2")) {
			 		var otherteam = $(this).siblings(".team1");
			 	}
			 	otherteam.removeClass("active-toggle");
			 	otherteam.removeClass("is-success");

			 	var wteam, lteam, wid, lid;
				wteam = $(this).attr("data-teamname");
				lteam = otherteam.attr("data-teamname");
				wteamdata = data.teams[wteam];
				lteamdata = data.teams[lteam];
				wid = wteamdata.id;
				lid = lteamdata.id;

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
				$(".tiebreakers-explanation").empty();
				$(".tiebreakers-explanation").append("<div class='tiebreaker-title subtitle'>Divisional Tiebreakers:</div>");
				populateTables(data.teams);

			}

		 });

	});

});
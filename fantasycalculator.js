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

function tiebreakMultipleTeamsWC (wcteams) {
	var mostwins = 0, mwindex = 0;
	var eliminate = [];
	var winner;
	$.each(wcteams, function (key, team) {
		if(team.wins > mostwins) {
				if(key !== 0) eliminate.push(mwindex);
				mostwins = team.wins;
				mwindex = key;
		}
		else if(team.wins < mostwins) {
			eliminate.push(key);
		}
	});
	$.each(eliminate, function (key, val) {
		wcteams.splice(val,1);
	});
	if(wcteams.length === 1) {
		return wcteams[0];
	}
	if(wcteams.length === 2) {
		winner = tiebreakTwoTeamsWC(wcteams[0],wcteams[1]) -1;
		if(winner === 1) return wcteams[0];
		else return wcteams[1];
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
				console.log(val.fullname + " gets ahead of his opponents by having H2H wins against all of them!");
				return val;
			}
			else if(wincounts[key] === 0) {
				console.log(val.fullname + "is eliminated because he has zero H2H wins against his opponents!");
				eliminate.push(key);
			}
		});
		$.each(eliminate, function (key, val) {
			wcteams.splice(val,1);
		});
		if(wcteams.length === 1) {
			console.log(wcteams[0].fullname + " gets ahead of his opponents by having H2H wins against all of them!");
			return wcteams[0];
		}
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
			console.log(wcteams[0].fullname + " gets ahead of his opponents by scoring more points!");
			return wcteams[mpindex];
		}
	}
}

function tiebreakTwoTeamsWC (firstteam, secondteam){
	if(firstteam.wins > secondteam.wins) return 1;
	else if(firstteam.wins < secondteam.wins) return 2;
	else {
		if(firstteam.winlist[secondteam.id] > secondteam.winlist[firstteam.id]) {
			console.log(firstteam.fullname + " gets ahead of " + secondteam.fullname + " by H2H wins.");
			return 1;
		}
		else if(firstteam.winlist[secondteam.id] < secondteam.winlist[firstteam.id]) {
			console.log(secondteam.fullname + " gets ahead of " + firstteam.fullname + " by H2H wins.");
			return 2;
		}
		else {
			if(firstteam.points > secondteam.points) {
				console.log(firstteam.fullname + " gets ahead of " + secondteam.fullname + " by scoring more points.");
				return 1;	
			} 
			else if(firstteam.points < secondteam.points) {
				console.log(secondteam.fullname + " gets ahead of " + firstteam.fullname + " by scoring more points");
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
			console.log(firstteam.fullname + " gets ahead of " + secondteam.fullname + " by H2H wins.");
			return 1;
		}
		else if(firstteam.winlist[secondteam.id] < secondteam.winlist[firstteam.id]) {
			console.log(secondteam.fullname + " gets ahead of " + firstteam.fullname + " by H2H wins.");
			return 2;
		}
		else {
			if(firstteam.divwins > secondteam.divwins){
				console.log(secondteam.fullname + " gets ahead of " + firstteam.fullname + " by more divisional wins.");
				return 1;
			}
			else if(firstteam.divwins < secondteam.divwins){
				console.log(secondteam.fullname + " gets ahead of " + firstteam.fullname + " by more divisional wins.");
				return 2;
			}
			else {
				if(firstteam.points > secondteam.points) {
					console.log(firstteam.fullname + " gets ahead of " + secondteam.fullname + " by more points scored.");
					return 1;	
				} 
				else if(firstteam.points < secondteam.points) {
					console.log(secondteam.fullname + " gets ahead of " + firstteam.fullname + " by more points scored.");
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
		console.log(sorteddiv[0].fullname + " wins division by having more divisional wins!");
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
		console.log(sortediv[0].fullname " wins division by scoring more points!");
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
			console.log(sorteddiv[0].fullname " wins division by having more divisional wins!");
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
		var flag = 0
		if(key === 0) flag=1;
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
				if(flag === 1) {
					console.log("firstplacetiebreaker pushed " + team.fullname);
					console.log(team.fullname + " wins: " + team.wins);
					console.log("the leader: " + division[mwindex].fullname + " with " + mostwins + " wins");
				}
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
			if(flag === 1) console.log("secondplacetiebreaker pushed " + division[0].fullname + " and " + division[1].fullname);
			secondplacetiebreaker.push(division[0]);
			secondplacetiebreaker.push(division[1]);
		}
		if(flag === 1) console.log("going to tiebreakDivision with this order:" + sorteddiv[0].fullname + sorteddiv[1].fullname + sorteddiv[2].fullname);
		sorteddiv = tiebreakDivision(sorteddiv, firstplacetiebreaker, secondplacetiebreaker);
		var tableofdiv = key;
		$('table[data-id="' + tableofdiv + '"]').children("tbody").empty();
		$.each(sorteddiv, function (key, val){
			var position = key + 1;
			$('table[data-id="' + tableofdiv + '"]').children("tbody").append("<tr><th>" + position + "</th><td>" + val.fullname + "</td><td>" + val.wins + "-" + val.losses + "</td><td>" + val.divwins +"-" + val.divlosses + "</td><td>" + val.points + "</td><td></td></tr>");
		});
		
	});

}


$(document).ready(function() {
	var teamsjson = $.getJSON( "fantasycalculator.json", function (data) {
		populateTables(data.teams);
		$(".team").click(function() {
			if($(this).hasClass("active-toggle") === false) {
				$(this).addClass("active-toggle");
				$(this).addClass("is-danger");
				$(this).removeClass("is-primary");
				var otherteam;
				if($(this).hasClass("team1")) {
			 		var otherteam = $(this).siblings(".team2");
			 	}
			 	else if($(this).hasClass("team2")) {
			 		var otherteam = $(this).siblings(".team1");
			 	}
			 	otherteam.removeClass("active-toggle");
			 	otherteam.addClass("is-primary")
			 	otherteam.removeClass("is-danger");

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
				console.log(data.teams.crows, data.teams.ayranci);

			}

		 });

	});

});
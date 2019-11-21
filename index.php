<!DOCTYPE html>

<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta charset="utf-8" /> 
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css">
    	<script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
		<script type="text/javascript" src="fantasycalculator.js"></script>
		<link rel="stylesheet" type="text/css" href="fantasycalculator.css">
		<title>Playoff Machine</title>
	</head>
	<body>
		<section class="section">
			<div class="container">
				<div class="title week-title">YERLİ VE MİLLİ PLAYOFF MACHINE</div>
				<div class="subtitle week-title">Just pick the winners!</div> 
			</div>
		</section>
		<section class="section">
    		<div class="container" id="selectioncontainer">
    			<div class="columns" id="matchweeks">
  					<div class="column" id="matchweek12">
  						<div class="week-title subtitle is-centered">Week 12</div>
				    	<div class="buttons is-centered" id="w12m1">
				  			<button class="button   is-light team team1" id="luolwin1" data-teamname="luol">Luol Dengim Değilsin</button>vs
				 			<button class="button   is-light team team2" id="nokiawin1" data-teamname="nokia">İnce Nokia Chargers</button>
						</div>
						<div class="buttons is-centered" id="w12m2">
				  			<button class="button   is-light team team1" id="crowswin1" data-teamname="crows">Göztepe Crows</button>vs
				 			<button class="button   is-light team team2" id="heuvelringwin1" data-teamname="heuvelring">Heuvelring Mohair Goats</button>
						</div>
						<div class="buttons is-centered divisional" id="w12m3">
				  			<button class="button  is-light team team1" id="donkeyswin1" data-teamname="donkeys">Billionarie Donkeys</button>vs
				 			<button class="button  is-light team team2" id="ayranciwin1" data-teamname="ayranci">South Ayrancı Phrygians</button>
						</div>
						<div class="buttons is-centered divisional" id="w12m4">
				  			<button class="button is-light team team1" id="giselewin1" data-teamname="gisele">Gisele'in Askerleri</button>vs
				 			<button class="button is-light team team2" id="evliwin1" data-teamname="evli">Evli Mayfields</button>
						</div>
						<div class="buttons is-centered divisional" id="w12m5">
				  			<button class="button   is-light team team1" id="deliyurekwin1" data-teamname="deliyurek">DeliYürek MirOglusu</button>vs
				 			<button class="button   is-light team team2" id="blackeagleswin1" data-teamname="blackeagles">Wisconsin Blackeagles</button>
						</div>
						<div class="buttons is-centered divisional" id="w12m6">
				  			<button class="button   is-light team team1" id="killerswin1" data-teamname="killers">The Cereal Killers</button>vs
				 			<button class="button   is-light team team2" id="karsiyakawin1" data-teamname="karsiyaka">Karşıyaka 35,5ers</button>
						</div>
  					</div>
  					<div class="column" id="matchweek13">
  						<div class="week-title subtitle is-centered">Week 13</div>
   						<div class="buttons is-centered" id="w13m1">
				  			<button class="button   is-light team team1" id="deliyurekwin1" data-teamname="deliyurek">DeliYürek MirOglusu</button>vs
				 			<button class="button   is-light team team2" id="ayranciwin1" data-teamname="ayranci">South Ayrancı Phrygians</button>
						</div>
						<div class="buttons is-centered" id="w13m2">
				  			<button class="button   is-light team team1" id="killerswin1" data-teamname="killers">The Cereal Killers</button>vs
				 			<button class="button   is-light team team2" id="giselewin1" data-teamname="gisele">Gisele'in Askerleri</button>
						</div>
						<div class="buttons is-centered divisional" id="w13m3">
				  			<button class="button   is-light team team1" id="luolwin1" data-teamname="luol">Luol Dengim Değilsin</button>vs
				 			<button class="button   is-light team team2" id="karsiyakawin1" data-teamname="karsiyaka">Karşıyaka 35,5ers</button>
						</div>
						<div class="buttons is-centered divisional" id="w13m4">
				  			<button class="button   is-light team team1" id="donkeyswin1" data-teamname="donkeys">Billionaire Donkeys</button>vs
				 			<button class="button   is-light team team2" id="goztepewin1" data-teamname="crows">Göztepe Crows</button>
						</div>
						<div class="buttons is-centered divisional" id="w13m5">
				  			<button class="button   is-light team team1" id="nokiawin1" data-teamname="nokia">İnce Nokia Chargers</button>vs
				 			<button class="button   is-light team team2" id="evliwin1" data-teamname="evli">Evli Mayfields</button>
						</div>
						<div class="buttons is-centered divisional" id="w13m6">
				  			<button class="button   is-light team team1" id="blackeagleswin1" data-teamname="blackeagles">Wisconsin Blackeagles</button>vs
				 			<button class="button   is-light team team2" id="heuvelringwin1" data-teamname="heuvelring">Heuvelring Mohair Goats</button>
						</div>
 					</div>
 				</div>
 		   </div>
 		</section>
		<section class="section">
			<div class="container" id="tablecontainer">
				<div class="columns">
					<div class="column" id="division1" >
						<div class="divisionname subtitle">Division 1</div>
						<table class="table" data-id=0>
						<thead>
						    <tr>
						    	<th><abbr title="Position">Pos</abbr></th>
						    	<th>Team</th>
						    	<th><abbr title="Win-Loss">W-L</abbr></th>
						    	<th><abbr title="Divisional Win-Loss">Div W-L</abbr></th>
						    	<th><abbr title="Points Scores">Pts</abbr></th>
						     	<th>Playoffs?</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
						</table>
					</div>
					<div class="column" id="division2" >
						<div class="divisionname subtitle">Division 2</div>
						<table class="table" data-id=1>
						<thead>
						    <tr>
						    	<th><abbr title="Position">Pos</abbr></th>
						    	<th>Team</th>
						    	<th><abbr title="Win-Loss">W-L</abbr></th>
						    	<th><abbr title="Divisional Win-Loss">Div W-L</abbr></th>
						    	<th><abbr title="Points Scores">Pts</abbr></th>
						     	<th>Playoffs?</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
						</table>
					</div>
				</div>
				<div class="columns">
					<div class="column" id="division3" >
						<div class="divisionname subtitle">Division 3</div>
						<table class="table" data-id=2>
						<thead>
						    <tr>
						    	<th><abbr title="Position">Pos</abbr></th>
						    	<th>Team</th>
						    	<th><abbr title="Win-Loss">W-L</abbr></th>
						    	<th><abbr title="Divisional Win-Loss">Div W-L</abbr></th>
						    	<th><abbr title="Points Scores">Pts</abbr></th>
						     	<th>Playoffs?</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
						</table>
					</div>
					<div class="column" id="division4" >
						<div class="divisionname subtitle">Division 4</div>
						<table class="table" data-id=3>
						<thead>
						    <tr>
						    	<th><abbr title="Position">Pos</abbr></th>
						    	<th>Team</th>
						    	<th><abbr title="Win-Loss">W-L</abbr></th>
						    	<th><abbr title="Divisional Win-Loss">Div W-L</abbr></th>
						    	<th><abbr title="Points Scores">Pts</abbr></th>
						     	<th>Playoffs?</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
						</table>
					</div>
				</div>	
			</div>
		</section>
		<section class="section">
			<div class="container" id="explanationcontainer">
				<div class="columns is-centered">
					<div class="column tiebreakers-explanation is-centered">
					</div>
				</div>	
			</div>		
		</section>
	</body>
</html>
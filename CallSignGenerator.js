function gen(countryNumber){
	alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	output = document.getElementById('output');
	output.innerHTML = generateCallSign(countryNumber);

	// Generate the code
	function generateCallSign(country){

		// Choose which country we need
		switch(country){
			case 0:
				// Vale / UK
				return generateUK();
			break;
			case 1:
				// Atlas / US
				return generateUS();
			break;
			case 2:
				// Vacuo / India
				return generateIndia();
			break;
			case 3:
				// Mistral / Japan
				return generateJapan();
			break;
			case 4:
				// Menagerie / Brazil
				return generateBrazil();
			default:
				return "Error";
		}
	}

	function generateUK(){
		// Vale =  UK
		// Generate Prefix
		// Allowable prefixes (assuming full licence): G or M
		callSign = (Math.random() <= 0.5) ? "G" : "M";

		// Generate number
		// Rules: G0-8, M0, 1, 5
		if(callSign == "G"){
			callSign += Math.round(Math.random() * 8);
		} else {
			rand = Math.random();
			if(rand < 0.33){ 
				callSign += "0";
			} else if(rand < 0.66){ 
				callSign += "1";
			} else { 
				callSign += "5";
			}
		}

		// Generate Suffix
		// Rules: G1 + 3, G2 + 2/3, G3 + 2/3, G4 + 2/3, G5 + 2, G6 + 2/3,
		// G7 + 3, G8 + 2/3, G0 + 3, M0 + 3, M1 + 3, M5 + 3
		randsuff = Math.random();
		if(callSign.charAt(0) == "G"){
			if((callSign.charAt(1) == "1" ||
			   callSign.charAt(1) == "7" ||
			   callSign.charAt(1) == "0" ||
			   randsuff > 0.5) &&
			   callSign.charAt(1) != "6"){
				for (var i = 0; i < 3; i++) {
					callSign += alphabet.charAt(Math.round(Math.random() * 25));
				}
			} else {
				for (var i = 0; i < 2; i++) {
					callSign += alphabet.charAt(Math.round(Math.random() * 25));
				}
			}
		} else {
			for (var i = 0; i < 3; i++) {
				callSign += alphabet.charAt(Math.round(Math.random() * 25));
			}
		}

		return callSign;
	}

	function generateUS() {
		// Atlas = US
		// Generate Prefix
		// Allowable prefixes: first character must be K, N, W, AA-AL,
		// KA - KZ, NA - NZ, or WA - WZ
		pl = Math.random();
		if(pl < 0.2){
			rand = Math.random();
			if(rand < 0.33){ 
				callSign = "K";
			} else if(rand < 0.66){ 
				callSign = "N";
			} else { 
				callSign = "W";
			}
		} else {
			rand = Math.random();
			rand2 = Math.random();
			if(rand < 0.25){ 
				callSign = "K";
				callSign += alphabet.charAt(Math.round(rand2 * 25));
			} else if(rand < 0.50){ 
				callSign = "N";
				callSign += alphabet.charAt(Math.round(rand2 * 25));
			} else if(rand < 0.75){ 
				callSign = "W";
				callSign += alphabet.charAt(Math.round(rand2 * 25));
			} else {
				callSign = "A"
				callSign += alphabet.charAt(Math.round(rand2 * 11));
			}
		}
		// Generate Number
		// Rules: Anything goes
		callSign += Math.round(Math.random() * 9);

		// Generate Suffix
		// Rules: 1, 2, 3.  3x can't start with X
		randsl = Math.random() * 3;
		if(randsl < 0.7){
			sl = 3;
		} else if (randsl < 0.95) {
			sl = 2;
		} else {
			sl = 1;
		}
		if(sl == 3 && callSign.length == 3){
			rand = Math.round(Math.random() * 24);
			if(rand > 22){
				callSign += alphabet.charAt(rand + 1);
			} else {
				callSign += alphabet.charAt(rand);
			}
			sl--;
		}
		for (var i = 0; i < sl; i++) {
			callSign += alphabet.charAt(Math.round(Math.random() * 25));
		}

		return callSign;
	}

	function generateIndia(){
		// Vacuo = India
		// Generate Prefix
		// Allowable prefixes: VU
		callSign = "VU"

		// Generate Number
		// Rules: Either 1 or 2
		callSign += (Math.random() > 0.5) ? "1" : "2";

		// Generate Suffix
		// Rules: x2 or x3 anything goes
		if(Math.random() < 0.909){
			for (var i = 0; i < 3; i++) {
				callSign += alphabet.charAt(Math.round(Math.random() * 25));
			}	
		} else {
			for (var i = 0; i < 2; i++) {
				callSign += alphabet.charAt(Math.round(Math.random() * 25));
			}
		}

		return callSign;
	}

	function generateJapan(){
		// Kingdom = Country
		// Generate Prefix
		// Allowable prefixes: JA, JR, JD (for individuals)
		rand = Math.random();
		if(rand < 0.66){ 
			callSign = "JA"
		} else if(rand < 0.866){ 
			callSign = "JD"
		} else { 
			callSign = "JR"
		}

		// Generate Number
		// Rules: Anything goes (for individuals)
		callSign += Math.round(Math.random() * 9)

		// Generate Suffix
		// Rules: Mostly 2x3 anything goes, a few 2x2 anything goes
		randsl = Math.random();
		if(randsl < 0.9){
			for (var i = 0; i < 3; i++) {
				callSign += alphabet.charAt(Math.round(Math.random() * 25));
			}
		} else {
			for (var i = 0; i < 2; i++) {
				callSign += alphabet.charAt(Math.round(Math.random() * 25));
			}
		}
		return callSign;
	}

	function generateBrazil(){
		// Kingdom = Country
		// Generate Prefix
		// Allowable prefixes: PP - PY, by location - there's going to be
		// some spooky stuff here
		brazilList = "PQRSTVWY"
		callSign = "P"
		rand = Math.floor(Math.random() * brazilList.length);
		callSign += brazilList.charAt(rand);
		// Generate Number
		// Rules: 
		switch(callSign.charAt(1)){
			case "P":
				plist = "125678";
				callSign += randFromString(plist)
			break;
			case "Q":
				qlist = "28";
				callSign += randFromString(qlist)
			break;
			case "R":
				rlist = "78"
				callSign += randFromString(rlist)
			break;
			case "S":
				slist = "78"
				callSign += randFromString(slist)
			break;
			case "T":
				tlist = "278";
				callSign += randFromString(tlist)
			break;
			case "V":
				callSign += "8"; 
			break;
			case "W":
				callSign += "8";
			break;
			case "Y":
				ylist = "0123456789";
				callSign += randFromString(ylist)
			break;
			default:
			console.log("Uh OH!");
			return "Error";
		}
		// Generate Suffix
		// Rules: Anything goes, probably(?)
		for (var i = 0; i < 3; i++) {
			callSign += alphabet.charAt(Math.round(Math.random() * 25));
		}		

		return callSign;

	}

	function randFromString(list) {
		return list.charAt(Math.floor(Math.random() * list.length));
	}

	function generateTemplate(){
		// Kingdom = Country
		// Generate Prefix
		// Allowable prefixes: 

		// Generate Number
		// Rules: 

		// Generate Suffix
		// Rules: 

	}
}
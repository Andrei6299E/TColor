  ////////////////////  ctx - drawing color
  // Initial Canvas //  xtc - screenshot (DOM hide)
  ////////////////////
var imgS = new Image();
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var topColor = [];
var clr = document.getElementById('clr');
var idList = ['clr-one', 'clr-two', 'clr-three', 'clr-four', 'clr-five'] // all id cart
var idNumber = -1
var ds = new Date() 
number = localStorage.getItem('number')?localStorage.getItem('number'):5

document.getElementById('btn-start').onclick = function(){
	//takeImage()
	menageImage(5)
}


// Click to color and clickToCopy()
clr.onclick = function(e){
	var className = e.path[1].className;
	if (className === 'rgb') {
		clickToCopy('rgb')
	} else if (className === 'hex') {
		clickToCopy('hex')
	}
}

clr.onmouseover = function(e) {
	var idThisCart = e.target.id;
	if (e.fromElement.nodeName !== 'LI') {
		zoomColorCart(idThisCart)
	}
}

document.getElementById('btn-setting').onclick = function(){
	placeRight()
	settingShow()
}

lStorage('get')
  /////////////
  // Initial //
  /////////////
/*
imgS.onload = function() {
	console.log('loading image ... OK!')
	menageImage(5)
}
*/

   //////////////////////  
   // Screenshot Image //  return img
   //////////////////////
/*
function takeImage() {
	console.log('function takeImage()')
	chrome.tabs.captureVisibleTab(
		null,
		{},
		function(dataUrl){
			imgS.src = dataUrl;
			ctx.drawImage(imgS,0,0)
		}
	);
}
*/

   ///////////////// attr : (numberColor1, numbetColor2, ?defferince)
   // Seems color // !defferince?
   /////////////////
function seems(nc1, nc2, def) {
	var temp = Math.abc(nc1 - nc2);
	if (!def) def = 40;
	return temp < def
}

  //////////////////  img to let arrayColor
  // img To array //  return colorTop
  //////////////////  attr : (numberTopElment)
function menageImage(number) {
	arr = [[252,255,255],[238,238,28],[100,205,30],[10,110,110],[234,200,200],[1,1,1],[23,25,67],[230,200,238],[145,100,230],[230,230,100]]
	drawCart(arr.slice(0,number))
	lStorage('set',arr)
}
 /*
}
function menageImage(number) {
	console.log('function menageImage()')
	var arrayColorSrc = [];
	//var arrayColorNS = [];
	//var arrayColorR = [];
	var arrayColor = {};        // All array color {['color'],...}
	var arrayColorTop = {};     // Mirror arrayColor {'numberDef':'color',...}
	var arrayColorTopKeys = []; // Keys arrayColorTop {['numberDef'],...}
	//var arrayCM = {}
	var aH = imgS.height; // Height img
	var aW = imgS.width;  // Width  img
	var len = 0;
	//var lenR = 0;
	topColor = [];
	// Create array color (0,0,0,0) in arrayColorSrc
	for (var i = 0; i < aH; i++) {
		for (var n = 0; n < aW; n++) {
			var pixel = ctx.getImageData(n,i,1,1);
			var temp = [pixel.data[0], pixel.data[1], pixel.data[2]]
			arrayColorSrc.push(temp)
			len++
		}
	}
	console.log('Creative \'arrayColorSrc[]\' - OK!')
	console.log('var len = ' + len + '  // arrayColorSrc.length')

	// for arrayColor object 
	for (var i = 0; i < len; i++) {
		if (arrayColorSrc[i] in arrayColor) {
			arrayColor[arrayColorSrc[i]]++
		} else {
			arrayColor[arrayColorSrc[i]] = 1
		}
	}
	console.log('Creative \'arrayColor{}\' - OK!')

	// For arrayColorMirror
	for (i in arrayColor) {
		arrayColorTop[arrayColor[i]] = i
		arrayColorTopKeys.push(arrayColor[i])
	}

	// Function  Sort
	function sIncrease(i, ii) { // По возрастанию
		if (i > ii)
 		return 1;
 		else if (i < ii)
 		return -1;
 		else
 		return 0;
	}
	arrayColorTopKeys.sort(sIncrease).reverse()
	
	function see(arr,clr) {
		console.log('function see(arr, ' + clr + ')')
		var val = 5; /// value !!
		var sc = clr.split(',')
		var len = Object.keys(arr).length
		var ii = 0
		for (var i = 0; i < len; i++) {
			var zam = 0
			var sa = arr[i].split(',')
			for (var z = 0; z < 3; z++) {
				var temp = parseInt(sa[z]) - parseInt(sc[z])
				if (Math.abs(temp) < val) zam++
				if (zam === 2) return false
			}	
		}
		return true
	}

	//
	function diffirentColor(number) {
		console.log('function differentColor('+number+')')
		var colorReturn = [];
		var i = 0, n = 0;
		while (number !== n) {
			var cT = arrayColorTop[arrayColorTopKeys[i]] // = [str,str,str]
			if (!i) {
				colorReturn.push(cT)
				i++
				n++
			} else if (see(colorReturn,cT)) {
				colorReturn.push(cT)
				i++
				n++
			} else {
				i++
			};
		}
		return colorReturn
	}
	
	draw = diffirentColor(number)
}
*/

function drawAllRect(colorArr,n) {
	console.log('function drawAllRect( '+colorArr,n+')')
	ul = document.getElementById('ul')
	while (n) {
		n--
		li = document.createElement('li')
		li.innerHTML = colorArr[n]
		li.id = n
		ul.appendChild(li)
		document.getElementById(n).style.backgroundColor = 'rgb'+colorArr[n];
	}
}





	//////////////////////////////////
	// Mouse over cart. Cart zoomx2 //
	//////////////////////////////////
function zoomColorCart(id){
	var elemA = 5, elemB = 5; // eleent zoomx0.5, left, right.
	for (var i = 0; i < idList.length; i++) { // number id in idList
		if (idList[i] === id) {
			idNumber = i
			var elem = document.getElementById(id) // hiver Cart is DOM
			if (idNumber !== 0) elemB = document.getElementById(idList[idNumber-1]) //  Left of hover cart
			if (idNumber !== 4) elemA = document.getElementById(idList[idNumber+1]) //  Right of hover cart

			// resize elements
			elem.style.width = '78px'; // widthx2
			if (idNumber !== 0) elemB.style.width = '33px'; // Left element widthx0.5
			if (idNumber !== 0) clr.style.left = '25px'     // Left size is not element number 0 
			if (idNumber === 0) clr.style.left = '10px'     // Hover element number 0, left ul is 10px moving
			if (idNumber !== 4) elemA.style.width = '33px'; // right element widthx0.5
			// All elment width normal, not hover
			for (var i = 0; i < idList.length; i++) {  
				var eN = document.getElementById(idList[i])
				if (eN === elem) continue
				if (eN === elemA || eN === elemB) continue
				eN.style.width = '48px';
			}
			rbgHex(elem)

		}
	}			
}

	////////////////////////////////////////////////////////////
	// Color cart magical transformation and fill rgb and hex //
	////////////////////////////////////////////////////////////
function drawCart(arrayColor) {
	var element = document.getElementById('clr').getElementsByTagName('LI')
	for (var i = 0; i < arrayColor.length; i++) {
		element[i].style.display = 'inline-block'
		element[i].style.backgroundColor = 'rgb('+arrayColor[i]+')'
	}
}
// Magick RBG color to HEX !
function rgbToHex(rgbClr) {
	rgbClr = rgbClr.split(',')
		function componentToHex(c) {
		    var hex = c.toString(16);
		    return hex.length == 1 ? "0" + hex : hex;
		}
    return "#" + componentToHex(parseInt(rgbClr[0])) + componentToHex(parseInt(rgbClr[1])) + componentToHex(parseInt(rgbClr[2]));
}
// Cart write rgb and hex color
function rbgHex(dom) {
	var color = dom.style.backgroundColor
	for (var i = 0; i < 5; i++) {
		document.getElementsByClassName('rgb')[i].style.display = 'none'
		document.getElementsByClassName('hex')[i].style.display = 'none'
	}
	dom.getElementsByClassName('rgb')['0'].style.display = 'block';
	dom.getElementsByClassName('hex')['0'].style.display = 'block';
	dom.getElementsByClassName('rgb')['0'].getElementsByClassName('clr-rgb-value')[0].innerHTML = color.slice(4,-1);
	dom.getElementsByClassName('hex')['0'].getElementsByClassName('clr-hex-value')[0].innerHTML = rgbToHex(color.slice(4,-1));
}

	//////////////////////////////
	//  Local storage Function  //
	//////////////////////////////
function lStorage(action, arrClr) {
	function arrToString(arr) {
		var s = '';
		for (var i = 0; i < arr.length; i++) {
			s += arr[i]+';'
		}
		return s
	}
	function stringToArray(str) {
		var a = [];
		str = str.split(';')
		for (var i = 0; i < str.length; i++) {
			if (!str[i]) return a
			a.push(str[i].split(','))
		}
		return a
	}

	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    	tabUrl = tabs[0].url;
    	if (action === 'get' && localStorage.getItem(tabUrl) && ds.getTime() - localStorage.getItem(tabUrl+'time') < 60000) {
    		var timeago = (ds.getTime() - localStorage.getItem(tabUrl+'time')) / 1000
    		document.getElementById('time').innerHTML = 'Load result ' + timeago.toFixed(1) + ' seconds ago.'
	        drawCart(stringToArray(localStorage.getItem(tabUrl)).slice(0,number));                 // Gracia!!! Return array the city color in array Local
	    }

    	if (localStorage.getItem('names')) {
			var arrNames = localStorage.getItem('names').split(','); // arr [name1, name2,...]
	    } else {
	    	var arrNames = []
	    }
	    var objNames = {};                                       // obj names = [color1, color2,...]
	    for (var i = 0; i < arrNames.length; i++) {
	    	var t = arrNames[i]
	    	if (localStorage.getItem(arrNames[i])) {
	    		var z = localStorage.getItem(arrNames[i]).split(',');
	    	} else {
	    		var z = [',,']
	    	}
	        objNames.t = z
	    }
	    if (action === 'set') {                           		 // get
	    	arrClr = arrToString(arrClr)
	    	if (!arrNames.length) saveSiteInLocalStorage() // ZERO
			for (var i = 0, s = 1; i < arrNames.length; i++) {
				if (tabUrl === arrNames[i]) s--
			}
			if (s) saveSiteInLocalStorage()
			function saveSiteInLocalStorage() {
	        	if (arrNames.length >= 20) {                         // full memory? >20
		            localStorage.removeItem(arrNames[0]);
		            localStorage.removeItem(arrNames[0]+'time');
		            arrNames.shift();
		        }
		        arrNames.push(tabUrl);
	        }
	        localStorage.setItem('names', arrNames)
	        localStorage.setItem(tabUrl,arrClr)
	        localStorage.setItem(tabUrl+'time',ds.getTime())
	        document.getElementById('time').innerHTML = ''
	        return true
	    }
	})
}	
	/////////////////////////// attr : 'rgb' | 'hex' 
	//  Click to COPY color  //
	///////////////////////////

function clickToCopy(nameColor) {
	if (nameColor === 'rgb') {
		var divElem = document.getElementById(idList[idNumber]).getElementsByClassName('clr-rgb-value')[0]
		var prevElem = divElem.innerHTML
		divElem.innerHTML = 'rgb('+divElem.innerHTML+')'
	} else if (nameColor === 'hex') {
		var divElem = document.getElementById(idList[idNumber]).getElementsByClassName('clr-hex-value')[0]
		var prevElem = divElem.innerHTML
	}
	var range = document.createRange();  
  	range.selectNode(divElem);  
  	window.getSelection().addRange(range); 
	document.execCommand('copy', true);
	window.getSelection().removeAllRanges();
	divElem.innerHTML = '<p style="color: grey; font-weight: blod">copy</p>'
	setTimeout(function() {
		divElem.innerHTML = prevElem
	}, 500);
};

function placeRight() {
	var pr = document.getElementById('place-right')
	if (pr.offsetWidth === 20) {
		pr.style.width = '300px';
		pr.style.left = '30px';
		pr.style.backgroundColor = '#B8B8B8';
	} else {
		pr.style.width = '20px';
		pr.style.left = '310px';
		pr.style.backgroundColor = '#DDDDDD';
	}
}

function settingShow() {
	var st = document.getElementById('setting');
	if (st.style.display === 'none' || !st.style.display) {
		st.style.display = 'block'
	} else {
		st.style.display = 'none'
	}
}

placeRight()
settingShow()
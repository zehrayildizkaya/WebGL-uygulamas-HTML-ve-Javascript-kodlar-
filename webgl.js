
//İSMİM 'ZEHRA YILDIZ'
//SOYİSMİM 'KAYA'
//Z VE K HARFLERİNİ YAPTIM

var gl;
var boyut;
var boyutLoc;
var theta;
var thetaLoc;
var otele;
var oteleLoc;
var delay= 50;



function buttonBoyutArtirma(){
	boyut[0]  *=1.1;
	boyut[1]  *=1.1;
	
}

function buttonBoyutAzalt(){
	boyut[0] *=0.9;
	boyut[1] *=0.9;
}


window.onload = function init() {

	const canvas = document.querySelector("#glcanvas");
	// Initialize the GL context
	gl = WebGLUtils.setupWebGL(canvas);
	// Only continue if WebGL is available and working
	if (!gl) {
	alert("Unable to initialize WebGL. Your browser or machine may not support it.");
	return;
	}
  
	var program = initShaders(gl, "vertex-shader", "fragment-shader")
	gl.useProgram( program );
	
	
	var myButton = document.getElementById("BoyutArtir"); 
	myButton.addEventListener("click", buttonBoyutArtirma);
			
	var myButton = document.getElementById("BoyutAzalt"); 
	myButton.addEventListener("click", buttonBoyutAzalt);
	
	document.getElementById("slide").onchange = function() {boyut[0] = 1.1 * this.value;
	boyut[1]= 1.1* this.value;};
	

	var menu = document.getElementById("mymenu");
	menu.addEventListener("click", function() {
		switch (menu.selectedIndex) {
			case 0:
				theta += -0.1;
				break;
			case 1:
				theta += 0.1;
				break;
		}
	});
	
	window.addEventListener("keydown", 
   function() {
      switch (event.keyCode) {
         case 49: // ’1’ key
            otele[0] += 0.1;
            break;
         case 50: // ’2’ key
            otele[0] -=0.1;
            break;
         case 51: // ’3’ key
            otele[1] +=0.1;
            break;
		case 52:
			otele[1] -=0.1;
			break;
      }
   });
	
	
	var vect =  [	//Z HARFİ
				vec2(-0.7, 0.8),
				vec2(-0.1, 0.8),
				vec2(-0.1, 0.65),
				vec2(-0.7, 0.65),
				
				vec2(-0.25, 0.65),
				vec2(-0.1, 0.65),
				vec2(-0.55, -0.1),
				vec2(-0.7, -0.1),
				
				vec2(-0.7, -0.1),
				vec2(-0.1, -0.1),
				vec2(-0.1, -0.25),
				vec2(-0.7, -0.25),
				
				//A HARFİ
				vec2(0.27, 0.8),
				vec2(0.42, 0.8),
				vec2(0.15, -0.25),
				vec2(0.0, -0.25),
				
				vec2(0.27, 0.8),
				vec2(0.42, 0.8),
				vec2(0.7, -0.25),
				vec2(0.55, -0.25),
				
				vec2(0.15, 0.2),
				vec2(0.55, 0.2),
				vec2(0.55, 0.07),
				vec2(0.15, 0.07),
				
	];
	

	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vect), gl.STATIC_DRAW );
	
	
	// Associate out shader variables with our data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	thetaLoc = gl.getUniformLocation(program, "theta");
	theta = 0;
	gl.uniform1f(thetaLoc, theta);
	
	boyutLoc = gl.getUniformLocation(program, "boyut");
	boyut = [1, 1 ,1, 1];
	gl.uniform4f(boyutLoc, boyut[0], boyut[1] , boyut[2], boyut[3]);
	

	
	oteleLoc = gl.getUniformLocation(program, "otele");
	otele = [0, 0,0,0];
	gl.uniform4f(oteleLoc, otele[0], otele[1], otele[2], otele[3]);
	
	// Set clear color to black, fully opaque
	gl.clearColor(0.0, 1.0, 0.0, 0.4);
	render();
	
	
};

function render(){
	setTimeout(function(){
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.uniform4f(boyutLoc, boyut[0], boyut[1] , boyut[2], boyut[3]);
	gl.uniform4f(oteleLoc, otele[0], otele[1], otele[2], otele[3]);
	gl.uniform1f(thetaLoc, theta);
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	gl.drawArrays( gl.TRIANGLE_FAN, 4, 4 );
	gl.drawArrays( gl.TRIANGLE_FAN, 8, 4 );
	gl.drawArrays( gl.TRIANGLE_FAN, 12, 4 );
	gl.drawArrays( gl.TRIANGLE_FAN, 16, 4 );
	gl.drawArrays( gl.TRIANGLE_FAN, 20, 4 );
	requestAnimFrame(render);
	}, 
	delay);
}
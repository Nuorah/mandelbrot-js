const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var myImageData = ctx.createImageData(800, 800);
var pixel = ctx.getImageData(320,240, 1, 1);
var data = myImageData.data

console.log(canvas.width)


var zoom = 4
var scalex = zoom/canvas.width
var scaley = zoom/canvas.height
var vertical = canvas.height/2
var horizontal = canvas.width/2


var drawFract = function() {

for(var x = 0; x < canvas.width; x+=1) {
	for (var y = 0; y < canvas.height; y+=1) {
		var cx = (y - horizontal)*scalex 

		var cy = (x - vertical)*scaley

		var i = 0;
		var zx = 0;
		var zy = 0;
		while (i < 255 && (zx**2 + zy**2) <= 4) {
			var oldzx = zx
			var oldzy = zy
			zx = zx**2 - zy**2 + cx;
			zy = 2*oldzx*zy + cy;
			i+=1;
		}
		data[4*x*canvas.width + 4*y] = 255-i
		data[4*x*canvas.width + 4*y+1] = 255-i
		data[4*x*canvas.width + 4*y+2] = 255-i
		data[4*x*canvas.width + 4*y+3] = i

	}
}

ctx.putImageData(myImageData, 0, 0);
}

drawFract();

const zoomin = document.getElementById('zoomin');

zoomin.addEventListener('click', event => {
  zoom = zoom / 1.5;
  scalex = zoom/canvas.width
  scaley = zoom/canvas.height
  drawFract();
});

const zoomout = document.getElementById('zoomout');

zoomout.addEventListener('click', event => {
  zoom = zoom * 1.5;
  scalex = zoom/canvas.width
  scaley = zoom/canvas.height
  drawFract();
});

const moveright = document.getElementById('moveright');

moveright.addEventListener('click', event => {
  horizontal = horizontal + canvas.width*0.1
  drawFract();
});

const moveleft = document.getElementById('moveleft');

moveleft.addEventListener('click', event => {
  horizontal = horizontal - canvas.width*0.1
  drawFract();
});






console.log(myImageData)
console.log(pixel)
console.log(data)
console.log(ctx)
console.log(ctx.getImageData(0, 0, 640, 480))



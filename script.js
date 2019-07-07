const canvas = document.getElementById('draw'); //grab the canvas element
const ctx = canvas.getContext('2d'); //getting context to draw onto
const range = document.querySelector('.picker-slider');
const clear = document.querySelector('.clear');

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
const rect = canvas.getBoundingClientRect();
canvas.width = rect.width;
canvas.height = rect.height;

const dpRatio = window.devicePixelRatio;
canvas.width = rect.width * dpRatio;
canvas.height = rect.height * dpRatio;

ctx.scale(dpRatio, dpRatio);

ctx.strokeStyle = '#BADA55'; //color to start with
ctx.lineJoin = 'round'; //miter, bevel and round
ctx.lineCap = 'round'; //round and square
ctx.lineWidth = 5;
ctx.fillStyle = 'rgb(255,255,255)';
ctx.fillRect(0,0,canvas.width,canvas.height);

let isDrawing = false;
let lastX = 0;
let lastY = 0; //cordinates upto where we draw our line

//window.onresize

function draw(e) {
    if(!isDrawing) return; //if not drawing do not run the function
    ctx.beginPath(); //initiate drawing
    ctx.moveTo(lastX, lastY); //start from here
    ctx.lineTo(e.offsetX, e.offsetY); //upto here
    ctx.stroke(); // make line visible
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }

function colorSelector(e) {
  ctx.strokeStyle = this.dataset.color;
  document.documentElement.style.setProperty('--color-selected', `${this.dataset.color}`);
}

function rangeUpdate() {
  ctx.lineWidth = this.value;
  document.documentElement.style.setProperty('--width-selected', `${this.value}px`);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function takePhoto(){
  var download = document.getElementById("download");
        var image = canvas.toDataURL("image/jpeg")
                    .replace("image/jpeg", "image/octet-stream");
        download.setAttribute("href", image);
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
    isDrawing=true;
    [lastX, lastY] = [e.offsetX, e.offsetY]; //as soon as mouse hit the canvas update out last X & Y
    });
canvas.addEventListener('mouseup', () => isDrawing=false);
canvas.addEventListener('mouseout', () => isDrawing=false);

const colors = Array.from(document.querySelectorAll('.picker-color'));
colors.forEach(color => color.addEventListener('change', colorSelector));

range.addEventListener('click', rangeUpdate);
range.addEventListener('mousemove', rangeUpdate);
clear.addEventListener('click', clearCanvas);



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////FOR MOBILE DEVICES/////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Touch support still to be added
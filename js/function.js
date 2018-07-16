function $(x) {
    return document.getElementById(x);
}
var canvas;
var ctx;
var actualFunction;
var axes;

function fun1(x) {return Math.cos(x-1);  }
function fun2(x) {return 2*Math.sin(x/3)+Math.cos(3*x-2);}
function fun3(x) {return x*x -x -2.1;}
function fun4(x) { return Math.exp(x)/2-2;}
function fun5(x) {return x*x*x/5 -x*x + x +3;}

function drawFunction() {
    clearCanvas();

    var xscale = $("xscale").value;
    var yscale = $("yscale").value;

    axes={}
    axes.x0 = .5 + .5*canvas.width;  // x0 pixels from left to x=0
    axes.y0 = .5 + .5*canvas.height; // y0 pixels from top to y=0
    axes.xscale = xscale;
    axes.yscale = yscale;
    axes.doNegativeX = true;

    var dot1x = parseFloat($("dot1").value)
    var dot2x = parseFloat($("dot2").value)

    var dot1=createDot(dot1x, actualFunction);
    var dot2=createDot(dot2x, actualFunction);

    showAxes();
    funGraph(actualFunction,"red",1);
    
    lineGraph(dot1, dot2, "blue",3);

    dotGraph(dot1, "black", 3);
    dotGraph(dot2, "black", 3);

    $("dot1info").innerHTML = "X<sub>1</sub> = "+ dotXRealValue(dot1x).toFixed(3) + ", Y<sub>1</sub> = " + dotYRealValue(dot1x, actualFunction).toFixed(5)
    $("dot2info").innerHTML = "X<sub>2</sub> = "+ dotXRealValue(dot2x).toFixed(3) + ", Y<sub>2</sub> = " + dotYRealValue(dot2x, actualFunction).toFixed(5) + ")"
}

function createDot(x, func) {
    var dot={};
    dot.x=x;
    dot.y=axes.yscale*func(x/axes.xscale);
    return dot;
}

function clearCanvas() {
    if (null==canvas || !canvas.getContext) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function lineGraph(dot1, dot2, color, thick) {
    var x0=axes.x0, y0=axes.y0;
    
    ctx.beginPath();
    ctx.lineWidth = thick;
    ctx.strokeStyle = color;

    ctx.moveTo(x0+dot1.x, y0-dot1.y);
    ctx.lineTo(x0+dot2.x, y0-dot2.y);
    ctx.stroke();
}

function dotGraph(dot, color, thick) {
    var xx=dot.x, yy=dot.y, x0=axes.x0, y0=axes.y0, xscale=axes.xscale, yscale=axes.yscale;
    
    ctx.beginPath();
    ctx.lineWidth = thick;
    ctx.strokeStyle = color;

    ctx.arc(x0+xx, y0-yy,thick,0,2*Math.PI);

    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}

function funGraph (func,color,thick) {
    var xx, yy, dx=4, x0=axes.x0, y0=axes.y0, xscale=axes.xscale, yscale=axes.yscale;
    var iMax = Math.round((ctx.canvas.width-x0)/dx);
    var iMin = axes.doNegativeX ? Math.round(-x0/dx) : 0;
    ctx.beginPath();
    ctx.lineWidth = thick;
    ctx.strokeStyle = color;

    ctx.moveTo(x0+xx,y0-yy);
    for (var i=iMin;i<=iMax;i++) {
        xx = dx*i; yy = yscale*func(xx/xscale);
        ctx.lineTo(x0+xx,y0-yy);
    }
    ctx.stroke();
}

function showAxes() {
    var x0=axes.x0, w=ctx.canvas.width;
    var y0=axes.y0, h=ctx.canvas.height;
    var xmin = axes.doNegativeX ? 0 : x0;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(0,0,0)"; 
    ctx.moveTo(xmin,y0); ctx.lineTo(w,y0);  // X axis
    ctx.moveTo(x0,0);    ctx.lineTo(x0,h);  // Y axis
    ctx.stroke();
}

function modifyDotLocations(e) {
    var oldXScale = axes.xscale
    var newXScale = $("xscale").value

    var dot1OldValue = $("dot1").value
    var dot2OldValue = $("dot2").value

    $("dot1").value = (dot1OldValue*newXScale)/oldXScale
    $("dot2").value = (dot2OldValue*newXScale)/oldXScale
}
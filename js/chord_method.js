var zero
var end = false
var autoRun = false
var SEMAPHORE = {UP:0, DOWN:1}
var interval

function automaticChordMethod() {
    autoRun = true
    $("stop").disabled = false
    chordSemaphore(SEMAPHORE.DOWN)
    $("zeroinfo").innerHTML=""

    interval = setInterval(() => {
        chordMethod()
        
        if(end) {
            stop()
        }
        setTimeout(() => {
            drawFunction()
        }, parseInt($("speed").value)/2)
    }, parseInt($("speed").value))
    autoRun = false
    
}

function chordMethod() {
    if(end) {
        end = false
        $("zeroinfo").innerHTML=""
    }
    var dot1 = createDot(parseFloat($("dot1").value), actualFunction)
    var dot2 = createDot(parseFloat($("dot2").value), actualFunction)

    if(dot1.y*dot2.y>=0) {
        alert("A húrmódszer indításához a kezdőpontokban felvett függvényértékek eltérő előjelűek kellenek legyenek!")
        end = true
        return
    }

    var chordZero = calculateZeroValueOfChord(dot1, dot2)

    drawVerticalLine(chordZero.x, "yellow", 1)
    drawHelpingDots(chordZero)
    changeDotToEstimatedOne(chordZero);
    displayNewEstimation(chordZero)

    if(zero === chordZero.x || Math.abs(chordZero.y) < parseFloat($("approx").value)) {
        alert("Iteration has stopped!")
        end = true
        drawFunction()
        return;
    }
    zero = chordZero.x

    if(!autoRun) {
        setTimeout(() => {
            drawFunction()
        }, parseInt($("speed").value)/2);
    }
}

function dotYRealValue(x, func) {
    return func(x/axes.xscale)
}

function dotXRealValue(x) {
    return x/axes.xscale
}

function calculateZeroValueOfChord(dot1, dot2) {
    var a = Math.abs(dot1.y-dot2.y)
    var b = Math.abs(dot2.y)
    var ratio = b/a

    var dot = {}
    dot.x = (ratio*dot1.x + (1-ratio)*dot2.x)
    dot.y = axes.y0
    return dot
}

function drawVerticalLine(x, color, thick) {
    var dot1 = {}, dot2 = {}
    dot1.x = x
    dot1.y = -1000
    dot2.x = x
    dot2.y = 1000
    lineGraph(dot1, dot2, color, thick)
}

function drawHelpingDots(dot) {
    dot.y = parseFloat(dotYRealValue(dot.x, actualFunction))
    dotGraph(dot, "grey", 3)
    var newDot = createDot(dot.x, actualFunction)
    dotGraph(newDot, "red", 3)
}

function changeDotToEstimatedOne(dot) {
    if(dotYRealValue(parseFloat($("dot1").value), actualFunction) > 0) { 
        dot.y > 0 ? $("dot1").value=parseFloat(dot.x) : $("dot2").value=parseFloat(dot.x)
    } else {
        dot.y > 0 ? $("dot2").value=parseFloat(dot.x) : $("dot1").value=parseFloat(dot.x)
    }
}

function displayNewEstimation(dot) {
    $("zeroinfoheader").innerHTML = "Zero locus estimation:"
    var node=document.createElement("LI")
    var textnode=document.createTextNode("X: " + dotXRealValue(dot.x).toFixed(3) + ", Y: " + dotYRealValue(dot.x, actualFunction).toFixed(5))
    node.appendChild(textnode)
    $("zeroinfo").appendChild(node)
}
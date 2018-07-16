function draw(func) {
    canvas = $("canvas")
    ctx=canvas.getContext("2d")

    actualFunction=func
    addEventListeners()
    enableButtons()
    cleanPage()
    drawFunction()
}

function stop() {
    clearInterval(interval)
    chordSemaphore(SEMAPHORE.UP)
    $("stop").disabled = true
    console.log("STOP")
}

function addEventListeners() {
    $("xscale").addEventListener("input", function(e) {
        modifyDotLocations(e)
        drawFunction()
    }, false)

    $("yscale").addEventListener("input", function(e) {
        modifyDotLocations(e)
        drawFunction()
    }, false);

    $("dot1").addEventListener("input", function(e) {
        drawFunction()
    }, false)

    $("dot2").addEventListener("input", function(e) {
        drawFunction()
    }, false)
}

function enableButtons() {
    $("chordmethod").disabled = false
    $("autochord").disabled = false
}

function disableButtons() {
    $("chordmethod").disabled = true
    $("autochord").disabled = true
}

function enableDotRanges() {
    $("dot1").disabled = false
    $("dot2").disabled = false
}

function disableDotRanges() {
    $("dot1").disabled = true
    $("dot2").disabled = true
}

function disableSpeed() {
    $("speed").disabled = true
}

function enableSpeed() {
    $("speed").disabled = false
}

function cleanPage() {
    $("xscale").value = 50
    $("yscale").value = 50

    $("dot1").value = -100
    $("dot2").value = 100
    $("zeroinfo").innerHTML=""
}

function chordSemaphore(s) {
    if(s === SEMAPHORE.DOWN) {
        disableButtons()
        disableDotRanges()
        disableSpeed()
    }
    else if(s === SEMAPHORE.UP) {
        enableButtons()
        enableDotRanges()
        enableSpeed()
    }
}
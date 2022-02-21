status = "";
object = [];

function setup(){
    canvas = createCanvas(500, 400);
    canvas.position(700, 500);

    video = createCapture(VIDEO);
    video.size(500, 400);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input = document.getElementById("text").value;
}

function modelLoaded(){
    console.log("Model has loaded");
    status = true;
    objectDetector.detect(video, gotResults);
}

function draw(){
    image(video, 0, 0, 500, 400);

    if(status != ""){
        console.log(object.length);
        for(var i=0; i<object.length; i++){
            percent = floor(object[i].confidence * 100);
            console.log(percent);
            stroke("red");
            noFill();
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            text(object[i].label+" "+ percent+"%", object[i].x + 15, object[i].y + 15);

            if(object[i].label == input){
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(input);
                synth.speak(utterThis);
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("found").innerHTML =  input +" "+ "Found";
            }
        }
    }
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object = results;
    }
}
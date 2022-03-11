var SpeechRec = window.webkitSpeechRecognition;

var recog = new SpeechRec();

function start() {
    document.getElementById("textbox").innerHTML = "";
    recog.start();
}
recog.onresult = function (event) {
    console.log(event);
    var content = event.results[0][0].transcript;
    console.log(content);
    document.getElementById("textbox").innerHTML = content;
    if (content == "take my selfie") {
        speak();
    }
};

function speak() {
    var synth = window.speechSynthesis;
    speakData = "Taking your selfie in 3 seconds";
    var utterthis = new SpeechSynthesisUtterance(speakData);
    synth.speak(utterthis);
    Webcam.attach("cam");
    setTimeout(function () {
        takeSnapshot();
        save();
    }, 3000);
}
var camera = document.getElementById("cam");
Webcam.set({
    width: 360,
    height: 240,
    image_format: "png",
    png_quality: 90,
});

function takeSnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML =
            "<img id='selfie_img' src='" + data_uri + "'>";
    });
}

function save() {
    link = document.getElementById("link");
    image = document.getElementById("selfie_img").src;
    link.href = image;
    link.click();
}
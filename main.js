Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera= document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';
    });
}
console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6-vW4eE-6/model.json',modelLoaded);

 function modelLoaded() {
     console.log('model Loaded!');
 }

 function speak(){
    var synth = window.speechSynthesis;
    speak_data_1="The first prediction is " + perdiction_1;
    speak_data_2="And the second prediction is " + perdiction_2;
    var utterThis = new SpeachSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
 }

 function modelLoaded(){
    console.log('Model Loaded!');
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify( img,gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
        
    } else {
      console.log(results);
      document.getElementById("result_handsign_name").innerHTML = results[0].label; 
      document.getElementById("result_handsign_name2").innerHTML = results[1].label;
      perdiction_1=results[0].label;
      perdiction_2=results[1].label;

      if(results[0].label =="ok" ){
          document.getElementById("update_handsign").innerHTML = "&#128076;";
      }
      if (results[0].label =="sort of") {
          document.getElementById("update_handsign").innerHTML = "&#128075;";
      }
      if (results[0].label =="great") {
          document.getElementById("update_handsign").innerHTML =" &#128077;";   
      }
      if (results[0].label =="sad") {
          document.getElementById("update_handsign").innerHTML =" &#128078;";
      }
      if(results[1].label =="ok"){
          document.getElementById("update_handsign2").innerHTML = "&#128076;";
      }
       if (results[1].label =="sort of"){
           document.getElementById("update_handsign2").innerHTML = "&#128075;";
       }
       if (results[1].label =="great"){
           document.getElementById("update_handsign2").innerHTML =" &#128077;";   
       }
       if (results[1].label =="sad"){
           document.getElementById("update_handsign2").innerHTML =" &#128078;";
       }
       speak()

    }
}
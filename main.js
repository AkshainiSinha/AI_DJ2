leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;
song="";
song2="";
leftWristScore="";
rightWristScore="";
status="";
status_song2="";
function setup(){
canvas=createCanvas(500,500)
video=createCapture(VIDEO)
video.hide()
video.size(500,500)
canvas.center()
posenet=ml5.poseNet(video,modelLoaded)
posenet.on('pose',gotPoses)
}
function preload(){
song=loadSound("music.mp3")
song2=loadSound("music2.mp3")
}
function modelLoaded(){
    console.log("model has been loaded")
} 
function draw(){
 image(video,0,0,500,500)
 fill("red")
 stroke("red")
 status=song.isPlaying()
 if(leftWristScore>0.2){
    circle(leftWristX,leftWristY,20)
 }
 song2.stop()
 if(status==false){
     song.play()
     document.getElementById("song").innerHTML="Harry Potter Theme Music Remix"
 }
 status_song2=song.isPlaying()
if(rightWristScore>0.2){
    circle(rightWristX,rightWristY,20)
}
song.stop()
if(status_song2==false){
    song.play()
    document.getElementById("song").innerHTML="Peter Pan Theme"
}
}
function gotPoses(result){
    if(result.length>0){
        console.log(result);
        leftWristX=result[0].pose.leftWrist.x;
        rightWristX=result[0].pose.rightWrist.x;
        leftWristY=result[0].pose.leftWrist.y;
        rightWristY=result[0].pose.rightWrist.y;
        leftWristScore=result[0].pose.keypoints[9].score;
        rightWristScore=result[0].pose.keypoints[10].score;
    }
}
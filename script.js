score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.wav');
// audio.play();

setTimeout(()=>{
    audio.play();
},1000)

document.onkeydown = function(e){
    console.log("key code is", e.keyCode);
    // up key
    if(e.keyCode == 38){
        human = document.querySelector('.human');
        human.classList.add('animateHuman');
        setTimeout(() =>{
               human.classList.remove('animateHuman')
        }, 700);
    }
    if(e.keyCode == 39){
        human = document.querySelector('.human');
        humanX = parseInt(window.getComputedStyle(human, null).getPropertyValue('left'));
        human.style.left = humanX + 112 + "px";
    }
    if(e.keyCode == 37){
        human = document.querySelector('.human');
        humanX = parseInt(window.getComputedStyle(human, null).getPropertyValue('left'));
        human.style.left = (humanX - 112) + "px";
    }
}

setInterval(() => {
    human = document.querySelector('.human');
    obstacle = document.querySelector('.obstacle');
    gameOver = document.querySelector('.gameOver');

    // to check the distance of human on the x axis, we use an inbuilt function, getComputedStyle
    hx = parseInt(window.getComputedStyle(human, null).getPropertyValue('left'));
    hy = parseInt(window.getComputedStyle(human, null).getPropertyValue('top'));
   
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(hx-ox);
    offsetY = Math.abs(hy-oy);
     console.log(offsetX, offsetY);

    if(offsetX<70 && offsetY<50){
        gameOver.innerHTML= "Game Over! Reload to restart..."
        // gameOver.style.visibility= 'visible';
        obstacle.classList.remove('obstacleAni');
        audio.pause();
        audiogo.play();
        setTimeout(()=>{
          audiogo.pause();
        },2000)

    }
    else if(offsetX<100 && cross){
       score+= 1;
       updateScore(score);
       cross= false;
       
       setTimeout(() => {
          cross = true;
       },1000);

       setTimeout(() =>{
        aniDur = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
        newDur = aniDur - 0.1;
        obstacle.style.animationDuration = newDur + 's';
        // console.log('new dur: ', newDur)
       }, 500);
    }

},10);

function updateScore(score){
    scoreCount.innerHTML = "Your Score: "+ score;
}
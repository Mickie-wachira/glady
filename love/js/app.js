/* ==========================================================
   PROJECT CUPID
   app.js
   PART 1
   ========================================================== */


/* ==========================================================
   ELEMENTS
   ========================================================== */

const loader = document.getElementById("loader");

const cursor = document.querySelector(".cursor");

const musicBtn = document.getElementById("musicBtn");

const music = document.getElementById("bgMusic");

const beginBtn = document.getElementById("beginJourney");

const hero = document.querySelector(".hero");

const firefliesContainer = document.getElementById("fireflies");



/* ==========================================================
   LOADER
   ========================================================== */

window.addEventListener("load",()=>{

    setTimeout(()=>{

        loader.style.opacity="0";

        loader.style.visibility="hidden";

        loader.style.transition="1.2s";

    },2200);

});



/* ==========================================================
   CUSTOM CURSOR
   ========================================================== */

document.addEventListener("mousemove",(e)=>{

    cursor.style.left=e.clientX+"px";

    cursor.style.top=e.clientY+"px";

});



document.querySelectorAll("button,a").forEach(item=>{

    item.addEventListener("mouseenter",()=>{

        cursor.style.width="45px";

        cursor.style.height="45px";

        cursor.style.background="rgba(255,92,147,.25)";

    });

    item.addEventListener("mouseleave",()=>{

        cursor.style.width="22px";

        cursor.style.height="22px";

        cursor.style.background="transparent";

    });

});



/* ==========================================================
   MUSIC
   ========================================================== */

let musicPlaying=false;

musicBtn.addEventListener("click",()=>{

    if(!musicPlaying){

        music.play();

        musicPlaying=true;

        musicBtn.innerHTML='<i class="fas fa-pause"></i>';

    }

    else{

        music.pause();

        musicPlaying=false;

        musicBtn.innerHTML='<i class="fas fa-music"></i>';

    }

});



/* ==========================================================
   BEGIN BUTTON
   ========================================================== */

beginBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:window.innerHeight,

        behavior:"smooth"

    });

});



/* ==========================================================
   FLOATING HEARTS
   ========================================================== */

function createHeart(){

    const heart=document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML="❤";

    heart.style.left=Math.random()*100+"vw";

    heart.style.fontSize=(14+Math.random()*22)+"px";

    heart.style.animationDuration=(5+Math.random()*5)+"s";

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },10000);

}

setInterval(createHeart,700);



/* ==========================================================
   FIREFLIES
   ========================================================== */

function createFirefly(){

    const firefly=document.createElement("div");

    firefly.classList.add("firefly");

    firefly.style.left=Math.random()*100+"vw";

    firefly.style.top=Math.random()*100+"vh";

    firefly.style.opacity=Math.random();

    firefly.style.transform=`scale(${Math.random()+0.5})`;

    firefliesContainer.appendChild(firefly);

}

for(let i=0;i<80;i++){

    createFirefly();

}



/* ==========================================================
   ANIMATE FIREFLIES
   ========================================================== */

setInterval(()=>{

    document.querySelectorAll(".firefly").forEach(firefly=>{

        firefly.style.left=Math.random()*100+"vw";

        firefly.style.top=Math.random()*100+"vh";

        firefly.style.transition="6s linear";

    });

},5000);



/* ==========================================================
   SHOOTING STARS
   ========================================================== */

function shootingStar(){

    const star=document.createElement("div");

    star.classList.add("shooting-star");

    star.style.top=Math.random()*250+"px";

    star.style.left=(700+Math.random()*700)+"px";

    star.style.animation="shooting 2s linear";

    document.body.appendChild(star);

    setTimeout(()=>{

        star.remove();

    },2000);

}

setInterval(shootingStar,4500);
/* ==========================================================
   STAR TWINKLE EFFECT
   ========================================================== */

const stars=document.getElementById("stars");

setInterval(()=>{

    stars.style.opacity=.25+Math.random()*.4;

},1800);



/* ==========================================================
   PARALLAX MOON
   ========================================================== */

const moon=document.querySelector(".moon");

document.addEventListener("mousemove",(e)=>{

    const x=(window.innerWidth/2-e.clientX)/45;

    const y=(window.innerHeight/2-e.clientY)/45;

    moon.style.transform=`translate(${x}px,${y}px)`;

});



/* ==========================================================
   MOUSE SPARKLES
   ========================================================== */

function sparkle(x,y){

    const dot=document.createElement("div");

    dot.style.position="fixed";

    dot.style.left=x+"px";

    dot.style.top=y+"px";

    dot.style.width="4px";

    dot.style.height="4px";

    dot.style.borderRadius="50%";

    dot.style.background="#FFD369";

    dot.style.pointerEvents="none";

    dot.style.boxShadow="0 0 10px #FFD369";

    dot.style.zIndex="9999";

    dot.style.transition="all .8s ease";

    document.body.appendChild(dot);

    requestAnimationFrame(()=>{

        dot.style.opacity="0";

        dot.style.transform=`translateY(-25px) scale(0)`;

    });

    setTimeout(()=>{

        dot.remove();

    },800);

}

document.addEventListener("mousemove",(e)=>{

    if(Math.random()>.65){

        sparkle(e.clientX,e.clientY);

    }

});



/* ==========================================================
   ROSE PETALS
   ========================================================== */

function createPetal(){

    const petal=document.createElement("div");

    petal.innerHTML="🌸";

    petal.style.position="fixed";

    petal.style.left=Math.random()*100+"vw";

    petal.style.top="-50px";

    petal.style.fontSize=(18+Math.random()*18)+"px";

    petal.style.pointerEvents="none";

    petal.style.zIndex="5";

    petal.style.transition="transform linear";

    document.body.appendChild(petal);

    let y=-50;

    let x=Math.random()*window.innerWidth;

    const drift=(Math.random()*2)-1;

    const fall=setInterval(()=>{

        y+=2;

        x+=drift;

        petal.style.top=y+"px";

        petal.style.left=x+"px";

        petal.style.transform=`rotate(${y}deg)`;

        if(y>window.innerHeight+100){

            clearInterval(fall);

            petal.remove();

        }

    },20);

}

setInterval(createPetal,2500);



/* ==========================================================
   HERO FADE ON SCROLL
   ========================================================== */

window.addEventListener("scroll",()=>{

    const value=window.scrollY;

    hero.style.opacity=1-(value/700);

    hero.style.transform=`translateY(${value*.35}px)`;

});



/* ==========================================================
   MUSIC FADE IN
   ========================================================== */

music.volume=0;

function fadeMusic(){

    let volume=0;

    const fade=setInterval(()=>{

        if(volume>=0.4){

            clearInterval(fade);

            return;

        }

        volume+=0.02;

        music.volume=volume;

    },150);

}

musicBtn.addEventListener("click",()=>{

    if(musicPlaying){

        fadeMusic();

    }

});



/* ==========================================================
   FIREWORKS (READY FOR LATER CHAPTERS)
   ========================================================== */

function launchFirework(x,y){

    for(let i=0;i<40;i++){

        const particle=document.createElement("div");

        particle.style.position="fixed";

        particle.style.left=x+"px";

        particle.style.top=y+"px";

        particle.style.width="6px";

        particle.style.height="6px";

        particle.style.borderRadius="50%";

        particle.style.pointerEvents="none";

        particle.style.zIndex="99999";

        const colors=[

            "#FFD369",

            "#FF5C93",

            "#FFFFFF",

            "#6EC6FF",

            "#B388FF"

        ];

        particle.style.background=

        colors[Math.floor(Math.random()*colors.length)];

        document.body.appendChild(particle);

        const angle=Math.random()*Math.PI*2;

        const distance=80+Math.random()*120;

        const dx=Math.cos(angle)*distance;

        const dy=Math.sin(angle)*distance;

        particle.animate(

        [

            {

                transform:"translate(0,0) scale(1)",

                opacity:1

            },

            {

                transform:`translate(${dx}px,${dy}px) scale(0)`,

                opacity:0

            }

        ],

        {

            duration:1500,

            easing:"ease-out"

        });

        setTimeout(()=>{

            particle.remove();

        },1500);

    }

}



/* ==========================================================
   DOUBLE CLICK SECRET
   ========================================================== */

document.addEventListener("dblclick",(e)=>{

    launchFirework(e.clientX,e.clientY);

});



/* ==========================================================
   END OF HERO MODULE
   ========================================================== */

console.log("❤️ Project Cupid Hero Module Loaded Successfully ❤️");
/* ==========================================================
   PROJECT CUPID
   CHAPTERS.JS
   CHAPTER 1 - ARRIVAL
   ========================================================== */

const arrivalSection = document.getElementById("arrival");
const arrivalText = document.getElementById("arrivalTyping");
const continueBtn = document.getElementById("continueJourney");

/* ==========================================================
   STORY MESSAGE
   ========================================================== */

const storyMessage = `Hi Gladys...

Before you continue, I want you to know that this isn't just another website.

Every color, every animation, every little detail you see here was carefully put together with one person in mind—you.

Life gives us many opportunities to say what we feel, but sometimes words alone don't seem enough.

So instead of simply sending you a message, I thought I'd create a little world that you could explore at your own pace.

I hope this small journey brings a smile to your face.

Welcome... ❤️`;


/* ==========================================================
   TYPEWRITER EFFECT
   ========================================================== */

let currentCharacter = 0;
let typingStarted = false;

function typeStory(){

    if(currentCharacter < storyMessage.length){

        arrivalText.innerHTML += storyMessage.charAt(currentCharacter);

        currentCharacter++;

        setTimeout(typeStory,35);

    }

}


/* ==========================================================
   OBSERVER
   Starts typing only when section is visible.
   ========================================================== */

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting && !typingStarted){

            typingStarted=true;

            typeStory();

        }

    });

},{
    threshold:0.45
});

observer.observe(arrivalSection);


/* ==========================================================
   BLINKING CURSOR
   ========================================================== */

setInterval(()=>{

    if(arrivalText.innerHTML.endsWith("|")){

        arrivalText.innerHTML=
        arrivalText.innerHTML.slice(0,-1);

    }else{

        arrivalText.innerHTML+="|";

    }

},550);


/* ==========================================================
   FADE IN
   ========================================================== */

arrivalSection.style.opacity="0";
arrivalSection.style.transform="translateY(80px)";
arrivalSection.style.transition="1.2s";

const revealObserver=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            arrivalSection.style.opacity="1";

            arrivalSection.style.transform="translateY(0)";

        }

    });

},{
    threshold:.25
});

revealObserver.observe(arrivalSection);


/* ==========================================================
   CONTINUE BUTTON
   ========================================================== */

continueBtn.addEventListener("click",()=>{

    window.scrollBy({

        top:window.innerHeight,

        behavior:"smooth"

    });

});


/* ==========================================================
   END OF CHAPTER ONE
   ========================================================== */

console.log("Chapter One Loaded ❤️");
/*==========================================================
  CHAPTER 5 - REASONS
==========================================================*/

const reasonCards = document.querySelectorAll(".reason-card");
const reasonCount = document.getElementById("reasonCount");
const reasonsSection = document.getElementById("reasons");

let counterStarted = false;

/*==========================================================
  COUNTER
==========================================================*/

function startCounter(){

    let value = 0;
    const target = 100;

    const timer = setInterval(()=>{

        value++;

        reasonCount.textContent = value;

        if(value >= target){

            clearInterval(timer);

            reasonCount.textContent = "100+";

        }

    },25);

}


/*==========================================================
  REVEAL CARDS
==========================================================*/

const reasonsObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

},{
    threshold:.2
});

reasonCards.forEach((card,index)=>{

    card.style.opacity="0";
    card.style.transform="translateY(80px)";
    card.style.transition=`${0.6 + index*0.15}s ease`;

    reasonsObserver.observe(card);

});


/*==========================================================
  START COUNTER WHEN SECTION IS VISIBLE
==========================================================*/

const counterObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting && !counterStarted){

            counterStarted = true;

            startCounter();

        }

    });

},{
    threshold:.4
});

counterObserver.observe(reasonsSection);


/*==========================================================
  3D TILT
==========================================================*/

reasonCards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width)-0.5)*16;
        const rotateX = ((y / rect.height)-0.5)*-16;

        card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-10px)
        scale(1.03)
        `;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        translateY(0)
        scale(1)
        `;

    });

});


/*==========================================================
  FLOATING HEARTS
==========================================================*/

function createReasonHeart(){

    const heart = document.createElement("div");

    heart.innerHTML = "❤";

    heart.style.position = "fixed";
    heart.style.left = Math.random()*100 + "vw";
    heart.style.top = "100vh";
    heart.style.fontSize = (12 + Math.random()*18) + "px";
    heart.style.color = "#ff5c93";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "99999";

    document.body.appendChild(heart);

    heart.animate([

        {
            transform:"translateY(0)",
            opacity:1
        },

        {
            transform:`translate(${(Math.random()-0.5)*120}px,-120vh)`,
            opacity:0
        }

    ],{

        duration:5000,
        easing:"ease-out"

    });

    setTimeout(()=>{

        heart.remove();

    },5000);

}

setInterval(()=>{

    if(window.scrollY >= reasonsSection.offsetTop-400){

        createReasonHeart();

    }

},700);


/*==========================================================
  CHAPTER FIVE LOADED
==========================================================*/

console.log("❤️ Chapter Five Loaded");
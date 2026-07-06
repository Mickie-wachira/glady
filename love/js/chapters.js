/* ==========================================================
   CHAPTER 2 - THINGS I LIKE ABOUT YOU
   ========================================================== */

const admireCards = document.querySelectorAll(".admire-card");

/* ==========================================================
   REVEAL ANIMATION
   ========================================================== */

const admireObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";

            entry.target.style.transform="translateY(0)";

        }

    });

},{
    threshold:0.2
});

admireCards.forEach((card,index)=>{

    card.style.opacity="0";

    card.style.transform="translateY(80px)";

    card.style.transition=`${0.7 + (index * 0.15)}s ease`;

    admireObserver.observe(card);

});


/* ==========================================================
   3D TILT EFFECT
   ========================================================== */

admireCards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 18;

        const rotateX = ((y / rect.height) - 0.5) * -18;

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-12px)
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


/* ==========================================================
   SPARKLE EFFECT
   ========================================================== */

function createSparkle(card){

    const sparkle = document.createElement("div");

    sparkle.style.position = "absolute";

    sparkle.style.width = "8px";

    sparkle.style.height = "8px";

    sparkle.style.borderRadius = "50%";

    sparkle.style.background = "#FFD369";

    sparkle.style.boxShadow = "0 0 12px #FFD369";

    sparkle.style.pointerEvents = "none";

    sparkle.style.left = Math.random()*90 + "%";

    sparkle.style.top = Math.random()*90 + "%";

    sparkle.style.opacity = "1";

    sparkle.style.transition = "all .8s ease";

    card.appendChild(sparkle);

    requestAnimationFrame(()=>{

        sparkle.style.transform = "translateY(-25px) scale(0)";

        sparkle.style.opacity = "0";

    });

    setTimeout(()=>{

        sparkle.remove();

    },800);

}

admireCards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        for(let i=0;i<8;i++){

            setTimeout(()=>{

                createSparkle(card);

            },i*80);

        }

    });

});


/* ==========================================================
   GLOW PULSE
   ========================================================== */

setInterval(()=>{

    admireCards.forEach(card=>{

        card.animate(

            [

                {

                    boxShadow:"0 15px 40px rgba(0,0,0,.25)"

                },

                {

                    boxShadow:"0 20px 60px rgba(255,92,147,.35)"

                },

                {

                    boxShadow:"0 15px 40px rgba(0,0,0,.25)"

                }

            ],

            {

                duration:3000,

                iterations:1

            }

        );

    });

},6000);

/* ==========================================================
   CHAPTER 3 - GALLERY
   ========================================================== */

const galleryImages = document.querySelectorAll(".photo-card img");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const closeLightbox = document.getElementById("closeLightbox");

const prevImage = document.getElementById("prevImage");

const nextImage = document.getElementById("nextImage");

let currentImage = 0;


/* ==========================================================
   OPEN IMAGE
   ========================================================== */

function openImage(index){

    currentImage = index;

    lightbox.style.display = "flex";

    lightboxImage.src = galleryImages[index].src;

    lightboxImage.style.opacity = "0";

    lightboxImage.style.transform = "scale(.9)";

    setTimeout(()=>{

        lightboxImage.style.transition=".4s";

        lightboxImage.style.opacity="1";

        lightboxImage.style.transform="scale(1)";

    },50);

    createOpenHearts();

}

galleryImages.forEach((image,index)=>{

    image.addEventListener("click",()=>{

        openImage(index);

    });

});


/* ==========================================================
   CLOSE
   ========================================================== */

closeLightbox.addEventListener("click",()=>{

    lightbox.style.display="none";

});

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.style.display="none";

    }

});


/* ==========================================================
   NEXT IMAGE
   ========================================================== */

nextImage.addEventListener("click",()=>{

    currentImage++;

    if(currentImage>=galleryImages.length){

        currentImage=0;

    }

    changeImage();

});


/* ==========================================================
   PREVIOUS IMAGE
   ========================================================== */

prevImage.addEventListener("click",()=>{

    currentImage--;

    if(currentImage<0){

        currentImage=galleryImages.length-1;

    }

    changeImage();

});


/* ==========================================================
   CHANGE IMAGE
   ========================================================== */

function changeImage(){

    lightboxImage.style.opacity="0";

    lightboxImage.style.transform="scale(.9)";

    setTimeout(()=>{

        lightboxImage.src=galleryImages[currentImage].src;

        lightboxImage.style.opacity="1";

        lightboxImage.style.transform="scale(1)";

    },220);

}


/* ==========================================================
   KEYBOARD SUPPORT
   ========================================================== */

document.addEventListener("keydown",(e)=>{

    if(lightbox.style.display!=="flex") return;

    if(e.key==="Escape"){

        lightbox.style.display="none";

    }

    if(e.key==="ArrowRight"){

        nextImage.click();

    }

    if(e.key==="ArrowLeft"){

        prevImage.click();

    }

});


/* ==========================================================
   FLOATING HEARTS
   ========================================================== */

function createOpenHearts(){

    for(let i=0;i<12;i++){

        const heart=document.createElement("div");

        heart.innerHTML="❤";

        heart.style.position="fixed";

        heart.style.left=(45+Math.random()*10)+"vw";

        heart.style.top=(45+Math.random()*10)+"vh";

        heart.style.color="#ff5c93";

        heart.style.fontSize=(18+Math.random()*18)+"px";

        heart.style.pointerEvents="none";

        heart.style.zIndex="999999";

        document.body.appendChild(heart);

        const x=(Math.random()-0.5)*300;

        const y=-250-Math.random()*200;

        heart.animate(

        [

            {

                transform:"translate(0,0) scale(1)",

                opacity:1

            },

            {

                transform:`translate(${x}px,${y}px) scale(.2)`,

                opacity:0

            }

        ],

        {

            duration:1800,

            easing:"ease-out"

        });

        setTimeout(()=>{

            heart.remove();

        },1800);

    }

}


/* ==========================================================
   SWIPE SUPPORT (MOBILE)
   ========================================================== */

let touchStartX=0;

let touchEndX=0;

lightbox.addEventListener("touchstart",(e)=>{

    touchStartX=e.changedTouches[0].screenX;

});

lightbox.addEventListener("touchend",(e)=>{

    touchEndX=e.changedTouches[0].screenX;

    if(touchStartX-touchEndX>60){

        nextImage.click();

    }

    if(touchEndX-touchStartX>60){

        prevImage.click();

    }

});


/* ==========================================================
   REVEAL GALLERY
   ========================================================== */

const galleryCards=document.querySelectorAll(".photo-card");

const galleryObserver=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";

            entry.target.style.transform="translateY(0)";

        }

    });

},{
    threshold:.2
});

galleryCards.forEach((card,index)=>{

    card.style.opacity="0";

    card.style.transform="translateY(80px)";

    card.style.transition=`${0.6+(index*.12)}s`;

    galleryObserver.observe(card);

});


/* ==========================================================
   END OF CHAPTER 3
   ========================================================== */

console.log("📸 Chapter Three Loaded Successfully ❤️");
/*==========================================================
  CHAPTER 4 - LETTER
==========================================================*/

const envelope = document.getElementById("envelope");
const paper = document.getElementById("paper");
const letterTyping = document.getElementById("letterTyping");

const message = `Dear Gladys,

I don't know where this journey will take us,
but I know meeting you has made my world a little brighter.

This little website is my way of saying
thank you for being such a wonderful person.

Every line of code,
every animation,
every little detail,

was created with you in mind.

I hope this brings a smile to your face,
because seeing you smile is a beautiful thing.

Keep being the amazing person you are.

❤️`;

let opened = false;
let index = 0;

/*==========================
OPEN ENVELOPE
==========================*/

envelope.addEventListener("click", () => {

    if(opened) return;

    opened = true;

    envelope.classList.add("open");

    setTimeout(() => {

        paper.classList.add("show");

    }, 600);

    setTimeout(() => {

        typeLetter();

    }, 1200);

});


/*==========================
TYPEWRITER
==========================*/

function typeLetter(){

    if(index < message.length){

        letterTyping.innerHTML += message.charAt(index);

        index++;

        setTimeout(typeLetter,30);

    }else{

        createHeart();

    }

}


/*==========================
FLOATING HEARTS
==========================*/

function createHeart(){

    for(let i=0;i<20;i++){

        setTimeout(()=>{

            const heart=document.createElement("div");

            heart.innerHTML="❤";

            heart.style.position="fixed";

            heart.style.left=(45+Math.random()*10)+"vw";

            heart.style.top="70vh";

            heart.style.color="#ff4d88";

            heart.style.fontSize=(16+Math.random()*18)+"px";

            heart.style.pointerEvents="none";

            heart.style.zIndex="9999";

            document.body.appendChild(heart);

            heart.animate([

                {
                    transform:"translateY(0) scale(1)",
                    opacity:1
                },

                {
                    transform:`translate(${(Math.random()-0.5)*250}px,-300px) scale(.2)`,
                    opacity:0
                }

            ],{

                duration:2500,
                easing:"ease-out"

            });

            setTimeout(()=>{

                heart.remove();

            },2500);

        },i*120);

    }

}


/*==========================
LETTER REVEAL
==========================*/

const letterSection = document.getElementById("letter");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            letterSection.animate([

                {
                    opacity:0,
                    transform:"translateY(80px)"
                },

                {
                    opacity:1,
                    transform:"translateY(0)"
                }

            ],{

                duration:1000,
                fill:"forwards"

            });

        }

    });

},{
    threshold:.2
});

observer.observe(letterSection);


/*==========================
PAPER FLOAT EFFECT
==========================*/

setInterval(()=>{

    if(!opened) return;

    paper.animate([

        {
            transform:"translateX(-50%) translateY(-170px)"
        },

        {
            transform:"translateX(-50%) translateY(-180px)"
        },

        {
            transform:"translateX(-50%) translateY(-170px)"
        }

    ],{

        duration:3000,
        iterations:1

    });

},3500);


console.log("💌 New Chapter 4 Loaded");
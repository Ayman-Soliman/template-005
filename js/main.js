// let otherLinks = document.querySelector('.nav li.other-links');
// let megaMenu = document.querySelector('.mega-menu');


// document.addEventListener("click", function handleClick(event){
//     if (event.target.parentNode.closest('.other-links')) {
//         megaMenu.classList.toggle('show');
//         console.log(event.target);
//     }else{
//         megaMenu.classList.remove('show');
//         }
// });

// setInterval(_=>{
//     document.querySelector(".value").innerHTML = document.querySelector("input[placeholder='search']").value;
// }, 0);
// document.querySelector("input[placeholder='search']").addEventListener("keyup", function getValue(e){
//     document.querySelector(".value").innerHTML = document.querySelector("input[placeholder='search']").value;
// })

// function myFunction() {
//     // Get the text field
//     var copyText = document.getElementById("myInput");

//     // Select the text field
//     copyText.select();
//     copyText.setSelectionRange(0, 99999); // For mobile devices

//      // Copy the text inside the text field
//     navigator.clipboard.writeText(copyText.value);

//     // Alert the copied text
//     alert("Copied the text: " + copyText.value);
//   }
// ----------------------------------- Stop and start the auto change slider images -----------
let autoChangeSlide;
let changeSliderImages = localStorage.getItem('slider-opt');
let yesBtn = document.querySelector('.yes');
let noBtn = document.querySelector('.no');
if (changeSliderImages !== null) {
    if (changeSliderImages === 'yes') {
        yesBtn.classList.add('active');
        noBtn.classList.remove('active');
        Interval();
    }
    if (changeSliderImages === 'no') {
        noBtn.classList.add('active');
        yesBtn.classList.remove('active');
        clearInterval(autoChangeSlide);
    }
}else{
    Interval();
}
yesBtn.onclick = function () {
    localStorage.setItem('slider-opt', 'yes');
    clearInterval(autoChangeSlide);
    yesBtn.classList.add('active');
    noBtn.classList.remove('active');
    Interval();
}
noBtn.onclick = function () {
    localStorage.setItem('slider-opt', 'no');
    noBtn.classList.add('active');
    yesBtn.classList.remove('active');
    clearInterval(autoChangeSlide);
}

// ----------------------------------- Slider Images functionality -----------
let sliderImages = document.querySelectorAll('.image-slider img');
let slideImagesCount = sliderImages.length;
let currentSlide = 0;
// console.log(slideImagesCount);
let leftArrow = document.querySelector('.left-arrow');
let rightArrow = document.querySelector('.right-arrow');

let bullets = document.querySelector('.bullets');
createBullets();
leftArrow.onclick = prevSlide;
rightArrow.onclick = nextSlide;

// ---------------- creating the bullets as listItem (li) and assign the framework classes  --------------------
function createBullets() {
    for (let i = 0; i < slideImagesCount; i++) {
        let bullet = document.createElement("li");
        bullet.setAttribute('class', 'bg-white rad-50 flex-center ml-5 mr-5 border-main');
        bullet.setAttribute('data-index', i);
        // let bulletText = document.createTextNode(i + 1);
        if (currentSlide === i) {
            bullet.classList.add('active');
        }
        // bullet.appendChild(bulletText);
        bullets.appendChild(bullet);
    }
}
// ---------------- casting the created bullets --------------------
let createdBullets = document.querySelectorAll('.bullets li');
// ---------------- adding click eventListener to each bullet (li) and assign its data-index attr to currentSlide --------------------
createdBullets.forEach(bulletLi => {
    bulletLi.addEventListener('click', function (e) {
        clearInterval(autoChangeSlide);
        currentSlide = parseInt(bulletLi.getAttribute('data-index'));
        SlideControl();
        changeSliderImages = localStorage.getItem('slider-opt');
        if (changeSliderImages !== null) {
            if (changeSliderImages === 'yes') {
                Interval();
            }
        }else{
            clearInterval(autoChangeSlide);
            Interval();
        }
    })
});

// ---------------- going to the next slider image --------------------
function nextSlide() {
    clearInterval(autoChangeSlide);
    console.log('next');
    if (currentSlide < slideImagesCount - 1) {
        currentSlide++;
    } else {
        currentSlide = 0;
    }
    console.log(currentSlide);
    SlideControl();
    changeSliderImages = localStorage.getItem('slider-opt');
    if (changeSliderImages !== null) {
        if (changeSliderImages === 'yes') {
            Interval();
        }
    }else{
        clearInterval(autoChangeSlide);
        Interval();
    }
}
// ---------------- going to the previous slider image --------------------
function prevSlide() {
    clearInterval(autoChangeSlide);
    console.log('previous');
    if (currentSlide > 0) {
        currentSlide--;
    } else {
        currentSlide = slideImagesCount - 1;
    }
    console.log(currentSlide);
    SlideControl();
    changeSliderImages = localStorage.getItem('slider-opt');
    if (changeSliderImages !== null) {
        if (changeSliderImages === 'yes') {
            Interval();
        }
    }else{
        clearInterval(autoChangeSlide);
        Interval();
    }
}

// ---------------- Auto Swip Slide Images --------------------
function Interval() {
    autoChangeSlide = setInterval(() => {
        if (currentSlide < slideImagesCount - 1) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        SlideControl();
    
    }, 3000);
}
// ---------------- control the active image and the active bullet --------------------
SlideControl();
function SlideControl() {
    sliderImages.forEach(slide => {
        slide.classList.remove('active');
    });
    sliderImages[currentSlide].classList.add('active');

    createdBullets.forEach(bullet => {
        bullet.classList.remove('active');
    });
    createdBullets[currentSlide].classList.add('active');
}
// ----------------------------------- open settings box -----------------------------------------------------------------
let gear = document.getElementById('gear');
let gearLink = document.getElementById('settings-link');
let gearIcon = document.querySelector('.gear-icon');
let settings = document.querySelector('.settings');
gear.onclick = openSettings;
gearLink.onclick = openSettings;

function openSettings() {
    settings.classList.toggle('open');
    gearIcon.classList.toggle('fa-spin');
}
// ----------------------------------- create colors list in settings box -----------------------------------------------------------------
const colorsArray = ['#ff9800','#E91E63','#009688','#03A9F4','#4CAF50'];
let colorsList = document.querySelector('.settings .settings-box .option-box .colors-list');

for (let i = 0; i < colorsArray.length; i++) {
    let color = document.createElement("li");
    color.setAttribute('class', 'rad-50 m-5');
    color.setAttribute('data-color', colorsArray[i]);
    color.style.setProperty('background-color',colorsArray[i]);
    colorsList.appendChild(color);
}
// ----------------------------------- get and set the color from and to Local Storage ------------------------------------------------------
let mainColor = localStorage.getItem('main-color');
if (mainColor !== null) {
    document.documentElement.style.setProperty('--main-color', mainColor);
    document.documentElement.style.setProperty('--main-alt-color', `${mainColor}66`);
}
// ----------------------------------- assign selected color to the main color in the root and asign active class to the color -----------
let colors = document.querySelectorAll('.settings .settings-box .option-box .colors-list li');
colors.forEach(colorLi => {
    if (colorLi.dataset.color === mainColor) {
        colorLi.classList.add('active');
    }
    if (mainColor === null) {
        colors[0].classList.add('active');
    }
    colorLi.addEventListener('click',(e)=>{
        colors.forEach(li =>{
            li.classList.remove('active');
        });
        e.target.classList.add('active');
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        document.documentElement.style.setProperty('--main-alt-color', `${e.target.dataset.color}66`);
        localStorage.setItem('main-color', e.target.dataset.color);
    });
});
// ----------------------------------- animate the progress bar when reveal on screen -----------
let skillsSection = document.querySelector('.our-skills');
let progressBars = document.querySelectorAll('.our-skills .skill .skill-progress .progress-bar');
window.onscroll = function () {
    let screenHeight = this.innerHeight;
    let sectionHeight = skillsSection.offsetHeight;
    let sectionOffsetTopPage = skillsSection.offsetTop;
    let windowScrollTop = this.scrollY;
    
    if (windowScrollTop > (sectionOffsetTopPage + sectionHeight - screenHeight - 100)) {
        progressBars.forEach(progBar => {
            progBar.style.width = progBar.dataset.width;
        });
    } else {
        progressBars.forEach(progBar => {
            progBar.style.width = 0;
        });
    }
};
// ----------------------------------- display gallery image in popup ----------------------------------------
let currentFlashCard = 0;
let galleryOverlay = document.querySelector('.gallery-overlay');
let galleryLeftArrow = document.querySelector('.gallery-overlay .left-arrow');
let galleryRightArrow = document.querySelector('.gallery-overlay .right-arrow');
let closeOverlay = document.querySelector('.gallery-overlay .close-overlay');
let galleryOverlayTxt = document.querySelector('.gallery-overlay h3');
let overlayCard = document.querySelector('.gallery-overlay .card-img img');
let flashingCards = document.querySelectorAll('.gallery .flashing-card img');

// ----------------------------------- show the popup when clicking any gallery image and add the heading if alt is exist ----------------------------------------
flashingCards.forEach((flashCard, indexs) => {
    flashCard.addEventListener('click', (e)=>{
        galleryOverlay.style.display = 'flex';
        let selectedImgSrc = e.target.src;
        let selectedImgAlt = e.target.alt;
        overlayCard.src = selectedImgSrc;
        galleryOverlayTxt.innerHTML = selectedImgAlt;
        currentFlashCard = indexs;
        console.log(currentFlashCard);
    });
});
// ----------------------------------- arrows to go to next and previous image in popup ----------------------------------------
galleryLeftArrow.onclick = function () {
    if (currentFlashCard > 0) {
        currentFlashCard --;
    }else{
        currentFlashCard = flashingCards.length - 1;
    }
    overlayCard.src = flashingCards[currentFlashCard].src;
    galleryOverlayTxt.innerHTML = flashingCards[currentFlashCard].alt;
}
galleryRightArrow.onclick = function () {
    if (currentFlashCard < flashingCards.length - 1) {
        currentFlashCard ++;
    }else{
        currentFlashCard = 0;
    }
    overlayCard.src = flashingCards[currentFlashCard].src;
    galleryOverlayTxt.innerHTML = flashingCards[currentFlashCard].alt;
}
// ----------------------------------- close the popup with X button  ----------------------------------------
closeOverlay.onclick = function () {
    galleryOverlay.style.display = 'none';
}
// ----------------------------------- close the popup with Esc button  ----------------------------------------
document.onkeydown = function (e) {
    // e = e ;
    if (e.key === 'Escape' || e.key === 'Esc') {
        galleryOverlay.style.display = 'none';
    }
}
// ----------------------------------- creating sections navigation bullets ----------------------------------------
let sections = document.querySelectorAll('section');
let sideBullets = document.querySelector('.side-bullets');
sections.forEach(section => {
    let sectionId = section.id;
    let secBulletDiv = document.createElement('div');
    secBulletDiv.setAttribute('class','bullet rad-50 relative w-full mb-10');
    secBulletDiv.setAttribute('data-section',sectionId);
    let toolTipDiv = document.createElement('div');
    toolTipDiv.setAttribute('class','tool-tip c-white bg-main p-5 txt-c absolute rad-6');
    toolTipDiv.innerHTML = sectionId;
    secBulletDiv.appendChild(toolTipDiv);
    sideBullets.appendChild(secBulletDiv);
});
// ----------------------------------- use sections navigation bullets and navbar links to scroll to sections ----------------------------------------
let theSecBullets = document.querySelectorAll('.side-bullets .bullet');
scrollTo(theSecBullets);

let navLinks = document.querySelectorAll('.nav-bar .links a');
scrollTo(navLinks);

function scrollTo(element) {
    element.forEach(ele => {
        ele.addEventListener('click', (e)=>{
            e.preventDefault();
            if (!e.target.classList.contains('setting-link')) {
                element.forEach(el => {
                    el.classList.remove('active');
                });
                console.log(e.target.dataset.section);
                e.target.classList.add('active');
                document.getElementById(e.target.dataset.section).scrollIntoView({
                    behavior : 'smooth'
                });
            }
        });
    });
}
// ----------------------------------- Reset local storage options ----------------------------------------
let resetBtn = document.querySelector('.settings .reset-button');
resetBtn.onclick = function () {
    localStorage.clear();
    document.location.reload();
}
// ----------------------------------- burgerBar toggle menu ----------------------------------------
let burgerBars = document.querySelector('.nav-bar .burger-bars');
let navLinksContainer = document.querySelector('.nav-bar .links');
let links = document.querySelectorAll('.nav-bar .links li a');
burgerBars.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
});
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
});
});

document.addEventListener('click', (e) =>{
    if (e.target !== burgerBars && e.target !== navLinksContainer) {
        navLinksContainer.classList.remove('active');
    }
});
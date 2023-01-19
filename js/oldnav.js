//CODE TO USE ON YOUR WEBSITE - !!! YOU NEED IT

//hide nav open btn when the nav is open, adding/removing open classes to nav and content
const navOpenBtn = document.querySelector('.nav-open-btn');
const navCloseBtn = document.querySelector('.nav__close');
const nav = document.querySelector('.nav');
const pageContent = document.querySelector('.page__content');
const navList = document.querySelector('.nav__list');
const page = document.querySelector('body');

//open nav
navOpenBtn.addEventListener('click', function() {
  navOpenBtn.classList.add('js-hidden');
  
  nav.classList.add('js-opened');
  
  
});

//close nav
navCloseBtn.addEventListener('click', function() {
  navOpenBtn.classList.remove('js-hidden');
  
  nav.classList.remove('js-opened');
  
  
});

//closing navigation if click outside it
page.addEventListener('click', function(e) {
  
  const evTarget = e.target;
  
  if((evTarget !== nav) && (nav.classList.contains('js-opened')) && (evTarget !== navOpenBtn) && (evTarget.parentNode !== navOpenBtn)) {
    
    navOpenBtn.classList.remove('js-hidden');
  
    nav.classList.remove('js-opened');
  
    
  }
  
});

//adding default classes
nav.classList.add('nav--offcanvas');

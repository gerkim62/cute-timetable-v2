
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navOverlay = document.getElementById('nav-overlay')

    function toggleNavbar() {
      navbarCollapse.classList.toggle('collapse');
      navOverlay.hidden = !navOverlay.hidden
    }

    navbarToggler.addEventListener('click', toggleNavbar);
    navOverlay.addEventListener('click', toggleNavbar)



    //form
    const form = document.querySelector("form");
  if(form)  form.addEventListener("submit", async (event) => {
    showLoader()
      event.preventDefault();
     
      try {
        const response = await fetchViaProxy("https://formspree.io/f/mlekdzoa", {
          method: "POST",
          body: new FormData(form)
          
        });
        if(!response){
          alert("Form submission successful\nThank you!");
          location.href=location.origin
       showModal()
        }
        else{
          console.log(response.status)
        } 
      } catch (err) {
        console.error(err);
      }
      
      hideLoader()
    });

    async function fetchViaProxy(url, options) {
      try {
        const proxyUrl = 'https://corsproxy.io/?';
        const targetUrl = url;
        const proxiedUrl = proxyUrl + encodeURIComponent(targetUrl);

        const response = await fetch(proxiedUrl, options);
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  
  
  const modal = document.getElementById('modal')
  
if(modal)  modal.addEventListener('click', goHome)
  function goHome(){
    modal.setAttribute('hidden','')
    location.href = location.origin
    alert()
  }
  
  function showModal(){
//console.log(modal)
    if(modal)modal.removeAttribute('hidden')
  }
  const loader = `
   <link rel="stylesheet" href="/css/loader.css">
    <div id='loader' class="loader">
    <div class="spinner">
      <div class="spinner-dot"></div>
      <div class="spinner-dot"></div>
      <div class="spinner-dot"></div>
      <div class="spinner-dot"></div>
      <div class="spinner-dot"></div>
      <div class="spinner-dot"></div>
      

<svg enable-background="new 0 0 595.3 595.3" version="1.1" viewBox="0 0 595.3 595.3" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
<path d="m568.1 118.7c-20.4 2.1-40.7 4.3-60.8 8.8-2.8 0.6-3.8 2.8-3.6 5-0.1 2 1 4.1 3.6 4.7 6.1 1.5 14.1 3.7 20.3 7.4-12.3 7.2-24.5 14.5-36.5 22-4-8.7-8.6-17.2-13.6-25.5-12.4-20.5-31.7-36.7-54.2-45.1-49.2-18.4-93.6 6.1-123.2 53.1-6.8 10.8-16.4 30.6-24.2 51.7-16.1-27.5-30-50.2-48.4-69-16.1-16.5-35.7-29.6-58.5-34.4-22.5-4.7-45.6-0.9-66.4 8.3-43.3 19-71.4 63.2-78.7 109-6.7 41.8 9.2 80.8 36.9 111.6 4.3 4.7 7 7.2 10.4 10.1-1.4 1.1-2.4 2.2-2.9 3.3-2.3 4.1-2.7 12 2 17.6 7.8 9.4 22.8 10.1 32.9 6 20 14 41.8 25.8 63.7 36-5.7 3.7-11.4 7.4-17 11-11.5-2.5-26.4-6.8-41.1-9.5-6.3-1.2-9.1 8.5-2.7 9.7 11.2 2.1 24.2 6 33.3 9.2-2.3 1.5-3.8 2.5-6.8 4.7-13-4.2-26.5-6.5-39.6-10.2-4.7-1.3-6.7 6-2 7.3 11.2 3.2 22.8 5.3 34 8.5-1.1 0.8-5.4 3.4-6.3 4-11.8-1.5-26.8-6.6-42.8-8.9-6.4-0.9-9.1 6.3-2.7 7.2 12.5 1.8 24.1 6.3 36.7 7.6-2.5 1.8-3.4 2.2-6.5 4.2-13.5-2.9-27.3-4.6-41-6.3-4.8-0.6-4.8 7 0 7.6 10.7 1.3 21.5 2.6 32.2 4.6-1.5 1.1-7 4.5-8.3 5.5l-8.7-0.3c-14-1-17.5-1.8-33.8-3.6-5.1-0.6-6.1 5.9-1 6.8 14.6 2.7 26.3 3.9 41 4.9 0.3 13.4 1 24.8 0.1 38.2-0.4 5.2 6.6 5.4 7 0.2 1-13.5 1.5-24.7 2.5-39.4 1.8-1.4 5.2-3.7 6.9-5.1 0.4 11.8-0.6 23.7-0.6 35.5 0 4.9 7.5 4.9 7.6 0 0-13.6 0.3-41.1 0.3-41.2l7.2-5.9c-1.4 11.4 0 24.7-1.5 36-0.9 6.4 7.3 9.1 8.2 2.7 2-14.8-0.1-30.3 2.9-45 1.8-1.2 3.7-2.5 5.7-3.9 0.3 11.6 1.8 23.2-0.6 34.6-1 4.8 6.3 6.8 7.3 2 2.8-13.8 0.6-27.7 0.8-41.6v-0.1c2.7-1.8 5.4-3.6 7.7-5.1-0.1 12.8 2.4 27.6 0.2 40.3-1.1 6.4 8.6 9.1 9.7 2.7 2.8-15.8 1.6-34.1 2.2-50 7.1-4.6 14.4-8.8 21.6-13.1 40.6 19.4 80.8 43.8 100.4 86.3 2 4.2 8 2.6 9.2-1.2 6.9-21.2 16.8-41 28.6-60.1 10-16.2 28.8-38.7 47.3-46.4 5.9-2.5 0.7-4.7-6.4-1.7-15 6.4-27.8 16.4-41.3 33.6-12.5 16-24.2 31.2-34.2 53.7-20.7-36.1-56.4-53.6-93.2-70.5 5.3-3.4 10.6-6.9 15.7-10.7 5.1-3.9-1.9-14-7.1-10.1-6.9 5.2-14 10.2-21.2 15-1.6-0.7-3.1-1.5-4.7-2.2-20.4-9.5-41-20.5-60.1-33.5 2.3-2.6 5.8-6.7 7.5-6.9 0 0 63 18.2 88.2-7.9 2-2.1 4-4.7 6-7.6 0.7 3.6 1.9 7 3.8 10 4.7 7.7 14.4 12.5 24.4 9.8 6-1.6 11.6-5.9 15.9-10.9 4.9-5.5 8.4-12 12.3-18.1 2.4-3.8 2.3-3.9 6.4-2.9h0.5c10.7 3.1 20.6 0.5 30-5.2 0.4 11.4 1.9 23.3 6.7 32.6 2.6 5.1 8.2 10 15.2 7.4 7.7-3 11.4-13.5 14.4-20 9.7-21 17.5-43 25.4-64.7 4.5-12.2 8.3-24.7 12.8-36.9 1.7-4.7 3.6-9.7 5.5-15.7 0.9-2.7 2.1-5.8 3.5-8.7 0.3 0.2 0.7 0.3 1 0.5 6.3 3.4 14 5.9 20.6 1.7 7.6-4.8 10.5-17 4.6-24.1-6-7.1-15.1-5.6-21.9-0.7-3.9 2.8-6.9 6.5-9.4 10.5-2.2-1.1-4.4-2.1-6.6-2.7-9.2-2.9-20.5-5.8-25.9-3.7-8.6 3.4-9.9 13.2-6.4 18.5 4.4 6.5 14.2 2.7 11.8-3.4-0.4-1-2.8-2.9-2.7-4 0.4-4.6 5.2-4.9 19.6 0.6 2.1 0.8 4.2 1.6 6.1 2.5-0.1 0.3-0.3 0.6-0.4 0.8-3.2 7.6-5.9 15.4-8.4 23.2-9.8 27.3-22.8 65.4-27.2 75.7-2.5 6.3-5.2 12.5-8.2 18.8-1.5 3.2-4.6 11.7-8.2 13.6-6.3 3.3-8.3-9.3-8.8-14.9-1.5-16.2-0.3-62.7-0.3-83.6 0-6.1 2-35.8-6.1-33.9-3.6 0.8-6 3.7-6.9 8.6l-0.3 14c-0.8 16-0.2 62.9 0 79.7-0.4 0.3-0.8 0.6-1.2 1-7.1 5.9-19 7.5-26.6 2.7-1.7-1.3-2.4-2.5-1.4-5.2 2.4-6.6 5.1-13.6 6.7-20.6h0.2c2.1-9.1 2.6-18.1-1.1-25.9-5.1-10.7-19.6-8.6-27.3 2-3.8 5.2-5.4 11.4-5.6 17.3-0.6 14.3 5 27.5 14.9 36.1 0 0-6.2 12.4-16.3 21.1s-15.1 5.4-18 1.9c-9.6-11.9-4.5-34.3 5.9-48.8 1.7-2.3 2.3-5 0.4-7.2-1.8-1.8-4.9-1.8-7.8 0.9-9.9 8.9-14.6 20.3-16.1 32.2-1.3 2.7-2.6 5.3-4.1 7.8-4.1 6.6-9.5 12-17 15.2-13.2 5.7-28.9 11.1-67.1 1.3-1.8-0.5-1.6-2.1-1.1-3.9 5.7-16.3 15.1-36.1 21.6-51.8 9.1-22.2 13.9-34.4 18.6-47.3 0.9-2.5 7.4-18.8 7.4-18.8s13.9-1 19.5-3.3c12-5 21.5-12.9 25.4-25.7 2.9-9.5-1.1-18.4-9.8-22.7-8.6-4.3-22.4-3.1-30 5.5-11.4 13-14.7 32.4-14.7 32.4-4.5 0.2-54.4 8.9-58.8 9.6-7.5 1.3-14.8 3.6-18.4 10.9-4.9 10-0.2 17.7 7.3 19.8 2.9 0.9 5.9 0.4 7.9-1.8 1.1-1.3 1.8-3.6 1.4-5.2-0.2-1.2-2.1-2.3-3.6-3-2.1-1.2-5.2-0.8-5.3-3.6-0.2-6 11-7.7 15-7.8 7-0.2 51.8-6.2 51.8-6.2s-4.4 10.7-6.7 16.8c-3.2 8.3-33.6 81.3-40 93-1.3 2.3-3.4 5.7-3.4 5.7s-9.9-1.4-13.7-1.9c-5.7-0.8-10.7-0.5-14.9 0.4-7.8-7.3-15.1-15.2-21.6-23.7-15.4-20.1-24.6-43.1-26.2-68.4-2.3-36.4 18.1-78.1 45.3-101.8 11.9-10.4 24.1-19.3 38.8-24.7 45.4-16.7 89.3 8.6 116.8 46.2 11 15 27.5 38.9 38.9 63.1 6.6 14 12.7-11.3 14.1-15.4 20.2-58.9 42.3-89.3 82.9-102.5 24.8-8.1 50.6-2.9 71.7 11.7 18.1 12.6 29.8 31.8 37.9 52.1 0.6 1.4 1.1 2.8 1.6 4.2-15.3 9.8-30.3 20-44.8 30.9 0 0-5.7 4.6-2.8 10.3 4 7.7 13.4-2.7 13.4-2.7 13.4-10.1 25.4-19.8 37.5-29 16.6 50.3 16.6 107.8-25.2 148.6-20.4 19.9-43.1 19.9-52.6 18.8-17.4-3.4-22.1-14.1-22.1-14.1-2.4-5.5-2.7-10.4-2.8-16.8-0.1-2.7 1.1-4.1 4-5.5 13.2-6.5 28.1-9.5 40.9-16.9 10.8-6.2 24.2-23 14.2-35.8-13.4-17.2-41.7-4.4-53.9 7.6-9 8.8-14.8 21.7-18.2 33.9l-0.5 1.6c-5 17.3 0.6 37.7 10.7 45.8 8.2 6.5 15.6 9.5 23.1 9.7 23.7 2.9 52.6-8.8 68.5-23.4 19.8-18.2 29.9-43.1 34.6-69.2 6.1-34.1 0.9-64.3-10.4-91.9 11.6-8.6 23.5-16.8 37.1-24.9 4.2 7.3 8.2 19.8 8.2 27.9 0 5.9 8.1 6.6 9.9 1.3 6.1-18.3 13.4-35.8 22.7-52.7 1.9-3.3-0.2-8.2-4.1-7.8zm-170.8 81.7c2-2.3 3.8-4.7 6.9-5.3 4.2-0.8 8.5 4.5 7.1 7.8-3.2 7-7.9 4.5-16.3 1.3-0.1-0.1-0.3-0.1-0.4-0.2 0.8-1.3 1.7-2.5 2.7-3.6zm-131.9 74.8c0.5-3 1.3-7.2 5.3-7.9 4.1-0.7 5.2 3.3 5.4 6.1 0.8 16.5-5.3 30.9-5.3 30.9-5.1-8.5-7.3-18.2-5.4-29.1zm-89.5-76c2.9-8.8 8.7-22.2 19.8-23.8 9.6-1.4 12.3 6.9 9.1 14.5-2.6 6.3-5.9 10.5-12.2 12.8-10.1 3.7-19.1 3.4-19.1 3.4s2.4-6.9 2.4-6.9zm-95.2 143.2c12.6-6.5 27.7 1.2 27.7 1.2-2.4 11.8-22.9 14.4-27.9 9.7-3.4-3-3.6-8.9 0.2-10.9zm343-76.1c4.1 0.2 11.7 7.8 1.7 16.1-9 7.5-21.5 11.8-42.3 20.1-0.1 0.1 8.3-37.5 40.6-36.2zm123.2-100.9c-1.2-4.2-3.9-15.5-7.6-20.9-3.2-4.7-12-10.2-17.6-12.8 10.3-1.7 26.7-4.8 41.5-5.6-5.1 12.3-12.8 30.3-16.3 39.3z" fill="#F06793"/>
</svg>

      
      <!--<img src="icon-512x512png" alt="g" class="logo" />-->
    </div>
  </div>
`

function showLoader(){
  document.body.innerHTML+= loader
  
}

function hideLoader(){
  const loader = document.getElementById('loader')
  
  loader.setAttribute('hidden','')
}

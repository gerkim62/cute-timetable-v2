function appendNavFooter(navbarString, footerString) {
  // Get the body element
  var body = document.querySelector("body");

  // Append navbar string to body
  body.insertAdjacentHTML("afterbegin", navbarString);

  // Append footer string to body
  body.insertAdjacentHTML("beforeend", footerString);
}

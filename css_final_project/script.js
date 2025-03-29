const menuIcon = document.querySelector(".menu-icon");
const closeIcon = document.querySelector(".close-icon");
const menu = document.querySelector(".menu");
const body = document.body;
const menuLinks = Array.from(document.getElementsByClassName("menu-link"));

// Open the menu
menuIcon.addEventListener("click", () => {
  menu.classList.add("show");
  body.classList.add("no-scroll");
});

// Close the menu
closeIcon.addEventListener("click", () => {
  menu.classList.remove("show");
  body.classList.remove("no-scroll");
});

// Close menu when clicking menu link on small screen
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("show");
    body.classList.remove("no-scroll");
  });
});

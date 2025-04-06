document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  const navContainer = document.querySelector("#nav-container");

  // when DOM content is loaded, add navbar to page and update theme icon
  fetch("./navbar.html")
    .then((response) => response.text())
    .then((html) => {
      navContainer.innerHTML = html;
      updateIcon(savedTheme);
    });
});

// open and close mobile menu
const toggleSidebar = () => {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("show-sidebar");
};

// change theme to dark or ligth
const toggleTheme = () => {
  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  updateIcon(newTheme);
};

// update theme icon based on current theme
const updateIcon = (theme) => {
  const themeIcons = document.querySelectorAll(".theme-icon");

  themeIcons.forEach((icon) => {
    icon.classList.add("fa-solid");

    if (theme === "dark") {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  });
};

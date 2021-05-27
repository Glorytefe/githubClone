// nav menu on mobile
class toggle {
  constructor() {
    this.menuToggle = document.getElementById("barmenu");
    this.collapse = document.getElementById("collapse");
    this.menunav = document.getElementById("listmenu");
    this.imgNav = document.querySelector(".ctrl");
    this.bords = document.querySelector("#bords");
  }
  // toggle navbar
  mobilemenu() {
    this.menuToggle.addEventListener("click", () => {
      return this.collapse.style.display === "none"
        ? (this.collapse.style.display = "block")
        : (this.collapse.style.display = "none");
    });

    this.menunav.addEventListener("click", () => {
      this.collapse.style.display = "none";
    });
  }

  // scroll events
  onscrolls() {
    document.addEventListener("scroll", () => {
      document.documentElement.scrollTop > 330
        ? (this.imgNav.style.visibility = "visible")
        : (this.imgNav.style.visibility = "hidden");

      document.documentElement.scrollTop > 130
        ? this.bords.classList.remove("none")
        : this.bords.classList.add("none");
    });
  }
}

// on load
document.addEventListener("DOMContentLoaded", () => {
  const toggles = new toggle();
  toggles.mobilemenu();
  toggles.onscrolls();
});

// nav menu on mobile
class toggle {
  constructor() {
    this.menuToggle = document.getElementById("barmenu");
    this.collapse = document.getElementById("collapse");
    this.menunav = document.getElementById("listmenu");
    this.imgNav = document.querySelector(".ctrl");
  }
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

  onscrolls() {
    document.addEventListener("scroll", () => {
      document.documentElement.scrollTop > 290
        ? (this.imgNav.style.visibility = "visible")
        : (this.imgNav.style.visibility = "hidden");
    });
  }
}

// on load
document.addEventListener("DOMContentLoaded", () => {
  const toggles = new toggle();
  toggles.mobilemenu();
  toggles.onscrolls();
});

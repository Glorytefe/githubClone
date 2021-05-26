// nav menu on mobile
class toggle {
    constructor() {
      this.menuToggle = document.getElementById("barmenu");
      this.collapse = document.getElementById("collapse");
      this.menunav = document.getElementById("listmenu");
      this.repol = document.getElementById("repol");
      this.bord = document.getElementById("bord");
      this.optContainer = document.getElementById("opts");
    }
    mobilemenu() {
      this.menuToggle.addEventListener("click", (e) => {
        // e.preventDefault();
        if (this.collapse.style.display === "none") {
          this.collapse.style.display = "block";
        } else {
          this.collapse.style.display = "none";
        }
      });
  
      this.menunav.addEventListener("click", () => {
        this.collapse.style.display = "none";
      });
    }
  
    onscrolls() {
      document.addEventListener("scroll", () => {
        if (document.documentElement.scrollTop > 110) {
          this.bord.style.position = "sticky";
          this.bord.style.top = "2.2rem";
          this.bord.style.zIndex = "2";
          this.optContainer.style.paddingTop = "3px";
          this.optContainer.style.paddingBottom = "12px";
        } else {
          this.bord.style.position = "absolute";
          this.bord.style.top = "9rem";
          this.optContainer.style.padding = "0";
        }
      });
    }
  }

   
  // on load
  document.addEventListener("DOMContentLoaded", () => {
    const toggles = new toggle();
    toggles.mobilemenu();
    toggles.onscrolls();
  });
  
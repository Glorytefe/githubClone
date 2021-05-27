let userNames;
let myForm = document.getElementById("loginFm");
myForm.addEventListener("submit", () => {
  userNames = document.getElementById("usern").value;
  myForm.action = "/component/repo.html";
});

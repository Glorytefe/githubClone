let userNames;
let myForm = document.getElementById("loginFm")
myForm.addEventListener('submit', (e)=> {
//   e.preventDefault();
  userNames= document.getElementById('usern').value;
  console.log(userNames);
 myForm.action =  "/component/repo.html"
})
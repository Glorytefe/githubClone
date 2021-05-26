const params = new URLSearchParams(window.location.search);
let userName = params.get("usern");
let profile;
let repoDetails;
const encodedString = "Z2hwX1ZtM3R5NGNTdnFiUHlhUkM2T1dFSlZKTUlDMWRVZDBwWUtNdA==";
const mytoken = window.atob(encodedString);
const url = "https://api.github.com/graphql";
const queryData = {
  query: `
           query{
               user(login: "${userName}") {
                   name
                   login
                   bio
                   avatarUrl
                   repositories(first: 20, orderBy: {field: PUSHED_AT, direction: DESC}) {
                     nodes {
                       name
                       url
                       primaryLanguage {
                         name
                         color
                       }
                       description
                       forkCount
                       stargazerCount
                       isPrivate
                       pushedAt
                     }
                   }
                 }
           }            
       `,
};

const header = {
  "Content-Type": "application/json",
  Authorization: `token ${mytoken}`,
};

// get data class
class getData {
  fetchData() {
    if (userName) {
      fetch(url, {
        method: "POST",
        headers: header,
        body: JSON.stringify(queryData),
      })
        .then((response) => response.json())
        .then((result) => {
          const data = result.data.user;
          // profile content
          profile = {
            name: data.name,
            img: data.avatarUrl,
            bio: data.bio,
            username: data.login,
          };
          // All repo and details
          repoDetails = data.repositories.nodes;
        })
        .then(() => {
          const displayUi = new UI();
          displayUi.displayProf();
        });
    }
  }
}

class UI {
  constructor() {
    this.pImg = document.querySelectorAll("[id = 'profileImg']");
    this.pName = document.getElementById("profileName");
    this.pUName = document.getElementById("profileUName");
    this.pUNameMo = document.getElementById("profileUNama");
    this.pDescr = document.getElementById("descr");
    this.aElem = document.getElementById("rname");
    this.rDescription = document.getElementById("rDescrp");
    // this.rContainer = document.getElementById('repoCarrier')
    this.rContainer = document.getElementById("repoCar");
  }
  displayProf() {
    this.pImg.forEach((img) => {
      img.setAttribute("src", profile.img);
    });
    this.pUName.innerText = profile.username;
    this.pUNameMo.innerText = profile.username;
    this.pDescr.innerText = profile.bio;
    if (this.pName !== null) {
      this.pName.innerText = profile.name;
    }
    // display repos

    this.displayRepo();
  }

  displayRepo() {
    let repoDetailsa;
    // let repoDescr;
    if (repoDetails.length > 0) {
      repoDetails.forEach((repository) => {
        function truncator(str, num) {
          if (str.length <= num) {
            return str;
          }

          return str.slice(0, num) + "...";
        }
        // repo name and url
        let repoName =
          repository.name === null
            ? ""
            : ` <div id="rname"><a href=${repository.url} class="rname">${repository.name}</a></div>`;
        // repo Description
        let repoDescr =
          repository.description === null
            ? ""
            : `<p class="greytext pt5" id="rDescrp">${truncator(
                repository.description,
                197
              )}</p>`;
        //  repo lang
        let repoL = repository.primaryLanguage;
        let repolang =
          repoL === null
            ? ""
            : `<li class="pr5" ><i class="fas fa-circle" style = "color:  ${repoL.color}"></i>&nbsp;<span class="greytext">${repoL.name}</span></li>`;
        // repo stars
        let repoStar =
          repository.stargazerCount === 0
            ? ""
            : ` <li class="greytext pr5">
        <a href="#" class="greytext"><i class="far fa-star"></i>&nbsp;<span >${repository.stargazerCount}</span></a>
        </li>`;
        // repo forks
        let repoForks =
          repository.forkCount === 0
            ? ""
            : `<li class="pr5">
        <a href="#" class="greytext"><i class="fas fa-code-branch"></i>&nbsp;<span
        >${repository.forkCount}</span></a>
        </li >`;
        // call method
        this.repoUI(
          repoDetailsa,
          repoName,
          repoDescr,
          repolang,
          repoStar,
          repoForks
        );
      });
    }
  }
  // <a href=${repository.url} class="rname">${repository.name}</a>

  repoUI(repoDetailsa, repoName, repoDescr, repolang, repoStar, repoForks) {
    repoDetailsa = `
    <div class="repos flex flexm aligncent sbtw">
    <div id="repoCarrier">
         <!-- repo name -->
        ${repoName}
        <!-- repo descr -->
        ${repoDescr}
        <!-- repo details -->
         <ul class="ul repodetails">
         <!-- repo langauge -->
         ${repolang}
        <!-- star -->
        ${repoStar}
        <!-- codebranch fork -->
        ${repoForks}
        <!-- update -->
        <li id="li4">updated 2 days ago</li>
        </ul>
        </div>
        <!-- star btn -->
        <div>
        <button class="br btns">
       <i class="far fa-star"></i> star
      </button>
       </div>
       `;
    this.rContainer.innerHTML += repoDetailsa;
  }
}
// on load
document.addEventListener("DOMContentLoaded", () => {
  const getInfo = new getData();
  getInfo.fetchData();
});

const params = new URLSearchParams(window.location.search);
let userName = params.get("usern");
let profile;
let repoDetails;

const mytoken = "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";
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
  Authorization: "bearer " + mytoken,
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

          console.log(profile, repoDetails);
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
    this.pImg = document.getElementById("profileImg");
    this.pName = document.getElementById("profileName");
    this.pUName = document.getElementById("profileUName");
    this.pDescr = document.getElementById("descr");
    this.aElem = document.getElementById("rname");
    this.rDescription = document.getElementById("rDescrp");
    // this.rContainer = document.getElementById('repoCarrier')
    this.rContainer = document.getElementById("repoCar");
    // this.rContainer = document.getElementById('repoCarrier')
    // this.rContainer = document.getElementById('repoCarrier')
  }
  displayProf() {
    this.pImg.setAttribute("src", profile.img);
    this.pUName.innerText = profile.username;
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
        // repo name and url
        let repoName =
          repository.name === null
            ? ""
            : ` <div id="rname"><a href=${repository.url} class="rname">${repository.name}</a></div>`;
        // repo Description
        let repoDescr =
          repository.description === null
            ? ""
            : `<p class="greytext pt5" id="rDescrp">${repository.description}</p>`;
        //  repo lang
        let repoL = repository.primaryLanguage;
        let repolang =
          repoL === null
            ? ""
            : `<li class="pr5" ><i class="fas fa-circle" style = "color:  ${repoL.color}"></i>&nbsp;<span class="greytext">${repoL.name}</span></li>`;
        // repo stars
        let repoStar = (repository.stargazerCount === 0) ? "": (` <li class="greytext pr5">
        <a href="#" class="greytext"><i class="far fa-star"></i>&nbsp;<span >${repository.stargazerCount}</span></a>
        </li>`) 
        // repo forks
        let repoForks = (repository.forkCount === 0) ? "" : (`<li class="pr5">
        <a href="#" class="greytext"><i class="fas fa-code-branch"></i>&nbsp;<span
        >${repository.forkCount}</span></a>
        </li >`) 
        // call method
        this.repoUI(repoDetailsa, repoName, repoDescr, repolang, repoStar, repoForks);
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
        <li id="li4" class="greytext">updated 2 days ago</li>
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

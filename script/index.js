
const encodedString = "Z2hwX1ZtM3R5NGNTdnFiUHlhUkM2T1dFSlZKTUlDMWRVZDBwWUtNdA==";
const mytoken = window.atob(encodedString);
const params = new URLSearchParams(window.location.search);
let userName = params.get("usern");
let profile;
let repoDetails;
const url = "https://api.github.com/graphql"

const queryData = {
  query: `
           query{
               user(login: "${userName}") {
                   name
                   login
                   bio
                   avatarUrl
                   repositories(first: 20, privacy:PUBLIC, orderBy: {field: PUSHED_AT, direction: DESC}) {
                    totalCount
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
  // fetch data
  fetchData() {
    if (userName) {
      fetch(url, {
        method: "POST",
        headers: header,
        body: JSON.stringify(queryData),
      })
        .then((response) => response.json())
        .then((result) => {
          this.myData(result)
        })
    }
  }
  // organize data
   myData (result){
    const data = (result.data.user === null)?
    window.location.href = "../component/error.html" : (result.data.user);
    // profile content
    profile = {
      name: data.name,
      img: data.avatarUrl,
      bio: data.bio,
      username: data.login,
      total: data.repositories.totalCount,
    };
    // All repo and details
    repoDetails = data.repositories.nodes;
    const displayUi = new UI();
    displayUi.displayProf();
   }
}

class UI {
  constructor() {
    this.pImg = document.querySelectorAll("[id = 'profileImg']");
    this.pName = document.getElementById("profileName");
    this.pUName = document.querySelectorAll("[id = 'profileUName']");
    this.pDescr = document.getElementById("descr");
    this.aElem = document.getElementById("rname");
    this.rDescription = document.getElementById("rDescrp");
    this.rCounter = document.getElementById("tcount");
    this.rContainer = document.getElementById("repoCar");
    this.preload = document.getElementById("preload");
    this.mycont= document.getElementById("contentsm");


    this.allMonths = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];
  }
  // display profile
  displayProf() {
    this.preload.style.display = "none";
    this.mycont.style.display = "block";
    this.pImg.forEach((img) => {
      img.setAttribute("src", profile.img);
    });
    this.pUName.forEach((user) =>{
      user.innerText = profile.username;
    })
    this.pDescr.innerText = profile.bio;
    this.rCounter.innerText = profile.total;
    (this.pName !== null) ?  this.pName.innerText = profile.name : this.pName.innerText = ""
    // display repos list
    this.displayRepo();
  }

  displayRepo() {
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
            : `<p class="greytext pt5" id="rDescrp">${this.truncator(
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

        // updated date
        let updated =
          repository.pushedAt === null
            ? ""
            : `<li id="li4" class="greytext pr5">${this.getNewDateFormat(
                repository.pushedAt
              )}</li>`;
        // call ui building method
        this.repoUI(
          repoName,
          repoDescr,
          repolang,
          repoStar,
          repoForks,
          updated
        );
      });
    }
    else{
      alert('You have no repository')
    }
  }
  // repo UI Builder
  repoUI(repoName, repoDescr, repolang, repoStar, repoForks, updated) {
    let repoDetailsa = `
    <div class="repos flex flexm aligncent sbtw">
    <div id="repoCarrier">
        ${repoName}
        ${repoDescr}
         <ul class="ul repodetails">
         ${repolang}
        ${repoStar}
        ${repoForks}
        ${updated}
        </ul>
        </div>
        <div>
        <button class="br btns">
       <i class="far fa-star"></i> star
      </button>
       </div>
       `;
    this.rContainer.innerHTML += repoDetailsa;
  }
  // truncate description text if too long
  truncator(str, num) {
    return str.length <= num ? str : str.slice(0, num) + "...";
  }

  // Date updated
  getNewDateFormat(updated) {
    
    let date = new Date(updated)
    let seconds = Math.floor((new Date() - date) / 1000);
    if(Math.round(seconds/(60*60*24*365.25)) >= 2) return `updated ${Math.round(seconds/(60*60*24*365.25))} years ago`;
    else if(Math.round(seconds/(60*60*24*365.25)) >= 1) return `updated 1 year ago`;
    else if(Math.round(seconds/(60*60*24*30.4)) >= 2) return `updated ${Math.round(seconds/(60*60*24*30.4))} months ago`  ;
    else if(Math.round(seconds/(60*60*24*30.4)) >= 1) return `updated 1 month ago`;
    else if(Math.round(seconds/(60*60*24*7)) >= 2) return `updated ${Math.round(seconds/(60*60*24*7)) }  weeks ago`;
    else if(Math.round(seconds/(60*60*24*7)) >= 1) return `updated 1 week ago`;
    else if(Math.round(seconds/(60*60*24)) >= 2) return `updated ${Math.round(seconds/(60*60*24))} days ago`;
    else if(Math.round(seconds/(60*60*24)) >= 1) return `updated 1 day ago`;
    else if(Math.round(seconds/(60*60)) >= 2) return `updated ${Math.round(seconds/(60*60))} hours ago`;
    else if(Math.round(seconds/(60*60)) >= 1) return `updated 1 hour ago`;
    else if(Math.round(seconds/60) >= 2) return  `updated ${Math.round(seconds/60) } minutes ago`
    else if(Math.round(seconds/60) >= 1) return `1updated  minute ago`;
    else if(seconds >= 2)return `updated ${seconds} seconds ago`;
    else return seconds + `updated 1 second ago`;
      }
  
}
// on load
document.addEventListener("DOMContentLoaded", () => {
  const getInfo = new getData();
  getInfo.fetchData();
});

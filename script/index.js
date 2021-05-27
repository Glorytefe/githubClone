
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
    this.title = document.getElementById('title');


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
    this.title.innerText = `${userName}/repositories`
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
            : `<li class="pr5" >
            <svg xmlns="http://www.w3.org/2000/svg"  width="1em" height="1em" viewBox="0 0 24 24"><g fill=${repoL.color}><circle cx="12" cy="12" r="9"stroke-width="2"/></g></svg>
            &nbsp;<span class="greytext">${repoL.name}</span></li>`;
        // repo stars
        let repoStar =
          repository.stargazerCount === 0
            ? ""
            : ` <li class="greytext pr5 flexm flex aligncent">
        <a href="#" class="greytext">
      <svg xmlns="http://www.w3.org/2000/svg" class="star" width="1em" height="1em" viewBox="0 0 32 32" fill="#586069"><path d="M16 6.52l2.76 5.58l.46 1l1 .15l6.16.89l-4.38 4.3l-.75.73l.18 1l1.05 6.13l-5.51-2.89L16 23l-.93.49l-5.51 2.85l1-6.13l.18-1l-.74-.77l-4.42-4.35l6.16-.89l1-.15l.46-1L16 6.52M16 2l-4.55 9.22l-10.17 1.47l7.36 7.18L6.9 30l9.1-4.78L25.1 30l-1.74-10.13l7.36-7.17l-10.17-1.48z" /></svg>
       
        &nbsp;<span >${repository.stargazerCount}</span></a>
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
        <button class="br btns aligncent flex flexm">
<svg xmlns="http://www.w3.org/2000/svg" class="star" width="1em" height="1em"  viewBox="0 0 32 32" stroke="grey"><path d="M16 6.52l2.76 5.58l.46 1l1 .15l6.16.89l-4.38 4.3l-.75.73l.18 1l1.05 6.13l-5.51-2.89L16 23l-.93.49l-5.51 2.85l1-6.13l.18-1l-.74-.77l-4.42-4.35l6.16-.89l1-.15l.46-1L16 6.52M16 2l-4.55 9.22l-10.17 1.47l7.36 7.18L6.9 30l9.1-4.78L25.1 30l-1.74-10.13l7.36-7.17l-10.17-1.48z" /></svg>
       
        Star
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

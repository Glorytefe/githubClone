repoDetails.forEach((repository) =>{
    //   if(repository.forkCount > 0){
    //     let li3 = `<li>
    //     <a href="#"><i class="fas fa-code-branch"></i>&nbsp;<span
    //             class="greytext">${repository.forkCount}</span></a>
    // </li>`
    //   } else {
    //     let l13 = '';
    //   }
    //   if(repository.stargazerCount > 0){
    //     let li2 = `<li>
    //     <a href="#"><i class="far fa-star"></i>&nbsp;<span
    //             class="greytext">${repository.stargazerCount}</span></a>
    // </li>`
    //   } else {
    //     let l12 = '';
    //   }
      // let aElem = `<a href = ${repository.url} class= "rname"> ${repository.name}</a>`;
      // let ulElem = `<ul class = "ul repodetails">`;
      // let li1 = `<li> <i class="fas fa-circle"  style="color: ${repository.primaryLanguage.color} ;"></i>&nbsp;
      // <span class="greytext">${repository.primaryLanguage.name}</span>
      // </li>`;
      // ulElem.append();
      // ulElem.innerHTML += li1 
      // this.divs.append([aElem, ulElem]);
    // this.rContainer.append(li1);

    });
    // this.rContainer.append(this.divs);


    <div class="repos flex flexm aligncent sbtw top" id="repoCar">
                                    <div id="repoCarrier">
                                        <!-- repo name -->
                                        <div id="rname">
                                        <a href="#" class="rname">Lorem, ipsum dolor.</a>

                                        </div>
                                        <!-- repo descr -->
                                        <p class="greytext pt5" id="rDescrp">
                                            Lorem, ipsum dolor sit amet consectetur adipisicing.
                                        </p>
                                        <!-- repo details -->
                                        <ul class="ul repodetails">
                                            <!--  -->
                                            <li id="li1">
                                                <i class="fas fa-circle"></i>&nbsp;<span class="greytext">HTML</span>
                                            </li>
                                            <!-- star -->
                                            <li id="li2">
                                                <a href="#"><i class="far fa-star"></i>&nbsp;<span
                                                        class="greytext">9</span></a>
                                            </li>
                                            <!-- codebranch fork -->
                                            <li id="l13">
                                                <a href="#"><i class="fas fa-code-branch"></i>&nbsp;<span
                                                        class="greytext">10</span></a>
                                            </li >
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
                                </div>
                                <!-- repo 1 ends -->
                                <!-- repo 2 -->
                                <div class="repos flex flexm aligncent sbtw">
                                    <div>
                                        <!-- repo name -->
                                        <a href="#" class="rname">Lorem, ipsum dolor.</a>
                                        <!-- repo descr -->
                                        <p class="greytext pt5">
                                            Lorem, ipsum dolor sit amet consectetur adipisicing.
                                        </p>
                                        <!-- repo details -->
                                        <ul class="ul repodetails">
                                            <!--  -->
                                            <li>
                                                <i class="fas fa-circle"></i>&nbsp;<span class="greytext">HTML</span>
                                            </li>
                                            <!-- star -->
                                            <li>
                                                <a href="#"><i class="far fa-star"></i>&nbsp;<span
                                                        class="greytext">9</span></a>
                                            </li>
                                            <!-- codebranch fork -->
                                            <li>
                                                <a href="#"><i class="fas fa-code-branch"></i>&nbsp;<span
                                                        class="greytext">10</span></a>
                                            </li>
                                            <!-- update -->
                                            <li>updated 2 days ago</li>
                                        </ul>
                                    </div>
                                    <!-- star btn -->
                                    <div>
                                        <button class="br btns">
                                            <i class="far fa-star"></i> star
                                        </button>
                                    </div>
                                </div>
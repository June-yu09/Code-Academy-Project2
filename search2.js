
const myUrls = [];

function fetchUrls(){
    return fetch("https://www.rijksmuseum.nl/api/en/collection?key=gDhkonP6&ps=30&imgonly=True&involvedMaker=Johannes+Vermeer")
        .then(response => response.json())
        .then(data =>{
            data.artObjects.forEach((d) =>{
                myUrls.push(`https://www.rijksmuseum.nl/api/en/collection/${d.objectNumber}?key=gDhkonP6`)
            })
        })
        .catch(err=> console.log(err))
}

let myResponseData =[];

async function fetchData() {
    await fetchUrls();
    let myRequests = myUrls.map((url) => fetch(url));
    // Promise.all waits until all jobs are resolved
    Promise.all(myRequests)
      .then((responses) => {
          return responses;
      })
      // map array of responses into an array of response.json() to read their content
      .then((responses) => Promise.all(responses.map((r) => r.json())))
      // all JSON answers are parsed: "users" is the array of them
      .then((data) => {
            myResponseData = [...data];
            displayData(data);
      })
      .catch(err =>console.log(err))
  }
  

  function loading(str){
    document.getElementById("loading").innerHTML = str;
}

function displayData(data){
    loading("");
    const tb = document.getElementById("myTable");
    tb.innerHTML = "";

    data.forEach(d => {
        let myD = d.artObject;
        let newRow = document.createElement("tr");

        let newType = document.createElement("td");
        let newArtist = document.createElement("td");
        let newTitle = document.createElement("td");
        let newPeriod = document.createElement("td");
        let myImage = document.createElement("IMG");

        newType.innerHTML = myD.objectTypes[0];
        newArtist.innerHTML = myD.principalOrFirstMaker;
        newTitle.innerHTML = myD.title;
        newPeriod.innerHTML = myD.dating.period;

        myImage.setAttribute("src", myD.webImage.url);
        myImage.setAttribute("width", "300px");
        myImage.setAttribute("height","300px");
    

        tb.appendChild(newRow);
        tb.appendChild(newType);
        tb.appendChild(newArtist);
        tb.appendChild(newTitle);
        tb.appendChild(newPeriod);
        tb.appendChild(myImage);
    })  
}


if (document.title=="Search"){
    fetchData();
    loading("LOADING...");
    
} 

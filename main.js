
function clickMe(){
    if(document.getElementById("myButton").innerHTML =="Show More"){
        document.getElementById("myDesc").style.display = "block";
        document.getElementById("myButton").innerHTML = "Show Less";
    } else if (document.getElementById("myButton").innerHTML == "Show Less"){
        document.getElementById("myDesc").style.display = 'none';
        document.getElementById("myButton").innerHTML = "Show More";
}
}
if (document.title == "Home"){
    document.getElementById("myButton").addEventListener("click", clickMe);
}



// function fetchData(){
//     fetch("https://www.rijksmuseum.nl/api/en/collection?key=gDhkonP6&toppieces=True&ps=30");
//     .then( response => response.json())
//     .then( data => {
//         console.log("First fetch :",data);
//         return data;
//     })
//     .then(async data => {
//         Promise.all(data.artObjects.map(d => {
//             return fetch(`https://www.rijksmuseum.nl/api/en/collection/${d.objectNumber}?key=gDhkonP6`)
//                 .then(response => response.json())
//                 .then(data => {
//                     loading("")
//                     displayData(data);
//                     console.log(data);
//                 })
//                 .catch(err=> console.log(err))
//         }))
//     })
//     .catch(err=> console.log(err))
// }

const myUrls = [];

function fetchUrls(){
    return fetch("https://www.rijksmuseum.nl/api/en/collection?key=gDhkonP6&ps=30&type=drawing")
        .then(response => response.json())
        .then(data =>{
            data.artObjects.forEach((d) =>{
                myUrls.push(`https://www.rijksmuseum.nl/api/en/collection/${d.objectNumber}?key=gDhkonP6`)
            })
        })
        .catch(err=> console.log(err))
}


async function fetchData() {
    await fetchUrls();
    let myRequests = myUrls.map((url) => fetch(url));
    // Promise.all waits until all jobs are resolved
    let mypromise_which_resolve_in_array_of_promis_of_json = Promise.all(myRequests)
      .then((responses) => {
          return responses;
      })
      // map array of responses into an array of response.json() to read their content
      .then((responses) => Promise.all(responses.map((r) => r.json())))
      // all JSON answers are parsed: "users" is the array of them
      .then((data) => {
          displayData(data);
          const myResponseData = [...data];
          console.log(myResponseData);
      })
      .catch(err =>console.log(err))
  }
  



function loading(str){
    document.getElementById("loading").innerHTML = str;
}

function displayData(data){
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
        newArtist.innerHTML = myD.principalMakers[0].name;
        newTitle.innerHTML = myD.title;
        newPeriod.innerHTML = myD.dating.period;
        myImage.setAttribute("src", myD.webImage.url);
        myImage.setAttribute("width", "400px");
        myImage.setAttribute("height","400px");

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
    
} else if (document.title =="Our top pieces"){
    fetchData();
    loading("Loading...");
}

const addEvents = () => {
    let checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'));
    console.log(checkboxes);
    checkboxes.forEach((checkbox)=>{
        checkbox.addEventListener("change",()=>{
            filterData();
        })
    })
}

const filterData = () => {
    let checkBoxes = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map((checkbox)=>{
        return checkbox.value;
    })
    console.log("checkBoxes",checkBoxes);
    if(checkBoxes.length ===0){
        displayData(myResponseData);
    } else {
        const result = myResponseData.filter(data =>{
            if(data.artObject.dating.period in checkBoxes){
                return data
            }
        })
        displayData(result);
    }
    
}

addEvents();









function fetchData2(){
    fetch("https://www.rijksmuseum.nl/api/en/collection?key=gDhkonP6&toppieces=True&ps=50&type=painting")
    .then( response => response.json() )
    
    .then( data => {
        return data;
    })
    .then(async data => {
        await Promise.all(data.artObjects.map(d => {
            return fetch(`https://www.rijksmuseum.nl/api/en/collection/${d.objectNumber}?key=gDhkonP6`)
                .then(response => response.json())
                .then(data => {
                    loading("")
                    displayData(data);

                })
                .catch(err=> console.log(err))
        }))
    })
    .catch(err=> console.log(err))
}



// function fetchData(){
//     fetch("https://www.rijksmuseum.nl/api/en/collection?key=gDhkonP6&toppieces=True&ps=20")
//     .then( response => response.json() )
    
//     .then( data => {        
//         data.artObjects.forEach((d)=>{
//             const oN = d.objectNumber;
//             console.log(fetch(`https://www.rijksmuseum.nl/api/en/collection/${oN}?key=gDhkonP6`))
//             return fetch(`https://www.rijksmuseum.nl/api/en/collection/${oN}?key=gDhkonP6`).then( response => response.json() )
//             .then((a)=>{
//                 loading("")
//                 displayData(a);
//             })
//             .catch((err)=>{
//                 console.log(err);
//             })
//         })
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// }
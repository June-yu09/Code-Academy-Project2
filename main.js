
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
//     fetch("https://www.rijksmuseum.nl/api/en/collection?key=gDhkonP6&toppieces=True&ps=30")
//     .then( response => response.json())
//     .then( data => {
//         console.log("First fetch :",data);
//         return data;
//     })
//     .then(async data => {
//         await Promise.all(data.artObjects.map(d => {
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
    fetch("https://www.rijksmuseum.nl/api/en/collection?key=gDhkonP6&toppieces=True&ps=30")
    .then(response => response.json())
    .then(data =>{
        data.artObjects.forEach((d) =>{
            myUrls.push(`https://www.rijksmuseum.nl/api/en/collection/${d.objectNumber}?key=gDhkonP6`)
        })
        console.log("myUrls",myUrls);
    })
    .catch(err=> console.log(err))
}


async function fetchData() {
    await fetchUrls();
    let myRequests = myUrls.map((url) => fetch(url));
    // Promise.all waits until all jobs are resolved
    Promise.all(myRequests)
      .then((responses) => {
          console.log("first responses:", responses);
          return responses;

      })
      // map array of responses into an array of response.json() to read their content
      .then((responses) => Promise.all(responses.map((r) => r.json())))
      // all JSON answers are parsed: "users" is the array of them
      .then((data) => {

      });
  }
  



function loading(str){
    document.getElementById("loading").innerHTML = str;
}

function displayData(data){
    const tb = document.getElementById("myTable");
    const d = data.artObject
    const newRow = document.createElement("tr");
    tb.appendChild(newRow);

    const newType = document.createElement("td");
    newType.innerHTML = d.objectTypes;
    tb.appendChild(newType);

    const newArtist = document.createElement("td");
    newArtist.innerHTML = d.principalMakers[0].name;
    tb.appendChild(newArtist);

    const newTitle = document.createElement("td");
    newTitle.innerHTML = d.title;
    tb.appendChild(newTitle);

    const newPeriod = document.createElement("td");
    newPeriod.innerHTML = d.dating.period;
    tb.appendChild(newPeriod);

    const myImage = document.createElement("IMG");
    myImage.setAttribute("src", d.webImage.url);
    myImage.setAttribute("width", "400px")
    myImage.setAttribute("height","400px")
    tb.appendChild(myImage);


}


if (document.title=="Search"){
    fetchData();
    loading("LOADING...");
} else if (document.title =="Our top pieces"){
    fetchData2();
    loading("Loading...");
}

// const addEvents = () => {
//     let checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'));
//     console.log(checkboxes);
//     checkboxes.forEach((checkbox)=>{
//         checkbox.addEventListener("change",()=>{
//             filterData();
//         })
//     })
// }

// const filterData = () => {
//     let checkBoxes = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map((checkbox)=>{
//         return checkbox.value;
//     })
//     console.log("checkBoxes",checkBoxes);
//     if (checkBoxes.length !== 0){
        
//     }
// }










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
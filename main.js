
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



function fetchData(){
    fetch("https://www.rijksmuseum.nl/api/en/collection?key=gDhkonP6&toppieces=True&ps=25&type=painting")
    .then( response => response.json() )
    
    .then( data => {        
        data.artObjects.forEach((d)=>{
            const oN = d.objectNumber;
            console.log(fetch(`https://www.rijksmuseum.nl/api/en/collection/${oN}?key=gDhkonP6`))
            return fetch(`https://www.rijksmuseum.nl/api/en/collection/${oN}?key=gDhkonP6`).then( response => response.json() )
            .then((a)=>{
                loading("")
                displayData(a);
            })
            .catch((err)=>{
                console.log(err);
            })
    })
    
})
.catch((err)=>{
    console.log(err);
})
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
}
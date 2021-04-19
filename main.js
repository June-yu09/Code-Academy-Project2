
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
    fetch("https://www.rijksmuseum.nl/api/en/collection?key=gDhkonP6&toppieces=True&ps=25")
    .then( (response) => {
        return response.json();
    }).then( (data) => {
        displayData(data);        
    }).catch((err) => {
        console.log(err);
    })
}

function displayData(data){
    const tb = document.getElementById("myTable");
    data.artObjects.forEach((d)=>{
        const newRow = document.createElement("tr");
        tb.appendChild(newRow);
        const newNumber = document.createElement("td");
        newNumber.innerHTML = d.objectNumber;
        tb.appendChild(newNumber);
        const newTitle = document.createElement("td");
        newTitle.innerHTML = d.longTitle;
        tb.appendChild(newTitle);
        const newArtist = document.createElement("td");
        newArtist.innerHTML = d.principalOrFirstMaker;
        tb.appendChild(newArtist);
        const myImage = document.createElement("IMG");
        myImage.setAttribute("src", d.webImage.url);
        myImage.setAttribute("width", "400px")
        myImage.setAttribute("height","400px")
        tb.appendChild(myImage);

    })
}


if (document.title=="Search"){
    fetchData();
}
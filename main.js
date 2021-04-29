//for index.html(home)
function clickMe(){
    if(document.getElementById("myButton").innerHTML =="Show More"){
        document.getElementById("myDesc").style.display = "block";
        document.getElementById("myButton").innerHTML = "Show Less";
    } else if (document.getElementById("myButton").innerHTML == "Show Less"){
        document.getElementById("myDesc").style.display = 'none';
        document.getElementById("myButton").innerHTML = "Show More";
    }
}


//for search.html
const myUrls = [];

//API data makes error often. So that if it doesn't work, try to change endpoint of the url... such as type=figure or involvedMaker=Johannes+Vermeer
function fetchUrls(){
    return fetch("https://www.rijksmuseum.nl/api/en/collection?key=gDhkonP6&ps=25&imgonly=True&type=drawing")
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
            makeArtistName();
            filterData();
            addEvents();
            addEvents2();
            console.log(myResponseData);
        })
        .catch(err => console.log(err))
}
  




function loading(str){
    document.getElementById("loading").innerHTML = str;
}

const addEvents = () => {
    let checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'));
    checkboxes.forEach((checkbox)=>{
        checkbox.addEventListener("change",()=>{
            filterData();
        })
    })
}

const addEvents2 = () => {
    document.getElementById('artistName').addEventListener('change', ()=>{
        filterData();
    })
}

const filterData = () => {
    let checkBoxes = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map((checkbox)=>{
        return checkbox.value;
    })
    console.log("checkBoxes",checkBoxes);

    let selectedEle = document.getElementById('artistName').value;

    let finalData = myResponseData.filter(data => {
        return (
            (checkBoxes.length === 0 && selectedEle === 'all')||
            (checkBoxes.length !== 0 && selectedEle === 'all' && checkBoxes.includes(`${data.artObject.dating.period}`) ) ||
            (checkBoxes.length !== 0 && selectedEle !== 'all' && checkBoxes.includes(`${data.artObject.dating.period}`) && selectedEle === data.artObject.principalOrFirstMaker) ||
            (checkBoxes.length === 0 && selectedEle !== 'all' && selectedEle === data.artObject.principalOrFirstMaker)
        );
    
    })

    displayData(finalData);
    displayCard(finalData);
    
}

let artistName = [];
const makeArtistName = () => {
    myResponseData.forEach(data => {
        if(!(data.artObject.principalOrFirstMaker)){
            console.log("Anonymus Artist");
        }
        else if (!(artistName.includes(data.artObject.principalOrFirstMaker))) {
            artistName.push(data.artObject.principalOrFirstMaker);
        }
    });
    artistName.forEach((data,index) =>{
        let aName = document.createElement('option');
        aName.innerHTML = data;
        aName.setAttribute("value",data);
        aName.setAttribute("id", index);
        document.getElementById('artistName').appendChild(aName);
    })
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
        newRow.appendChild(newType);
        newRow.appendChild(newArtist);
        newRow.appendChild(newTitle);
        newRow.appendChild(newPeriod);
        newRow.appendChild(myImage);
    })  
}

const displayCard = (data) => {
    const mycard = document.getElementById("myCards");
    mycard.innerHTML = "";
    data.forEach((d,index) => {
        let myD = d.artObject;

        let newCard = document.createElement("div");
        newCard.setAttribute("class", "card mb-3");
        newCard.setAttribute("style", "width: 18rem");

        let newImg = document.createElement("IMG");
        newImg.setAttribute("class", "card-img-top");
        newImg.setAttribute("src", `${myD.webImage.url}`);
        newImg.setAttribute("alt", "Card image cap");
        
    
        let newCardBody = document.createElement("div");
        newCardBody.setAttribute("class","card-body");

        let newPTag = document.createElement("p");
        newPTag.setAttribute("class","card-text");
        newPTag.innerHTML = myD.title;


        let moreButton = document.createElement("button");
        moreButton.setAttribute('type','button');
        moreButton.setAttribute('class','btn btn-dark');
        moreButton.setAttribute('data-bs-toggle','modal');
        moreButton.setAttribute('data-bs-target',`#myModal${index}`);
        moreButton.innerHTML = "more Details";



        let myModal = document.createElement("div");
        myModal.setAttribute('class','modal fade');
        myModal.setAttribute('id', `myModal${index}`);
        myModal.setAttribute('tabindex','-1');
        myModal.setAttribute('aria-labelledby','myModalLabel');
        myModal.setAttribute('aria-hidden','true');

        let modalDialog = document.createElement("div");
        modalDialog.setAttribute('class','modal-dialog modal-dialog-centered');

        let modalContent = document.createElement("div");
        modalContent.setAttribute('class','modal-content');
        modalContent.style.backgroundColor = "white";

        let modalHeader = document.createElement("div");
        modalContent.setAttribute('class','modal-header');

        let modalButton = document.createElement("button");
        modalButton.setAttribute('type','button');
        modalButton.setAttribute('class','btn-close');
        modalButton.setAttribute('data-bs-dismiss','modal');
        modalButton.setAttribute('aria-label','Close');
        
        let modalBody = document.createElement("div");
        modalBody.setAttribute('class','modal-body');

        let insideModal1 = document.createElement("p");
        insideModal1.innerHTML = `Artist:${myD.principalOrFirstMaker}`;

        let insideModal2 = document.createElement("p");
        insideModal2.innerHTML = `Century:${myD.dating.period}`;



        let modalFooter = document.createElement("div");
        modalFooter.setAttribute('class','modal-footer');

        let closeButton = document.createElement("button");
        closeButton.setAttribute('type','button');
        closeButton.setAttribute('class','btn btn-dark');
        closeButton.setAttribute('data-bs-dismiss','modal');
        closeButton.innerHTML = "Close";


        mycard.appendChild(newCard);
        mycard.appendChild(newImg);
        mycard.appendChild(newCardBody);
        newCardBody.appendChild(newPTag);
        newCardBody.appendChild(moreButton);

        newCardBody.appendChild(myModal);
        myModal.appendChild(modalDialog);
        modalDialog.appendChild(modalContent);
        modalContent.appendChild(modalHeader);
        modalHeader.appendChild(modalButton);


        modalContent.appendChild(modalBody);

        modalBody.appendChild(insideModal1);
        modalBody.appendChild(insideModal2);


        modalContent.appendChild(modalFooter);
        modalFooter.appendChild(closeButton);



    })
}

if (document.title=="Search"){
    fetchData();
    loading("LOADING...");
} else if (document.title == "Home"){
    document.getElementById("myButton").addEventListener("click", clickMe);
}






if (screen.width<480 && screen.height < 950){
    document.getElementById("apiButton").style.display = "block";
    document.getElementById("wholeTable").style.display = "none";
    document.getElementById("centuryFilter").style.display = "none";
    document.getElementById("artistFilter").style.display = "none";
    loading("");
    document.getElementById("apiButton").addEventListener("click", ()=> {
        document.getElementById("myCards").style.display = "block";
        document.getElementById("centuryFilter").style.display = "block";
        document.getElementById("artistFilter").style.display = "block";
        document.getElementById("apiButton").style.display = "none";
        

    })
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

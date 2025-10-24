let triviaBtn = document.querySelector("#js-new-quote").addEventListener('click', newPhoto);
let answerBtn = document.querySelector('#js-tweet').addEventListener('click', newMeow);

let current = {
    cat: "",
    fact: "",
}

const endpoint = "https://cataas.com/cat/says/wassup?json=true";
const endpoint2 = "https://catfact.ninja/fact";

async function newPhoto() {
    console.log("Success");

    try {
        const response1 = await fetch(endpoint);
        if (!response1.ok) {
            throw Error(response1.statusText);
        }
        const catData = await response1.json();
        //console.log(json);
        //current.cat = json["url"];
        current.cat = catData.url.startsWith('http')
            ? catData.url
            : "https://cataas.com" + catData.url;
        //current.cat = "https://cataas.com" + catData.url;

        const response2 = await fetch(endpoint2);
        if (!response2.ok) {
            throw Error(response2.statusText);
        }
        const factData = await response2.json();
        //current.answer = json["answer"];
        //console.log(current.question);
        //console.log(current.answer);
        current.fact = factData.fact;

        displayTrivia();

    } catch(err) {
        console.log(err)
        alert('Failed to get new cat or fact');
    }
}

function displayTrivia() {
    const catphoto = document.querySelector('#cat-photo');
    catphoto.src = current.cat;
    //const questionText = document.querySelector('#js-quote-text');
    const answerText = document.querySelector("#js-answer-text");
    //questionText.textContent = question;
    answerText.textContent = "";
}

function newMeow() {
    console.log("Success == answer!");
    const answerText = document.querySelector("#js-answer-text");
    answerText.textContent = current.fact;
}



newPhoto();

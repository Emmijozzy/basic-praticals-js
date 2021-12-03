const btn = document.querySelector('#btn');
const qoute = document.querySelector('.inner-qoute');
const author = document.querySelector('#author');
// let quotes;
// XMIHttpRequest API
function on_load(url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200 ) {
            callback(this)
        }
    }
    xhttp.open('GET', url, true);
    xhttp.send()
}

function loadout(xhttp){
    quotes = JSON.parse(xhttp.response)
}


// using fetch API
// fetch('qoute.json')
//     .then(response => response.json())
//     .then(data => {
//     quotes = data;
//     return quotes;
// })

// event listener
btn.addEventListener('click', getQuote);

function getQuote() {
    let random = Math.floor(Math.random() * quotes.length);
    qoute.innerHTML = `${quotes[random].quote}`;
    author.innerHTML = `<span>--</span> ${quotes[random].author}`
}
on_load('qoute.json',loadout)
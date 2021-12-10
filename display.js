const cities = [];
endpoint = 'state&capital.json'
fetch(endpoint)
.then(blob => blob.json())
.then(data =>
  {
    console.log(data) 
    return cities.push(...data)
  });
// console.log(qoutes)
console.log(cities)
const html = document.querySelector('html')
html.addEventListener('click', loadData)

function loadData(){
    cities.map(city => {
        let reg = new RegExp('State', 'gi')
        const state = `${(city.state.name).replace( reg, '')} - ${city.state.capital}`
        html.innerHTML += `${state} ` + "\n";
        // console.log(city.state.capital)
    })
} 
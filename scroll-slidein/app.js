// definition of DOM Element
const toggleBtn = document.querySelector('.toggle')
const nav = document.querySelector('nav')
const home = document.querySelector('.home')
const portContainers = document.querySelectorAll('.container')

// console.log(portContainers)
//Event
window.addEventListener('load', loadIn)
window.addEventListener('scroll', slidesIn)
toggleBtn.addEventListener('click', toggleNav)
//logic
function toggleNav(){ nav.classList.toggle('toggle-in')}

function loadIn(e){
    home.classList.add('load-in')
}
// function slowdown(func, wait = 10){
//     let timeout;
//     return (e) => {
//         let run = () => {
//             timeout = null;
//             func.apply(this, e)
//         }
        
//         clearTimeout(timeout)
//         timeout = setTimeout(run, wait)
//     }
// }

function slidesIn(e){
    console.count(e)
    portContainers.forEach(portContainer => {
        const slidepoint = (window.scrollY + window.innerHeight) - 1100
        const containerBottom = portContainer.offsetTop + 900
        // console.log(containerBottom)
        const halfshown = slidepoint > portContainer.offsetTop
        const pased = window.scrollY < containerBottom
        if(halfshown && pased){
            portContainer.classList.add('slidecon')
        } else {
            portContainer.classList.remove('slidecon')
        }

    })
}


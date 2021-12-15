const countos = document.querySelectorAll('.counto')
const speed = 400

countos.forEach(counto => {

    function startCount() {
        const target = +counto.dataset.target
        // console.log(target)
        var currentNum = +(counto.innerText); 
        const inc = Math.ceil(target/speed)  
        currentNum += inc
        counto.innerHTML = currentNum
        setTimeout(() => {
            if (currentNum < target) {
                startCount()
            }
        }, 2);
    
    }
    // counto.addEventListener('click', startCount);
    startCount()
})
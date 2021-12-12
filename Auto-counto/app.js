const countos = document.querySelectorAll('.counto')
const speed = 400

countos.forEach(counto => {

    function startCount() {
        const target = +counto.dataset.target
        // console.log(target)
        var startNum = +(counto.innerText); 
        const inc = Math.ceil(target/speed)  
        startNum += inc
        counto.innerHTML = startNum
        setTimeout(() => {
            if (startNum < target) {
                startCount()
            }
        }, 1);
    
    }
    // counto.addEventListener('click', startCount);
    startCount()
})
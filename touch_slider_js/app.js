
const slider = document.querySelector('.slide-container'),
    slides = Array.from(document.querySelectorAll('.slide'));

let isDragging = false,
    startPos = 0,
    currentIndex = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0;

    slides.forEach((slide, index) => {
        // console.log(slide, index);
        slide.addEventListener('dragstart', (e) => {
            e.preventDefault()

        //touch events
        slide.addEventListener('touchStart', touchStart(index))
        slide.addEventListener('touchend', touchEnd)
        slide.addEventListener('touchmove', touchMove)

        //mouse events 
        slide.addEventListener('mousedown', touchStart(index))
        slide.addEventListener('mouseup', touchEnd)
        slide.addEventListener('mouseleave', touchEnd)
        slide.addEventListener('mousemove', touchMove)
        })
    })

    function touchStart(index) {
        return e => {
            isDragging = true;
            currentIndex = index;
            startPos = getPositionX(e)
            console.log(startPos , 'start')
            animation()
            slider.classList.add('grapping')
        }
    }
    
    function touchEnd() {
        isDragging  = false
        // cancelAnimationFrame(animationID)
        slider.classList.remove('grapping')
        console.log('end')
        const moveBy = currentTranslate - prevTranslate;
        if (moveBy < -100 && currentIndex < slides.length - 1)  currentIndex++
        if (moveBy > 100 && currentIndex > 0)  currentIndex--
        setPositionByIndex()
    }

    function touchMove(e) {
        console.log('move')
        if (isDragging) {
            const currentPosition = getPositionX(e)
            console.log(currentPosition, "current")
            currentTranslate = prevTranslate + currentPosition  - startPos
        }
    }

    function getPositionX(event){
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
    }
    function animation() {
        setSliderPosition() 
        if(isDragging) 
        requestAnimationFrame(animation)

        console.log('working ani')
    };
    function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`
    }
    function setPositionByIndex() {
        currentTranslate = currentIndex* -window.innerWidth
        prevTranslate = currentTranslate;
        setSliderPosition()
    }
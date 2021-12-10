const slider = document.querySelector('.slide-container'),
  slides = Array.from(document.querySelectorAll('.slide'))

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIndex = 0

slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('img')
  slideImage.addEventListener('dragstart', (e) => e.preventDefault())

  // Touch events
  slide.addEventListener('touchstart', touchStart(index))
  slide.addEventListener('touchend', touchEnd)
  slide.addEventListener('touchmove', touchMove)

  // Mouse events
  slide.addEventListener('mousedown', touchStart(index))
  slide.addEventListener('mouseup', touchEnd)
  slide.addEventListener('mouseleave', touchEnd)
  slide.addEventListener('mousemove', touchMove)
})

// Disable context menu
window.oncontextmenu = function (event) {
  event.preventDefault()
  event.stopPropagation()
  return false
}

function touchStart(index) {
  return function (event) {
    // console.log(index)
    isDragging = true
    currentIndex = index
    startPos = getPositionX(event)
    // console.log(startPos)
    animation()

    slider.classList.add('grabbing')
  }
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID)
  // console.log('cancled')
  
  const movedBy = currentTranslate - prevTranslate
  // console.log("move", movedBy)
  
  if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1
  
  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1
  
  setPositionByIndex()
  
  slider.classList.remove('grabbing')
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event)
    // console.log(currentPosition)
    currentTranslate = prevTranslate + currentPosition - startPos
  }
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}

function animation() {
  setSliderPosition()
  console.log('woking anima')
    
  if (isDragging) /*requestAnimationFrame(animation)*/animationID = requestAnimationFrame(animation)
  // console.log('working')
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`
}

function setPositionByIndex() {
  console.log(-window.innerWidth)
  currentTranslate = currentIndex * -window.innerWidth
  prevTranslate = currentTranslate
  setSliderPosition()
}

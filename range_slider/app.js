let slideValue = document.querySelector('span');
let sliderInput = document.querySelector('input');

sliderInput.addEventListener('input', () => {
    value = sliderInput.value;
    slideValue.innerHTML = value
    slideValue.style.left  = value/2 + '%'
})
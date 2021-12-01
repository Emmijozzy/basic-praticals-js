let slideValue = document.querySelector('span');
let slideInput = document.querySelector('input');
let slidevalue2 = document.querySelector('#in2');
let slideInput2 = document.querySelector('.input2')

slideInput.addEventListener('input', () => {
    let value = slideInput.value;
    slideValue.innerHTML = value;
    slideValue.style.left = (value)  + '%';
    slideValue.classList.add('show');
    setTimeout(() => {
        slideValue.classList.remove('show')
    }, 10000)
})

slideInput2.addEventListener('input', () => {
    let value = slideInput2.value;
    slidevalue2.textContent = value;
})
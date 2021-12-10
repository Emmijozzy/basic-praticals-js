const inputs = document.querySelectorAll('input');
// console.log(inputs)
inputs.forEach(input => {
    input.addEventListener('change', setValue)
    input.addEventListener('mousemove', setValue)
})
function setValue() {
    console.log(this.name)
    const suffix = this.dataset.size || "";
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)
}
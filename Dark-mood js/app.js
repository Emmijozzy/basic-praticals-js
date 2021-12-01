let toggle = document.getElementById('toggle');

toggle.addEventListener("input", () => {
    if (toggle.checked) {
        console.log("checked")
        document.body.classList.add('dark-mood')
    } else {
        console.log("unchecked")
        document.body.classList.remove('dark-mood')
    }
})
// console.log(toggle.checked)
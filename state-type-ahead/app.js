//Definition of DOM Element
const stateInput = document.querySelector('#state');
const formContainer = document.querySelector('.form-container')
const stateHolders = document.querySelector('.state');
const lgaHolder = document.querySelector('.lga');
const suggestion = document.querySelector('.state-sug')
const stateLoader = document.querySelector('.state-loader')
const lgaLoader = document.querySelector('.lga-loader')
const arrow = document.querySelector('.arrow')
const lgaInput = document.querySelector('#lga')
const localSuggestion = document.querySelector('.local-suggestion')
// console.log(inputHolder)
 let wholedata = []
 
 //events to be listened
 stateInput.addEventListener('change', loadState);
 stateInput.addEventListener('keyup', loadState);
 lgaInput.addEventListener('change', loadLga);
 lgaInput.addEventListener('keyup', loadLga);
 suggestion.addEventListener('click', putStatein);
 arrow.addEventListener('click', removeStateClass);
 localSuggestion.addEventListener('click', putlgain)
//  inputHolder.addEventListener('click', removeStateClass)
 //logic
 //fetch of data
 fetch('state&capital.json')
        .then(raw => raw.json())
        .then(data => wholedata.push(...data))
        
//Definition of parent function 
function loadState() {
    if(!this.value) {
        stateLoader.classList.remove('state-container')
        stateHolders.classList.remove('load')
        return
    }
    lgaInput.value = '';
    localSuggestion.innerHTML = '';
    const returnState = stateReturn( this.value, wholedata) 
     const out = returnState.map(output => {
         const removeReg = new RegExp('state', 'ig')
         return output.state.name.replace(removeReg, '')
        })
        const html = out.map(data => {
            return `<li class="sug-state sug">${data}</li>`
     })
    stateLoader.classList.add('state-container')
    suggestion.innerHTML = html.join('')
    stateHolders.classList.add('load')

}

function loadLga() {
    const localsName = [];
    const stateValue = stateInput.value;
    if(!this.value) {
        lgaLoader.classList.remove('lga-container') 
        lgaHolder.classList.remove('load')
        return
    }
    const returnedStateLga = getStateLga(this.value, wholedata, stateValue)
    returnedStateLga.forEach(local => {
        localsName.push(local.name)
    });
    localSuggestion.innerHTML = '';
    localsName.forEach(localName => {
        localSuggestion.innerHTML += (`<li class="sug-lga sug">${localName}</li>`)
    })
    lgaLoader.classList.add('lga-container')
    lgaHolder.classList.add('load')
}

function putStatein(e){
    stateInput.value = e.target.innerHTML
    removeStateClass()
}
function putlgain(e){
    lgaInput.value = e.target.innerHTML
    removelgaClass()
}

function removeStateClass() {
    stateLoader.classList.remove('state-container')
    stateHolders.classList.remove('load')
}
function removelgaClass() {
    lgaLoader.classList.remove('lga-container') 
    lgaHolder.classList.remove('load')
}

//Defination of children function
const stateReturn = (searchInput, alldata) => {
    return alldata.filter( indata => {
        const states = rmStateSuffix(indata.state.name) //remove state suffix eg ondo state to ondo without state suffix
        const regex = new RegExp(searchInput, 'ig')
        const outState = states.match(regex)
        return outState
    })
}

function rmStateSuffix(instate) {
    const removeReg = new RegExp('state', 'ig');
    return instate.replace(removeReg, '')
}

function getStateLga(searchInput, alldata, chosenState) {
    locals = [];
    const returnedState = getState(chosenState, alldata)
    returnedState.forEach(state => {
        locals.push(...state.state.locals)
    });

    const searchedLocals = locals.filter(local => {
        const reg = new RegExp(searchInput, 'ig')
        return local.name.match(reg)
    });
    return searchedLocals
}

function getState(inputedState, indatas) {
    return indatas.filter( indata => {
        const reg = new RegExp(inputedState, 'ig')
        return indata.state.name.match(reg)
    })
}

const MAX_NUMBER = 15
const MIN_NUMBER = -15
const STEP_AMOUNT = 1

const elements = {
    number: document.querySelector('[data-key = "number"]'),
    subtract:  document.querySelector('[data-key = "subtract"]'),
    add:  document.querySelector('[data-key = "add"]'),
    reset: document.querySelector('[data-key = "reset"]'),
    resetConfirmation: document.querySelector('[data-key = "confirmation"]'),
}

const updateColor = () => {
    let value = 0
    if(!(elements.number.value === undefined)) value = elements.number.value
    const singleStep = 250 / (MAX_NUMBER - MIN_NUMBER)
    const distMax = MAX_NUMBER - value
    const distMin = value - MIN_NUMBER
    const red = distMax * singleStep
    const green = distMin * singleStep
    document.querySelector('.style').innerHTML = `<style>
        .counter__value::part(input) { color: rgb(${red}, ${green}, 50); }
    </style>`
}

const subtractHandler = () => {
    const newValue = parseInt(elements.number.value) - STEP_AMOUNT
    elements.number.value = newValue

    if (newValue <= MIN_NUMBER) {
        elements.subtract.disabled = true
    
    }

    if (elements.add.disabled === true) {
        elements.add.disabled = false
    }

    updateColor()

    elements.resetConfirmation.classList.remove('confirmation__show')
}

const addHandler = () => {
    const newValue = parseInt(elements.number.value) + STEP_AMOUNT
    elements.number.value = newValue

    if (newValue >= MAX_NUMBER) {
        elements.add.disabled = true
    
    }

    if (elements.subtract.disabled === true) {
        elements.subtract.disabled = false
    }

    updateColor()

    elements.resetConfirmation.classList.remove('confirmation__show')
}

const resetHandler = () => {
    const newValue = 0
    elements.number.value = newValue
    elements.add.disabled = false
    elements.subtract.disabled = false

    updateColor()

    elements.resetConfirmation.classList.add('confirmation__show')
}

elements.subtract.addEventListener('click', subtractHandler)
elements.add.addEventListener('click', addHandler)
elements.reset.addEventListener('click', resetHandler)

updateColor()
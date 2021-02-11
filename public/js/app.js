console.log('client side js file loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const firstMsg = document.querySelector('#message-1')
const secondMsg = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    firstMsg.textContent = 'Loading...'
    secondMsg.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`)
        .then(resp => resp.json())
        .then(data => {
            if(data.errorMessage) {
                firstMsg.textContent = data.errorMessage
            } else {
                firstMsg.textContent = data.location
                secondMsg.textContent = data.forecast
            }
        })
    console.log(location)
})
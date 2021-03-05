const buttonElement = document.getElementById('searchButton');
const resultElement = document.getElementById('result');
const searchInputElement = document.getElementById('textInput');


buttonElement.addEventListener('click', () => {
    let searchValue = searchInputElement.value;
    fetch(`http://localhost:3000/search/${searchValue}`)
    .then(response => {
        return response.text()
    })
    .then(response => {
        resultElement.innerHTML = response;
    })
})
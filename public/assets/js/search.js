const searchField = document.getElementById('search-input')
const searchForm = document.getElementById('search-form')

function search(query) {
    window.location.href = (`/users/find/${query}`)
}

function searchHandler(e) {
    e.preventDefault()
    const query = searchField.value.trim()
    search(query)
}

searchForm.addEventListener('submit', searchHandler)

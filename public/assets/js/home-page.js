const searchField = document.getElementById('search-input')
const searchForm = document.getElementById('search-form')
const loggoutBtn = document.querySelector('#logout')
const userProfileBtn = document.getElementById('user-profile')

function search(query) {
    window.location.href = (`/users/find/${query}`)
}

function searchHandler(e) {
    e.preventDefault()
    const query = searchField.value.trim()
    search(query)
}

searchForm.addEventListener('submit', searchHandler)

async function logoutHandler() {
    
    const response = await fetch('/api/user/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert(response.statusText);
    }
}  

loggoutBtn.addEventListener('click', logoutHandler);

async function userProfileHandler(e) {
    const id = e.target.dataset.id
    console.log(id)

    window.location.replace(`/user/${id}`)
}

userProfileBtn.addEventListener('click', userProfileHandler)
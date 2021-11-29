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

document.querySelector('#logout').addEventListener('click', logoutHandler);


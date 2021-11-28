async function logoutHandler() {
    
    const response = await fetch('/api/user/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        console.log('success');
        document.location.replace('/login');
    } else {
        alert(response.statusText);
    }
}  

//works
document.querySelector('#logout').addEventListener('click', logoutHandler);


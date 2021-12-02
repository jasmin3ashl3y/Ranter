
postContainer.addEventListener('click', async (e) => {
    if (!e.target.parentNode.dataset.postId) {
        return
    }
    const postId = e.target.parentNode.dataset.postId
    const heartCountSpan = document.getElementById(`hearts${postId}`)
    let heartCount = parseInt(heartCountSpan.textContent)

    const response = await fetch('/api/post/heart/', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: postId
        }),
        headers: {
            'Content-Type':'application/json'
        }
    })

    if (response.ok) {
        const {message} = await response.json()
        if (message == 'added') {
            heartCount++
            heartCountSpan.textContent = heartCount
        } else if (message == 'deleted') {
            heartCount--
            heartCountSpan.textContent = heartCount
        }
    }
})
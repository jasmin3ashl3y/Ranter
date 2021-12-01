const resultsContainer = document.getElementById('user-search-results')

async function unfollowHandler(toUnfollowId) {
    const response = await fetch('/api/follow/remove', {
        method: 'POST',
        body: JSON.stringify({
            followed_id: toUnfollowId
        }),
        headers: {'Content-Type':'application/json'}
    })

    if(response.ok) {
        return true
    } else return false
}

async function followHandler(toFollowId) {
    const response = await fetch('/api/follow', {
        method: 'POST',
        body: JSON.stringify({
            followed_id: toFollowId
        }),
        headers: {'Content-Type':'application/json'}
    })

    if(response.ok) {
        return true
    } else return false
}

function toggleFollowBtn(btn) {
    if (btn.textContent.trim() == 'follow') {
        btn.classList.remove('btn-outline-primary')
        btn.classList.add('btn-primary')
        btn.textContent = 'following'
    } else {
        btn.classList.remove('btn-primary')
        btn.classList.add('btn-outline-primary')
        btn.textContent = 'follow'
    }
}

resultsContainer.addEventListener('click', async e => {
    if (e.target.tagName == 'BUTTON') {
        const followBtn = e.target
        const userId = followBtn.parentNode.dataset.userId

        if (followBtn.textContent.trim() == 'follow') {
            const followSuccess = await followHandler(userId)
            if(followSuccess) {
                toggleFollowBtn(followBtn)
            }
        } else {
            const unfollowSuccess = await unfollowHandler(userId)
            if(unfollowSuccess) {
                toggleFollowBtn(followBtn)
            }
        }
    }
})


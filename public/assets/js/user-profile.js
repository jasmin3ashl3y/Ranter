const userProfileEl = document.getElementById('user-profile-container')
const bioEditBtn = document.getElementById('bio-edit-btn')
const bioTextarea = document.getElementById('bio-textarea')
const bioPara = document.getElementById('bio-para')


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

userProfileEl.addEventListener('click', async e => {
    if (e.target.tagName == 'BUTTON' && e.target.parentNode.dataset.userId) {
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

async function updateBio(newBio) {
    await fetch ('/api/user/update-bio', {
        method: 'PUT',
        body: JSON.stringify({
            newBio
        }),
        headers: {
            'Content-Type':'application/json'
        }
    })
}

function toggleBioEdit() {
    if (bioEditBtn.textContent == 'edit') {
        bioPara.classList.add('hide')
        bioTextarea.classList = 'd-block'
        bioTextarea.value = bioPara.textContent
        bioEditBtn.textContent = 'save'
    } else {
        bioPara.textContent = bioTextarea.value
        bioPara.classList.remove('hide')
        bioTextarea.classList = 'hide'
        bioEditBtn.textContent = 'edit'
        updateBio(bioTextarea.value)
    }
}

if (bioEditBtn) {
    bioEditBtn.addEventListener('click', () => {
        toggleBioEdit()
    })
}
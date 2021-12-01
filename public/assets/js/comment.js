const postContainer = document.getElementById('post-feed-results')


 function newCommentHandler(comment_text, logPostId) {
  
 
    
    return fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({
        comment_text,
        post_id: logPostId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

  }



postContainer.addEventListener('submit', async event => {
  event.preventDefault()
  console.log(event.target.dataset.postId);
  const logPostId = event.target.dataset.postId
 const commentForm = event.target
  const comment_text = commentForm.querySelector(".comment-textarea").value
  console.log(commentForm.querySelector(".comment-textarea").value)

  const result = await newCommentHandler(comment_text, logPostId) 
  if (result.ok) {
    console.log('success') 
  } else {
    console.log('no success')
  }

})



  
  
  
  
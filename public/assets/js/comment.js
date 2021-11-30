const postContainer = document.getElementById('post-feed-results')


async function newCommentHandler(commentId) {
  
  const comment_text = document.getElementById("comment-textarea").value
    console.log(comment_text)  //because text area is in post-view

    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({
        comment_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      //add the text to the right field and reload
      console.log('response ok')
      document.location.reload('/feed');
      
    } else {
      console.log('error')
    }
  }

    
  postContainer.addEventListener('click', async event => {
    event.preventDefault()
    console.log('click')
    console.log(event.target.tagName)
    if (event.target.tagName == 'BUTTON') { 
      
      console.log('button clicked')
      const commentBtn = event.target 
      const commentId = commentBtn.parentNode.dataset.commentId 
      console.log(commentId)
      
      await newCommentHandler(commentId)
      
    } 
  })
  
  
  
  
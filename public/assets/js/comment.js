async function newCommentHandler(event) {
    event.preventDefault();
  
    
    const comment_text = document.getElementById("comment-textarea").value;
    console.log(comment_text)
  
    // const response = await fetch(`/api/comment`, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     comment_text
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
  
    // if (response.ok) {
      
    //   //document.location.reload('/feed');
    //   console.log('success')
    // } else {
    //   alert(response.statusText);
    // }
  }
  
  document.querySelector('#submit-comment').addEventListener('click', newCommentHandler);
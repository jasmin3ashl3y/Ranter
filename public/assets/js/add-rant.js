async function newFormHandler(event) {
    event.preventDefault();
  
    const text = document.querySelector('input[name="text"]').value;
    
  
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      //how to add new post to feed
      document.location.reload('/feed');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
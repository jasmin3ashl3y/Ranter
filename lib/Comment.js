const Post = require('./Post');

class Comment extends Post {
    constructor(username, email, id, text, post_id, comment_text) {
        super(username, email, id, text, post_id); 
        this.comment_text = comment_text;
       
        //this.created_at = created_at;
    }
}

module.exports = Comment;
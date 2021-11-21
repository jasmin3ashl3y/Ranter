const User = require('./User');



class Post extends User {
    constructor(username, email, id, text, post_id, created_at) {
        super(username, email, id); 
        this.text = text;
        this.post_id = post_id;
        //this.created_at = created_at;
    }
}

module.exports = Post;
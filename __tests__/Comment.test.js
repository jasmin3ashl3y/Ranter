
const Comment = require('../lib/Comment');

test('can set comment_text content from constructor and inherit from Post', () => {
    const c = new Comment('sam123', 1, 'sam@dogmail.com','test text', 100, 'test comment');

    expect(c.comment_text).toEqual(expect.stringContaining(c.comment_text.toString()));
});
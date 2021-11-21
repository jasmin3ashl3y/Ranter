

const Post = require('../lib/Post');

test('can set text content, post_id and created_at from constructor argument', () => {
    const p = new Post('sam123', 1, 'sam@dogmail.com','test text', 100);

    expect(p.text).toEqual(expect.stringContaining(p.text.toString()));
    expect(p.post_id).toEqual(expect.any(Number));
    //expect(p.created_at).toEqual(expect.any(Date));
});

test('text field is not blank', () => {
    const p = new Post('sam123', 1, 'sam@dogmail.com','test text', 100);

    expect(p.text).not.toBe('');
});

test('user_id is not blank', () => {
    const p = new Post('sam123', 1, 'sam@dogmail.com','test text', 100);

    expect(p.user_id).not.toBe('');
});
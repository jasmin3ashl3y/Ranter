
const User = require('../lib/User');

test('can instantiate a User object from constructor argument', () => {
    const u = new User('sam123', 'dog@mail.com', 1);

    expect(u.username).toEqual('sam123');
    expect(u.email).toEqual('dog@mail.com');
    expect(u.id).toEqual(expect.any(Number));
    //expect(u.created_at).toBe(expect.any(Date));
});
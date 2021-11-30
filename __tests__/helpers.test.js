const {format_date, is_following} = require('../utils/helpers')

test('format_date() returns date string', () => {
    const date = new Date('2021-11-26 16:12:03')

    expect(format_date(date)).toBe('Fri Nov 26 2021')
})

test('is_following() indicates if user is following userId', () => {
    const userId = 4
    const followingIds = [1,2,3,4,5]

    expect(is_following(userId, followingIds)).toBe(true)
    expect(is_following(213, followingIds)).toBe(false)
})
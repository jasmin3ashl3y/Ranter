const {format_date} = require('../utils/helpers')

test('format_date() returns date string', () => {
    const date = new Date('2021-11-26 16:12:03')

    expect(format_date(date)).toBe('Fri Nov 26 2021')
})
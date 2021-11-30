module.exports = {
    format_date: date => {
        return `${new Date(date).toDateString()}`
    },
    is_following: (userId, followingIds) => {
        return (followingIds.includes(userId)) ?
        true :
        false
    }
}
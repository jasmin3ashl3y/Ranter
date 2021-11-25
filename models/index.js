const User = require('./User') 
const Post = require('./Post')
const Comment = require('./Comment')
const Like = require('./Like')
const Follow = require('./Follow')

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

User.belongsToMany(Post, {
    through: Like,
    as: 'liked_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Like,
    as: 'liked_posts',
    foreignKey: 'post_id'
});

Like.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
Like.belongsTo(Post, {
    foreignKey: 'post_id'
  });
  
User.hasMany(Like, {
  foreignKey: 'user_id'
});

Post.hasMany(Like, {
  foreignKey: 'post_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

User.belongsToMany(User, {
  through: Follow,
  as: 'following',
  foreignKey: 'followed_id'
})

User.belongsToMany(User, {
  through: Follow,
  as: 'followers',
  foreignKey: 'follower_id'
})

Follow.belongsTo(User, {
  foreignKey: 'followed_id'
})

Follow.belongsTo(User, {
  foreignKey: 'follower_id'
})

User.hasMany(Follow, {
  foreignKey: 'followed_id'
})

User.hasMany(Follow, {
  foreignKey: 'follower_id'
})


module.exports = { User, Post, Comment, Like, Follow }
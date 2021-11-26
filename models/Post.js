const { Model, DataTypes, Sequelize } = require('sequelize')
const sequelize = require('../config/connection')

class Post extends Model {
    static heart(body, models) {
        return models.Heart.create({
            user_id: body.user_id,
            post_id: body.post_id
        }).then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id',
                    'text',
                    'created_at',
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM heart WHERE post.id = heart.post_id)'),
                        'heart_count'
                    ]
                ]
            })
        })
    }
}


//username, email, id (user), text, post_id, created_at
Post.init(
    {
        id: { //post_id
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        text: { //post text
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('NOW()')
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('NOW()')
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
   
);

module.exports = Post
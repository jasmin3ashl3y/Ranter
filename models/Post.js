const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Post extends Model {

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
        //created_at: {},
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
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
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        userName: {
            type: DataTypes.STRING(100)
        },
        userLastname: {
            type: DataTypes.STRING(100)
        },
        userEmail: {
            type: DataTypes.STRING(255)
        },
        userPass: {
            type: DataTypes.STRING(255)
        },
        userMobile: {
            type: DataTypes.STRING(50)
        },
        userAddress: {
            type: DataTypes.STRING(500)
        },
        userRole: {
            type: DataTypes.ENUM("admin", "user")
        }
    })

    user.associate = (models) => {
        user.hasMany(models.bill, {foriegnKey: 'userId'})
        user.hasOne(models.cart, {foriegnKey: 'userId'})
    }

    return user
}